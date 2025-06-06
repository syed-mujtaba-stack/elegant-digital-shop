
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Phone, Mail, FileText, Video, Users, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Support = () => {
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: '',
    message: '',
    orderNumber: ''
  });

  const [isChatActive, setIsChatActive] = useState(false);

  const supportCategories = [
    "Order Issues",
    "Shipping Questions",
    "Return/Exchange",
    "Payment Problems",
    "Product Information",
    "Account Help",
    "Technical Issues",
    "Other"
  ];

  const priorityLevels = [
    "Low - General inquiry",
    "Medium - Standard issue",
    "High - Urgent matter",
    "Critical - Account/payment issue"
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support agents",
      status: "Online",
      responseTime: "< 2 minutes",
      available: true
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with a representative",
      status: "Available",
      responseTime: "Mon-Fri 9AM-6PM EST",
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed support requests",
      status: "24/7",
      responseTime: "< 24 hours",
      available: true
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Screen sharing for technical issues",
      status: "By appointment",
      responseTime: "Same day",
      available: true
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Knowledge Base",
      description: "Comprehensive guides and tutorials",
      link: "/faq"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other customers",
      link: "#"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "#"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setSupportForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support form submitted:', supportForm);
    toast({
      title: "Support request submitted!",
      description: "We've received your request and will respond within 24 hours.",
    });
    setSupportForm({
      name: '',
      email: '',
      subject: '',
      category: '',
      priority: '',
      message: '',
      orderNumber: ''
    });
  };

  const handleStartChat = () => {
    setIsChatActive(true);
    toast({
      title: "Chat started!",
      description: "You're now connected to a support agent.",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-black dark:bg-white text-white dark:text-black text-lg px-6 py-2">
              Support Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Get Expert Support
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our dedicated support team is here to help you with any questions, issues, or concerns. 
              Choose the support method that works best for you.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Support team is currently online</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Choose Your Support Method</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Multiple ways to get the help you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <option.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-2" />
                  <CardTitle className="text-black dark:text-white">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{option.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${option.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{option.status}</span>
                  </div>
                  <p className="text-xs text-gray-400">{option.responseTime}</p>
                  <Button 
                    className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    onClick={option.title === "Live Chat" ? handleStartChat : undefined}
                  >
                    {option.title === "Live Chat" ? "Start Chat" : `Contact via ${option.title.split(' ')[0]}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      {isChatActive && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
          <div className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Live Chat</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsChatActive(false)}
              className="text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              ×
            </Button>
          </div>
          <div className="p-4 h-80 flex flex-col">
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded p-3 mb-3 overflow-y-auto">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Support Agent:</strong> Hi! How can I help you today?
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button size="sm" className="bg-black dark:bg-white text-white dark:text-black">Send</Button>
            </div>
          </div>
        </div>
      )}

      {/* Support Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-black dark:text-white">Submit a Support Request</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSupport} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-black dark:text-white">Name *</Label>
                    <Input
                      id="name"
                      value={supportForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black dark:text-white">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={supportForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-black dark:text-white">Category *</Label>
                    <Select value={supportForm.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800">
                        {supportCategories.map((category) => (
                          <SelectItem key={category} value={category} className="text-black dark:text-white">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-black dark:text-white">Priority *</Label>
                    <Select value={supportForm.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800">
                        {priorityLevels.map((priority) => (
                          <SelectItem key={priority} value={priority} className="text-black dark:text-white">
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject" className="text-black dark:text-white">Subject *</Label>
                    <Input
                      id="subject"
                      value={supportForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="orderNumber" className="text-black dark:text-white">Order Number (if applicable)</Label>
                    <Input
                      id="orderNumber"
                      value={supportForm.orderNumber}
                      onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                      placeholder="ES123456789"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-black dark:text-white">Message *</Label>
                  <Textarea
                    id="message"
                    value={supportForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={6}
                    placeholder="Please describe your issue in detail..."
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Submit Support Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Self-Help Resources */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Self-Help Resources</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers on your own with our comprehensive resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <resource.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                  <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Hours */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <Clock className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Support Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Live Chat</h4>
                  <p className="text-gray-600 dark:text-gray-400">24/7 Available</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Phone Support</h4>
                  <p className="text-gray-600 dark:text-gray-400">Mon-Fri: 9AM-6PM EST</p>
                  <p className="text-gray-600 dark:text-gray-400">Sat-Sun: 10AM-4PM EST</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-2">Email Support</h4>
                  <p className="text-gray-600 dark:text-gray-400">24/7 Monitoring</p>
                  <p className="text-gray-600 dark:text-gray-400">Response within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Support;
