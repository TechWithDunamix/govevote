import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrationSuccessPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-lg text-center pb-6">
          <CheckCircle className="mx-auto h-16 w-16 mb-2" />
          <CardTitle className="text-2xl">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-center">
          <p className="mb-4">
            Your voter registration has been submitted successfully. Your information will be verified, and you will be
            notified once the verification process is complete.
          </p>
          <div className="border rounded-lg p-4 bg-gray-50 text-left mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Next Steps:</strong>
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Your PVC and NIN will be verified</li>
              <li>You will receive a confirmation email</li>
              <li>Visit your polling unit on election day with your PVC</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 pt-2">
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
