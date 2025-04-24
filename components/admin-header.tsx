"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface AdminHeaderProps {
  onLogout: () => void
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Gove-Vote Admin
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/admin/dashboard" className="hover:text-blue-200 transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/voters" className="hover:text-blue-200 transition-colors">
                Voters
              </Link>
              <Link href="/admin/reports" className="hover:text-blue-200 transition-colors">
                Reports
              </Link>
            </nav>
          </div>
          <Button variant="ghost" onClick={onLogout} className="text-white hover:text-blue-200 hover:bg-blue-700">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
