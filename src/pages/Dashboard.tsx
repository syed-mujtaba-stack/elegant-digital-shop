
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductAnalytics } from '@/components/ProductAnalytics';
import { InventoryManager } from '@/components/InventoryManager';
import { EmailNotifications } from '@/components/EmailNotifications';
import { OrderTracker } from '@/components/OrderTracker';
import { BarChart3, Package, Mail, Truck } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your e-commerce store</p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <ProductAnalytics />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <InventoryManager />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderTracker />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <EmailNotifications />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
