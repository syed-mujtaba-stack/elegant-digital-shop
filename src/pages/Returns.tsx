
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Package, CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const Returns = () => {
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    condition: '',
    description: ''
  });

  const returnReasons = [
    "Item damaged during shipping",
    "Received wrong item",
    "Item doesn't match description",
    "Changed my mind",
    "Item defective/not working",
    "Size/fit issues",
    "Quality not as expected",
    "Other"
  ];

  const itemConditions = [
    "New/Unused with tags",
    "New/Unused without tags", 
    "Gently used",
    "Used with wear",
    "Damaged"
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Fill out the return form below",
      icon: Package
    },
    {
      step: 2,
      title: "Get Return Label",
      description: "We'll email you a prepaid return label",
      icon: CreditCard
    },
    {
      step: 3,
      title: "Ship Your Item",
      description: "Pack securely and ship using our label",
      icon: RotateCcw
    },
    {
      step: 4,
      title: "Receive Refund",
      description: "Refund processed within 3-5 business days",
      icon: CheckCircle
    }
  ];

  const returnPolicies = [
    {
      icon: Clock,
      title: "30-Day Return Window",
      description: "Items can be returned within 30 days of delivery"
    },
    {
      icon: Package,
      title: "Original Condition",
      description: "Items must be in original condition with tags attached"
    },
    {
      icon: CreditCard,
      title: "Free Return Shipping",
      description: "We provide prepaid return labels for all returns"
    },
    {
      icon: CheckCircle,
      title: "Full Refund Guarantee",
      description: "100% refund to original payment method"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setReturnForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Return form submitted:', returnForm);
    // Simulate form submission
    alert('Return request submitted successfully! You will receive an email with return instructions.');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-black dark:bg-white text-white dark:text-black text-lg px-6 py-2">
              Returns & Exchanges
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Easy Returns Process
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Not completely satisfied? No problem. We offer hassle-free returns 
              within 30 days with free return shipping and full refunds.
            </p>
          </div>
        </div>
      </section>

      {/* Return Policies */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Our Return Policy</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simple, fair, and customer-friendly policies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnPolicies.map((policy, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <policy.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{policy.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{policy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Return Process Steps */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">How Returns Work</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Follow these simple steps to return your item
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white dark:text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-black dark:text-white">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Form */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-black dark:text-white">Start a Return</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below to initiate your return request
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReturn} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderNumber" className="text-black dark:text-white">Order Number *</Label>
                    <Input
                      id="orderNumber"
                      value={returnForm.orderNumber}
                      onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                      placeholder="ES123456789"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black dark:text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={returnForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason" className="text-black dark:text-white">Reason for Return *</Label>
                  <Select value={returnForm.reason} onValueChange={(value) => handleInputChange('reason', value)}>
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {returnReasons.map((reason) => (
                        <SelectItem key={reason} value={reason} className="text-black dark:text-white">
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition" className="text-black dark:text-white">Item Condition *</Label>
                  <Select value={returnForm.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select item condition" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {itemConditions.map((condition) => (
                        <SelectItem key={condition} value={condition} className="text-black dark:text-white">
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-black dark:text-white">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={returnForm.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please provide any additional details about your return..."
                    rows={4}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Submit Return Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <AlertCircle className="h-8 w-8 text-black dark:text-white mb-2" />
                <CardTitle className="text-black dark:text-white">Return Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">• Items must be returned within 30 days</p>
                <p className="text-gray-600 dark:text-gray-400">• Original packaging and tags required</p>
                <p className="text-gray-600 dark:text-gray-400">• Items must be in original condition</p>
                <p className="text-gray-600 dark:text-gray-400">• Proof of purchase required</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-black dark:text-white mb-2" />
                <CardTitle className="text-black dark:text-white">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">• Return label emailed within 24 hours</p>
                <p className="text-gray-600 dark:text-gray-400">• Package and ship using our label</p>
                <p className="text-gray-600 dark:text-gray-400">• Tracking updates sent to your email</p>
                <p className="text-gray-600 dark:text-gray-400">• Refund processed upon receipt</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Returns;
