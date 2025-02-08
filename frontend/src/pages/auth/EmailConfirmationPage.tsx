import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

//todo limit user to not be able to enter the link if he is not verifying his mail
const EmailConfirmationSuccessPage = () => {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate("/login") // or wherever you want to redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 px-6 pb-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
          </div>

          <h1 className="text-2xl font-semibold mb-2">Email Verified Successfully</h1>

          <p className="text-gray-500 mb-8">Welcome to the MentorX community! You're all set to start your journey.</p>

          <Button size="lg" className="w-full text-white font-semibold" onClick={handleContinue}>
            Start Exploring
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmailConfirmationSuccessPage

