
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageCircle, Phone, Mail, Clock, Search, HelpCircle, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerService = () => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: true,
      response: "Usually responds in 2-3 minutes"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a customer service representative",
      action: "Call Now",
      available: true,
      response: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your inquiry",
      action: "Send Email",
      available: true,
      response: "Usually responds within 24 hours"
    }
  ];

  const quickHelp = [
    {
      category: "Orders",
      questions: [
        "How can I track my order?",
        "Can I modify my order after placing it?",
        "What payment methods do you accept?",
        "How do I cancel my order?"
      ]
    },
    {
      category: "Shipping",
      questions: [
        "What are your shipping options?",
        "Do you ship internationally?",
        "How much does shipping cost?",
        "When will my order arrive?"
      ]
    },
    {
      category: "Returns",
      questions: [
        "What is your return policy?",
        "How do I return an item?",
        "When will I receive my refund?",
        "Can I exchange an item?"
      ]
    },
    {
      category: "Account",
      questions: [
        "How do I create an account?",
        "I forgot my password",
        "How do I update my information?",
        "How do I delete my account?"
      ]
    }
  ];

  const serviceStats = [
    { label: "Average Response Time", value: "< 2 minutes", icon: Clock },
    { label: "Customer Satisfaction", value: "98.5%", icon: Users },
    { label: "Issues Resolved", value: "99.2%", icon: HelpCircle },
    { label: "24/7 Support", value: "Available", icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-black dark:bg-white text-white dark:text-black text-lg px-6 py-2">
              Customer Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get the support you need, when you need it. Our dedicated customer service team 
              is ready to assist you with any questions or concerns.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help..."
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Stats */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {serviceStats.map((stat, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-black dark:text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-black dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Contact Support</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the best way to reach us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <option.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <CardTitle className="text-black dark:text-white">{option.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${option.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{option.response}</span>
                  </div>
                  <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Quick Help</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickHelp.map((category, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-black dark:text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <li key={qIndex}>
                        <Link 
                          to="/faq" 
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                          {question}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              More ways to get the help you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <FileText className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Knowledge Base</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive guides and tutorials
                </p>
                <Link to="/faq">
                  <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                    Browse Articles
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Community Forum</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Connect with other customers
                </p>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  Join Community
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Video Tutorials</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Step-by-step video guides
                </p>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerService;
