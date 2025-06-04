
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, ShoppingCart, CreditCard } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext'; // Replaced by Clerk
import { toast } from '@/hooks/use-toast';
import { UserProfile, SignedIn, useUser } from '@clerk/clerk-react';

const Profile = () => {
  // const { user, logout } = useAuth(); // Replaced by Clerk's useUser and UserProfile/UserButton
  const { user } = useUser(); // For displaying name/email in custom sections if needed
  // const [isEditing, setIsEditing] = useState(false); // Removed, Clerk handles editing
  // const [formData, setFormData] = useState({
  //   name: user?.fullName || '', // Corrected: fullName
  //   email: user?.primaryEmailAddress?.emailAddress || '', // Corrected: primaryEmailAddress
  //   phone: '',
  //   address: '',
  //   city: '',
  //   zipCode: ''
  // }); // Removed, Clerk handles form data

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // }; // Removed, Clerk handles input changes

  // const handleSave = () => {
  //   setIsEditing(false);
  //   toast({
  //     title: "Profile updated",
  //     description: "Your profile has been successfully updated.",
  //   });
  // }; // Removed, Clerk handles saving

  const mockOrders = [
    { id: 1, date: '2024-01-15', total: 299.99, status: 'Delivered' },
    { id: 2, date: '2024-01-10', total: 149.99, status: 'Shipped' },
    { id: 3, date: '2024-01-05', total: 89.99, status: 'Processing' },
  ];

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area for UserProfile and Order History */}
            <div className="lg:col-span-2 space-y-6">
              <UserProfile path="/profile" routing="path" appearance={{ elements: { card: "shadow-xl"} }} />

              {/* Order History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <p className={`text-sm ${
                            order.status === 'Delivered' ? 'text-green-600' :
                            order.status === 'Shipped' ? 'text-blue-600' :
                            'text-yellow-600'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div> {/* Closes lg:col-span-2 space-y-6 */}

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">{user?.fullName || 'User Name'}</h3>
                    <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress || 'user@example.com'}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Orders</span>
                      <span className="font-medium">{mockOrders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Spent</span>
                      <span className="font-medium">
                        ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Track Orders
                  </Button>
                  {/* Logout is handled by UserProfile and UserButton in Navbar */}
                </CardContent>
              </Card>
            </div> {/* Closes sidebar space-y-6 */}
          </div> {/* Closes grid grid-cols-1 lg:grid-cols-3 gap-8 */}
        </div> {/* Closes max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 */}
      </div> {/* Closes min-h-screen bg-gray-50 */}
    </SignedIn>
  );
};

export default Profile;
