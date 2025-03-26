import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LockIcon, MailIcon, PhoneIcon, UserIcon, UserPlusIcon } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-96 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Join Us</h1>
          <p className="text-gray-600 mt-2">Create your personal health account</p>
        </div>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium text-gray-900">Patient Registration</CardTitle>
            <CardDescription>Secure access to your health information</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-sm font-medium">First Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                   
                  </div>
                  <Input 
                    id="first-name" 
                    placeholder="John" 
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-sm font-medium">Last Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    
                  </div>
                  <Input 
                    id="last-name" 
                    placeholder="Doe" 
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                  />
                </div>
              </div>
            </div>
            
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
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="(123) 456-7890" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                 
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with 1 uppercase, 1 number, and 1 special character</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  
                </div>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
            </div>
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" className="mt-1" />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-tight"
              >
                I agree to the{" "}
                <Link href="/terms-of-service" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  privacy policy
                </Link>
                .
              </Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-2">
            <Button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              Create Account
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>Need help? <Link href="/support" className="underline hover:text-gray-700">Contact Support</Link></p>
        </div>
      </div>
    </div>
  )
}