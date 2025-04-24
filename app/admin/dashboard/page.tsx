"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Users, LogOut, CheckCircle, Edit, Trash2 } from "lucide-react"
import AdminHeader from "@/components/admin-header"
import VoterDetailModal from "@/components/voter-detail-modal"
import DeleteConfirmModal from "@/components/delete-confirm-modal"

interface Voter {
  id: string
  full_name: string
  state: string
  lga: string
  ward: string
  senatorial_zone: string
  polling_unit: string
  pvc_number: string
  nin: string
  is_pvc_verified: boolean
  is_nin_verified: boolean
  created_at: string
  updated_at: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [voters, setVoters] = useState<Voter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [voterToDelete, setVoterToDelete] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      router.push("/admin/login")
      return
    }

    fetchVoters()
  }, [router])

  async function fetchVoters() {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("adminToken")

      const response = await fetch("/api/admin/voters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminId")
          router.push("/admin/login")
          return
        }
        throw new Error("Failed to fetch voters")
      }

      const data = await response.json()
      setVoters(Array.isArray(data) ? data : [data])
    } catch (error) {
      console.error("Error fetching voters:", error)
      toast({
        title: "Error",
        description: "Failed to load voters data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminId")
    router.push("/admin/login")
  }

  const handleViewVoter = (voter: Voter) => {
    setSelectedVoter(voter)
    setShowDetailModal(true)
  }

  const handleDeleteClick = (voterId: string) => {
    setVoterToDelete(voterId)
    setShowDeleteModal(true)
  }

  const handleDeleteVoter = async () => {
    if (!voterToDelete) return

    try {
      const token = localStorage.getItem("adminToken")

      const response = await fetch(`/api/admins/voter/${voterToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete voter")
      }

      setVoters(voters.filter((voter) => voter.id !== voterToDelete))

      toast({
        title: "Success",
        description: "Voter has been deleted successfully.",
      })

      setShowDeleteModal(false)
      setVoterToDelete(null)
    } catch (error) {
      console.error("Error deleting voter:", error)
      toast({
        title: "Error",
        description: "Failed to delete voter. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredVoters = voters.filter(
    (voter) =>
      voter.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.pvc_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.nin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.lga.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage voters and election data</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Voters</CardTitle>
              <CardDescription>Registered voters in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-3xl font-bold">{voters.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Verified PVCs</CardTitle>
              <CardDescription>Voters with verified PVCs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-3xl font-bold">{voters.filter((voter) => voter.is_pvc_verified).length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Verified NINs</CardTitle>
              <CardDescription>Voters with verified NINs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-3xl font-bold">{voters.filter((voter) => voter.is_nin_verified).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all">All Voters</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="unverified">Unverified</TabsTrigger>
            </TabsList>

            <div className="flex w-full md:w-auto gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search voters..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4" />
                Add Voter
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>LGA</TableHead>
                        <TableHead>PVC Number</TableHead>
                        <TableHead>NIN</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            Loading voters data...
                          </TableCell>
                        </TableRow>
                      ) : filteredVoters.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            No voters found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredVoters.map((voter) => (
                          <TableRow key={voter.id}>
                            <TableCell className="font-medium">{voter.full_name}</TableCell>
                            <TableCell>{voter.state}</TableCell>
                            <TableCell>{voter.lga}</TableCell>
                            <TableCell>{voter.pvc_number}</TableCell>
                            <TableCell>{voter.nin}</TableCell>
                            <TableCell>
                              {voter.is_pvc_verified && voter.is_nin_verified ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleViewVoter(voter)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(voter.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verified" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>LGA</TableHead>
                        <TableHead>PVC Number</TableHead>
                        <TableHead>NIN</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            Loading voters data...
                          </TableCell>
                        </TableRow>
                      ) : filteredVoters.filter((v) => v.is_pvc_verified && v.is_nin_verified).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            No verified voters found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredVoters
                          .filter((v) => v.is_pvc_verified && v.is_nin_verified)
                          .map((voter) => (
                            <TableRow key={voter.id}>
                              <TableCell className="font-medium">{voter.full_name}</TableCell>
                              <TableCell>{voter.state}</TableCell>
                              <TableCell>{voter.lga}</TableCell>
                              <TableCell>{voter.pvc_number}</TableCell>
                              <TableCell>{voter.nin}</TableCell>
                              <TableCell>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleViewVoter(voter)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(voter.id)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unverified" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>LGA</TableHead>
                        <TableHead>PVC Number</TableHead>
                        <TableHead>NIN</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            Loading voters data...
                          </TableCell>
                        </TableRow>
                      ) : filteredVoters.filter((v) => !v.is_pvc_verified || !v.is_nin_verified).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            No unverified voters found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredVoters
                          .filter((v) => !v.is_pvc_verified || !v.is_nin_verified)
                          .map((voter) => (
                            <TableRow key={voter.id}>
                              <TableCell className="font-medium">{voter.full_name}</TableCell>
                              <TableCell>{voter.state}</TableCell>
                              <TableCell>{voter.lga}</TableCell>
                              <TableCell>{voter.pvc_number}</TableCell>
                              <TableCell>{voter.nin}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                  Pending
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => handleViewVoter(voter)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(voter.id)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {selectedVoter && (
        <VoterDetailModal
          voter={selectedVoter}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onUpdate={fetchVoters}
        />
      )}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteVoter}
      />
    </div>
  )
}
