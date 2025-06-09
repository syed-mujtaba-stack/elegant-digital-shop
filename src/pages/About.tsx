
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Target, Heart, Shield, Truck } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop",
      bio: "10+ years in retail and e-commerce"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Tech visionary with startup experience"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Award-winning UX/UI designer"
    },
    {
      name: "David Wilson",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Logistics and supply chain expert"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We curate only the finest products that meet our strict quality standards."
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "Every decision we make puts our customers' needs and satisfaction first."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your privacy and security are our top priorities in everything we do."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick, reliable shipping to get your products to you when you need them."
    }
  ];

  const milestones = [
    { year: "2018", event: "Company founded with a vision for premium e-commerce" },
    { year: "2019", event: "Reached 10,000 satisfied customers" },
    { year: "2020", event: "Expanded to international shipping" },
    { year: "2021", event: "Launched mobile app with 100k+ downloads" },
    { year: "2022", event: "Achieved carbon-neutral shipping" },
    { year: "2023", event: "Opened second fulfillment center" },
    { year: "2024", event: "Serving 500k+ customers worldwide" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-black dark:bg-white text-white dark:text-black text-lg px-6 py-2">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
              About EliteShop
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Founded in 2018, EliteShop has been revolutionizing the premium e-commerce experience 
              by curating exceptional products and delivering unmatched customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                To democratize access to premium products while maintaining the highest standards 
                of quality, service, and ethical business practices. We believe everyone deserves 
                access to exceptional products that enhance their lifestyle.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our commitment extends beyond commerce - we're building a community of discerning 
                customers who value quality, authenticity, and sustainable practices.
              </p>
              <div className="flex gap-4">
                <Award className="h-12 w-12 text-black dark:text-white" />
                <div>
                  <h3 className="font-semibold text-black dark:text-white">Award Winning</h3>
                  <p className="text-gray-600 dark:text-gray-400">Recognized for excellence in customer service</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-lg shadow-xl filter grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The passionate people behind EliteShop
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover filter grayscale"
                  />
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Timeline Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Key milestones in our growth story
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <Badge className="bg-black dark:bg-white text-white dark:text-black">{milestone.year}</Badge>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 dark:text-gray-300">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black dark:bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white dark:text-black mb-4">
            Ready to Experience Premium Shopping?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-700 mb-8">
            Join thousands of satisfied customers who trust EliteShop for their premium needs.
          </p>
          <Button size="lg" className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
            Start Shopping
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
