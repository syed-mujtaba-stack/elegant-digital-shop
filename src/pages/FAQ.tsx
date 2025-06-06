
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, ShoppingCart, Truck, RotateCcw, CreditCard, Users, Shield } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: "Orders & Shopping",
      icon: ShoppingCart,
      faqs: [
        {
          question: "How do I place an order?",
          answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 2 hours of placing it. Contact our customer service team immediately if you need to make changes."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers."
        },
        {
          question: "Do you offer price matching?",
          answer: "Yes, we offer price matching for identical items from authorized retailers. Contact us with the competitor's price and we'll match it."
        },
        {
          question: "How do I apply a discount code?",
          answer: "Enter your discount code in the 'Promo Code' field during checkout before completing your payment."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      icon: Truck,
      faqs: [
        {
          question: "What are your shipping options?",
          answer: "We offer Standard (5-7 days, free over $50), Express (2-3 days, $9.99), Overnight (1 day, $24.99), and International shipping (7-14 days, $19.99+)."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard or on our shipping information page."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination."
        },
        {
          question: "What if my package is lost or damaged?",
          answer: "If your package is lost or arrives damaged, contact us immediately. We'll investigate with the carrier and provide a replacement or full refund."
        },
        {
          question: "Can I change my shipping address?",
          answer: "You can change your shipping address within 2 hours of placing your order, before it's processed for shipping."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      icon: RotateCcw,
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer 30-day returns for items in original condition with tags attached. We provide free return shipping labels for all returns."
        },
        {
          question: "How do I return an item?",
          answer: "Fill out our return form, print the prepaid return label we email you, package the item securely, and ship it back to us."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will appear on your original payment method."
        },
        {
          question: "Can I exchange an item for a different size?",
          answer: "Yes, we offer free exchanges for different sizes within 30 days. Follow the same return process and specify you want an exchange."
        },
        {
          question: "What items cannot be returned?",
          answer: "Personalized items, final sale items, and intimate apparel cannot be returned for hygiene reasons."
        }
      ]
    },
    {
      category: "Account & Payment",
      icon: CreditCard,
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top navigation, enter your email and create a password. You can also create an account during checkout."
        },
        {
          question: "I forgot my password, what should I do?",
          answer: "Click 'Forgot Password' on the login page and enter your email. We'll send you a link to reset your password."
        },
        {
          question: "How do I update my account information?",
          answer: "Log into your account and go to 'Profile Settings' where you can update your personal information, addresses, and payment methods."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details."
        },
        {
          question: "Can I save multiple addresses?",
          answer: "Yes, you can save multiple shipping and billing addresses in your account for faster checkout."
        }
      ]
    },
    {
      category: "Products & Quality",
      icon: Shield,
      faqs: [
        {
          question: "Are your products authentic?",
          answer: "Yes, we guarantee that all our products are 100% authentic. We work directly with authorized dealers and manufacturers."
        },
        {
          question: "Do you offer product warranties?",
          answer: "Many of our products come with manufacturer warranties. Warranty information is displayed on each product page."
        },
        {
          question: "How do I know what size to order?",
          answer: "Each product page includes detailed size charts and measurements. You can also contact customer service for sizing advice."
        },
        {
          question: "Can I see more photos of a product?",
          answer: "Product pages include multiple high-resolution photos. You can zoom in and view products from different angles."
        },
        {
          question: "Do you restock sold-out items?",
          answer: "We regularly restock popular items. You can sign up for restock notifications on product pages to be alerted when items are available again."
        }
      ]
    },
    {
      category: "Customer Service",
      icon: Users,
      faqs: [
        {
          question: "How can I contact customer service?",
          answer: "You can reach us via live chat, phone (1-800-ELITE-SHOP), or email (support@eliteshop.com). Our hours are Mon-Fri 9AM-6PM EST."
        },
        {
          question: "What languages does customer service support?",
          answer: "Our customer service team primarily supports English, with Spanish and French support available during business hours."
        },
        {
          question: "How quickly do you respond to emails?",
          answer: "We typically respond to emails within 24 hours during business days, often much sooner."
        },
        {
          question: "Do you offer phone support?",
          answer: "Yes, phone support is available Mon-Fri 9AM-6PM EST at 1-800-ELITE-SHOP."
        },
        {
          question: "Can I schedule a callback?",
          answer: "Yes, you can request a callback through our customer service page and we'll call you at your preferred time."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-black dark:bg-white text-white dark:text-black text-lg px-6 py-2">
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              How Can We Help?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about shopping, shipping, returns, and more. 
              Can't find what you're looking for? Contact our customer service team.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-black dark:text-white">
                    <category.icon className="h-6 w-6" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">No FAQs found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or browse all categories above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Our customer service team is here to help with any additional questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Contact Support
            </a>
            <a
              href="/customer-service"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Customer Service
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
