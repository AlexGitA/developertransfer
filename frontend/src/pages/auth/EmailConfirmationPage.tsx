import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {CheckCircle, Loader2, XCircle} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosInstance from "@/lib/Axios"

const EmailConfirmationSuccessPage = () => {
  const navigate = useNavigate()
  const { key } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await AxiosInstance.post('/api/auth/register/verify-email/', {
          key: key
        })
        setLoading(false)
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to verify email')
        setLoading(false)
      }
    }

    if (key) {
      verifyEmail()
    } else {
      setError("No verification key provided")
      setLoading(false)
    }
  }, [key])

  const handleContinue = () => {
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 px-6 pb-8 text-center">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-500" />
            <h1 className="text-xl font-semibold mt-4">Verifying your email...</h1>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 px-6 pb-8 text-center">
            <div className="mb-6">
              <XCircle className="h-12 w-12 mx-auto text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Verification Failed</h1>
            <p className="text-gray-500 mb-8">{error}</p>
            <Button
              size="lg"
              variant="outline"
              className="w-full font-semibold"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 px-6 pb-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
          </div>

          <h1 className="text-2xl font-semibold mb-2">Email Verified Successfully</h1>

          <p className="text-gray-500 mb-8">
            Welcome to the MentorX community! You're all set to start your journey.
          </p>

          <Button
            size="lg"
            className="w-full text-white font-semibold"
            onClick={handleContinue}
          >
            To Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmailConfirmationSuccessPage