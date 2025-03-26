import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LockIcon, MailIcon, UserCircle } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-96 max-w-lg">
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Access your personal health dashboard</p>
        </div>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium text-gray-900">Patient Login</CardTitle>
            <CardDescription>Secure access to your health information</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                 
                </div>
                <Input 
                  id="password" 
                  type="password"
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-600">Remember me for 30 days</Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-2">
            <Button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              Sign In
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Create account
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>By signing in, you agree to our <Link href="/terms" className="underline hover:text-gray-700">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  )
}