import Image from "next/image"
import { Database, Check, Calendar, Award, Target, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 sm:p-8">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-blue-100">
        {/* Background gradient effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>

        <div className="relative z-10 p-6 sm:p-10 md:p-16">
          {/* Top badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-3xl">
              <Database className="h-5 w-5" />
              <span className="font-bold ">Anambra APC Data Management System</span>
            </div>
          </div>

          {/* Main animated title */}
          <div className="flex justify-center"> 
          <Image src={"/camp.jpg"} width={100} height={100} className="w-fit h-72"/>
          </div>
          <div className="text-center mb-12">
            <h1 className="animate-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
              PRINCE NICHOLAS
              <br />
              UKACHUKWU
            </h1>
            <div className="h-1 w-32 bg-blue-600 mx-auto my-6"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 animate-subtitle">FOR GOVERNOR</h2>
            <h3 className="text-xl sm:text-2xl text-blue-600 mt-2 animate-fade-in">ANAMBRA STATE</h3>
          </div>

          {/* Campaign slogan */}
          <div className="text-center mb-12 animate-slide-up animation-delay-200">
            <div className="inline-block bg-blue-50 px-8 py-3 rounded-full">
              <p className="text-xl md:text-2xl font-bold text-blue-700 italic">
                "Building a Brighter Future Together"
              </p>
            </div>
          </div>

          {/* Candidate image and info */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-100 flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/main.jpg?height=400&width=400"
                alt="Prince Nicholas Ukachukwu"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl md:text-2xl font-medium text-gray-800 mb-4 animate-slide-up">
                 Support Prince Nicholas Ukachukwu for Governor Anambra State
              </p>
              <p className="text-lg text-gray-600 mb-6 animate-slide-up animation-delay-200">
                A visionary leader committed to transforming Anambra State through innovative governance and sustainable
                development.
              </p>
              <Link href="/register" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg animate-pulse">
                Register To Join the renewed hope movement
              </Link>
            </div>
          </div>

          {/* Key policies */}
          <div className="mb-12 animate-slide-up animation-delay-400">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Our Vision for Anambra</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Economic Empowerment</h4>
                    <p className="text-gray-600">
                      Creating jobs and opportunities through strategic investments and support for local businesses.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Quality Education</h4>
                    <p className="text-gray-600">
                      Modernizing our educational system to prepare our youth for the challenges of tomorrow.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Healthcare for All</h4>
                    <p className="text-gray-600">
                      Expanding access to quality healthcare services across all communities in Anambra State.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Infrastructure Development</h4>
                    <p className="text-gray-600">
                      Building modern infrastructure to support growth and improve quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key dates */}
          <div className="mb-12 animate-slide-up animation-delay-600">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Campaign Timeline</h3>
            <div className="flex flex-col md:flex-row justify-between gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-blue-600 font-bold text-lg">JUN 15</div>
                <div className="font-medium">Campaign Launch</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-blue-600 font-bold text-lg">JUL 30</div>
                <div className="font-medium">Town Hall Meetings</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-blue-600 font-bold text-lg">AUG 25</div>
                <div className="font-medium">Policy Summit</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-blue-600 font-bold text-lg">NOV 6</div>
                <div className="font-medium">Election Day</div>
              </div>
            </div>
          </div>

          {/* Team leadership */}
          <div className="mb-12 animate-slide-up animation-delay-800">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Project Anambra First</h3>
            <div className="bg-white p-6 rounded-xl border border-blue-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
                  <Image
                    src="/main2.jpg?height=200&width=200"
                    alt="Hon Johnbosco Onunkwo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h4 className="font-bold text-lg">Hon Johnbosco Onunkwo (Grand Commander Anambra Youth)</h4>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">Team Leader, Anambra First</p>
                  <p className="text-gray-600">
                    Under the visionary leadership of Hon Johnbosco Onunkwo, the Anambra First Team is committed to
                    supporting Prince Nicholas Ukachukwu's candidacy and bringing positive change to Anambra State.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-12 animate-slide-up animation-delay-1000">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Track Record of Excellence</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-600 text-white p-4 rounded-xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Public Service</div>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-xl">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm">Community Projects</div>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-xl">
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-sm">Jobs Created</div>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-xl">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm">Awards Received</div>
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-xl text-center animate-slide-up animation-delay-1200">
            <p className="text-xl font-bold mb-2">Powered by Anambra First Team</p>
            <p className="text-lg">Under the leadership of Hon Johnbosco Onunkwo</p>
          </div>

          {/* Footer text */}
          <div className="text-center mt-8 text-gray-500 text-sm animate-fade-in animation-delay-1400">
            © {new Date().getFullYear()} Anambra APC Data Management System. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
