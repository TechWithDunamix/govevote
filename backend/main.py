import os
from dotenv import load_dotenv
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, timedelta
from uuid import UUID, uuid4
from tortoise import fields, models
from nexios import get_application
from nexios.auth.backends.jwt import JWTAuthBackend
from nexios.auth.decorator import auth
from nexios.auth.middleware import AuthenticationMiddleware
from nexios.config.base import MakeConfig
from nexios.exceptions import HTTPException
from nexios.http import Request, Response
from nexios.openapi.models import Contact, License
from nexios.routing import Router
import pytz
import jwt
import bcrypt
from nexios.middlewares.cors import CORSMiddleware
from nexios.static import StaticFilesHandler
from nexios.routing import Routes
from pathlib import Path

# Load environment variables
load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
app = get_application(MakeConfig(
    {"cors": {"allow_origins": "*"}, 
     "secret_key" : JWT_SECRET,
    "openapi":{
        "title" :"Gove-Vote",
        "description": "A voting system for Nigeria",
        "version": "1.0.0",
        "license": License(name="MIT", url="https://opensource.org/licenses/MIT"),
        "contact":Contact(name="Gove-Vote", url="https://govevote.com", email="nHh7o@example.com")
    }}))

app.add_middleware(CORSMiddleware())



class Admin(models.Model):
    id = fields.UUIDField(pk=True, default=uuid4)
    username = fields.CharField(max_length=100, unique=True)
    password_hash = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "admins"

    @classmethod
    async def create_admin(cls, username: str, password: str):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        return await cls.create(username=username, password_hash=hashed_password)

    async def verify_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

class VoterInfo(models.Model):
    id = fields.UUIDField(pk=True, default=uuid4)
    full_name = fields.CharField(max_length=255)
    state = fields.CharField(max_length=100)
    lga = fields.CharField(max_length=100)
    ward = fields.CharField(max_length=100)
    senatorial_zone = fields.CharField(max_length=100)
    polling_unit = fields.CharField(max_length=100)
    pvc_number = fields.CharField(max_length=20, unique=True)
    nin = fields.CharField(max_length=20, unique=True)
    is_pvc_verified = fields.BooleanField(default=False)
    is_nin_verified = fields.BooleanField(default=False)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "voter_info"

class BaseResponseModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class TokenResponse(BaseResponseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    admin_id: UUID

class AdminCreate(BaseResponseModel):
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=8, max_length=100)

class AdminLogin(BaseResponseModel):
    username: str
    password: str

class VoterInfoCreate(BaseResponseModel):
    full_name: str
    state: str
    lga: str
    ward: str
    senatorial_zone: str
    polling_unit: str
    pvc_number: str
    nin: str

class VoterInfoResponse(BaseResponseModel):
    id: UUID
    full_name: str
    state: str
    lga: str
    ward: str
    senatorial_zone: str
    polling_unit: str
    pvc_number: str
    nin: str
    is_pvc_verified: bool
    is_nin_verified: bool
    created_at: datetime
    updated_at: datetime

class VerificationRequest(BaseResponseModel):
    pvc_number: Optional[str] = None
    nin: Optional[str] = None

class VerificationResponse(BaseResponseModel):
    pvc_verified: Optional[bool] = None
    nin_verified: Optional[bool] = None
    message: str

def create_access_token(admin_id: UUID) -> str:
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(pytz.utc) + expires_delta
    to_encode = {"sub": str(admin_id), "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def validate_admin(**kwargs):
    return await Admin.get_or_none(id=kwargs.get("sub"))

app.add_middleware(AuthenticationMiddleware(backend=JWTAuthBackend(authenticate_func=validate_admin)))

@app.on_startup
async def init_db():
    from tortoise import Tortoise
    await Tortoise.init(db_url='postgres://neondb_owner:npg_Svs3DTO9xLer@ep-nameless-snowflake-a5buuavg-pooler.us-east-2.aws.neon.tech/neondb', modules={'models': [__name__]})
    await Tortoise.generate_schemas()
    admin_exists = await Admin.exists()
    if not admin_exists:
        await Admin.create_admin("admin", "admin123")

@app.on_shutdown
async def close_db():
    from tortoise import Tortoise
    await Tortoise.close_connections()

admin_router = Router(prefix="/api/admins")



@admin_router.post("/login", responses=TokenResponse, request_model=AdminLogin)
async def login_admin(request: Request, response: Response):
    data = await request.json
    login_data = AdminLogin(**data)

    admin = await Admin.get_or_none(username=login_data.username)
    if not admin or not await admin.verify_password(login_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(admin.id)
    return response.json({"access_token": access_token, "token_type": "bearer", "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60, "admin_id": admin.id})

@admin_router.get("/voters", responses=VoterInfoResponse)
@auth(["jwt"])
async def list_voters(request: Request, response: Response):
    voters = await VoterInfo.all()
    return response.json([VoterInfoResponse.model_validate(v).model_dump() for v in voters])

@admin_router.get("/voter/{voter_id}", responses=VoterInfoResponse)
@auth(["jwt"])
async def get_voter(request: Request, response: Response):
    voter_id = request.path_params.get("voter_id")
    voter = await VoterInfo.get_or_none(id=voter_id)
    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")
    return response.json(VoterInfoResponse.model_validate(voter).model_dump())

@admin_router.put("/voter/{voter_id}", responses=VoterInfoResponse)
@auth(["jwt"])
async def update_voter(request: Request, response: Response):
    voter_id = request.path_params.get("voter_id")
    data = await request.json
    await VoterInfo.filter(id=voter_id).update(**data)
    voter = await VoterInfo.get_or_none(id=voter_id)
    return response.json(VoterInfoResponse.model_validate(voter).model_dump())

@admin_router.delete("/voter/{voter_id}")
@auth(["jwt"])
async def delete_voter(request: Request, response: Response):
    voter_id = request.path_params.get("voter_id")
    deleted = await VoterInfo.filter(id=voter_id).delete()
    if not deleted:
        raise HTTPException(status_code=404, detail="Voter not found")
    return response.json({"message": "Voter deleted successfully"})

app.mount_router(admin_router)

voter_router = Router(prefix="/api/voters")

@voter_router.post("", responses=VoterInfoResponse, request_model=VoterInfoCreate)
async def register_voter(request: Request, response: Response):
    data = await request.json
    voter_data = VoterInfoCreate(**data)

    # Check for existing PVC or NIN to avoid duplicates
    existing = await VoterInfo.get_or_none(pvc_number=voter_data.pvc_number) \
        or await VoterInfo.get_or_none(nin=voter_data.nin)
    if existing:
        raise HTTPException(status_code=409, detail="Voter with provided PVC or NIN already exists")

    new_voter = await VoterInfo.create(**voter_data.model_dump())
    return response.json(VoterInfoResponse.model_validate(new_voter))


app.mount_router(voter_router)

app._setup_openapi()