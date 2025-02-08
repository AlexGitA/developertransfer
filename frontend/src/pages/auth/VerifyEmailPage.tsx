import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { useLocation } from "react-router-dom"

const VerifyEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email || "your email"

  const handleResendEmail = () => {
    // TODO: Implement resend verification email logic
    console.log("Resend verification email")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 px-6 pb-8 text-center">
          <div className="mb-6">
            <Mail className="h-12 w-12 mx-auto text-primary" />
          </div>

          <h1 className="text-2xl font-semibold mb-2">Verify Your Email</h1>

          <p className="text-gray-500 mb-8">
            We've sent a verification link to <span className="font-medium text-gray-700">{email}</span>
          </p>

          <p className="text-gray-500 mb-4">Please check your inbox and click the verification link to join the MentorX community.</p>

          <div className="bg-primary/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Haven't received the email?
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure your email address was entered correctly</li>
              <li>• Allow a few minutes for the email to arrive</li>
            </ul>
          </div>

          <Button
            size="lg"
            className="w-full text-white font-semibold"
            onClick={handleResendEmail}
          >
            Resend Verification Email
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage