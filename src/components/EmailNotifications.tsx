
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mail, Bell, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NotificationSettings {
  orderConfirmation: boolean;
  shippingUpdates: boolean;
  deliveryNotifications: boolean;
  promotionalEmails: boolean;
  priceDropAlerts: boolean;
  backInStockAlerts: boolean;
  weeklyDigest: boolean;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  lastSent?: Date;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'order_confirmation',
    name: 'Order Confirmation',
    subject: 'Your order has been confirmed!',
    description: 'Sent when an order is successfully placed',
    lastSent: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 'shipping_update',
    name: 'Shipping Update',
    subject: 'Your order is on its way!',
    description: 'Sent when order status changes',
    lastSent: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: 'delivery_notification',
    name: 'Delivery Notification',
    subject: 'Your order has been delivered!',
    description: 'Sent when order is delivered'
  },
  {
    id: 'promotional',
    name: 'Promotional Emails',
    subject: 'Special offers just for you!',
    description: 'Marketing emails and special offers',
    lastSent: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  }
];

export const EmailNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    orderConfirmation: true,
    shippingUpdates: true,
    deliveryNotifications: true,
    promotionalEmails: false,
    priceDropAlerts: true,
    backInStockAlerts: true,
    weeklyDigest: false
  });

  const [testEmail, setTestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const sendTestEmail = async (templateId: string) => {
    if (!testEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send test email.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const template = emailTemplates.find(t => t.id === templateId);
    toast({
      title: "Test email sent!",
      description: `"${template?.name}" sent to ${testEmail}`,
    });
    setIsLoading(false);
  };

  const formatTimeAgo = (date: Date) => {
    const diffTime = Date.now() - date.getTime();
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Email Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between space-x-2">
                <Label htmlFor={key} className="text-sm">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => updateSetting(key as keyof NotificationSettings, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="Enter email for testing"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              type="email"
              className="flex-1"
            />
          </div>

          <div className="space-y-3">
            {emailTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{template.name}</h3>
                    {template.lastSent && (
                      <Badge variant="secondary" className="text-xs">
                        Last sent {formatTimeAgo(template.lastSent)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {template.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {template.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendTestEmail(template.id)}
                    disabled={isLoading}
                  >
                    Send Test
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Email Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Emails Sent</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">89.2%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">42.1%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Open Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">12.8%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Click Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
