import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserProfile() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white p-6 lg:min-h-screen">
        <nav className="space-y-2">
          <a href="#" className="block py-2 px-4 text-blue-600 bg-blue-50 rounded">User Profile</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Orders</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Subscriptions</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Address</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Payments</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Wishlist</a>
        </nav>
        <button className="mt-8 flex items-center text-red-500 hover:text-red-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">User profile</h1>
        <p className="text-gray-600 mb-8">Manage your details, view your tier status and change your password.</p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Info Card */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <img src="/placeholder.svg?height=80&width=80" alt="User avatar" className="w-20 h-20 rounded-full" />
                <div>
                  <CardTitle>Faraz Akhtar</CardTitle>
                  <p className="text-sm text-gray-500">+965 1234 5678</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-4">General Information</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" value="Faraz" readOnly />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" value="Akhtar" readOnly />
                  </div>
                </div>
                <Button variant="outline">Update</Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value="address@email.com" readOnly />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value="••••••" readOnly />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" value="+965 1234 5678" readOnly />
              </div>
              <div className="flex space-x-4">
                <Button variant="outline">Change password</Button>
                <Button variant="outline">Change phone number</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Whale illustration */}
        <div className="mt-12 text-right">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
            <path d="M60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120Z" fill="#E6F7FF"/>
            <path d="M78.75 41.25C78.75 47.7728 73.5228 53 67 53C60.4772 53 55.25 47.7728 55.25 41.25C55.25 34.7272 60.4772 29.5 67 29.5C73.5228 29.5 78.75 34.7272 78.75 41.25Z" fill="#1890FF"/>
            <path d="M67 90.5C80.8071 90.5 92 79.3071 92 65.5C92 51.6929 80.8071 40.5 67 40.5C53.1929 40.5 42 51.6929 42 65.5C42 79.3071 53.1929 90.5 67 90.5Z" fill="#1890FF"/>
            <path d="M92 65.5C92 79.3071 80.8071 90.5 67 90.5V40.5C80.8071 40.5 92 51.6929 92 65.5Z" fill="#096DD9"/>
          </svg>
        </div>
      </main>
    </div>
  )
}