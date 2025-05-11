"use client";
import React, { useState, useEffect } from 'react';
import { PChart } from './_components/pieChart';
import { LnChart } from './_components/lineChart';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import SummaryCard from './_components/summaryCard';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  BedDouble, 
  LogOut, 
  Utensils, 
  Calendar,
  RefreshCw
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Page() {
  const router = useRouter();
  const { user, status } = useSelector((state) => state.user);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('http://localhost:3001/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user && (user.role === 'WAITER' || user.role === 'ADMIN')) {
      fetchDashboardData();
    }
  }, [user]);

  // Show loading component while fetching data
  if (status === 'loading' || loading) {
    return <div className="flex justify-center items-center h-screen"><Loading /></div>;
  }

  // Redirect if user role is not allowed
  if (user?.role !== 'WAITER' && user?.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  // Handle case when data is not available
  if (!dashboardData) {
    return <div className="p-6">Failed to load dashboard data. Please try again later.</div>;
  }

  const { hotel, restaurant, combined, lastUpdated } = dashboardData;
  
  // Format date for display
  const formattedDate = new Date(lastUpdated).toLocaleString();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Last updated: {formattedDate}</span>
          <button 
            onClick={fetchDashboardData} 
            className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            disabled={refreshing}
          >
            <RefreshCw size={16} className={`mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3 text-gray-700">Hotel Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <SummaryCard
          title="Occupancy Rate"
          value={`${hotel.occupancyRate}%`}
          change={hotel.occupancyRate > 70 ? "+5.2%" : "-2.3%"}
          isPositive={hotel.occupancyRate > 70}
          period="Since yesterday"
          icon={<BedDouble size={20} className="text-indigo-600" />}
          color="bg-indigo-100"
        />
        <SummaryCard
          title="Total Guests"
          value={hotel.totalGuests.toString()}
          change="+3"
          isPositive={true}
          period="Since yesterday"
          icon={<Users size={20} className="text-blue-600" />}
          color="bg-blue-100"
        />
        <SummaryCard
          title="Today's Check-ins"
          value={hotel.todaysCheckins.toString()}
          change="0"
          isPositive={true}
          period="Expected today"
          icon={<LogOut size={20} className="text-green-600 transform rotate-180" />}
          color="bg-green-100"
        />
        <SummaryCard
          title="Available Rooms"
          value={hotel.availableRooms.toString()}
          change={hotel.availableRooms > 3 ? "+1" : "-2"}
          isPositive={hotel.availableRooms > 3}
          period="Since yesterday"
          icon={<Calendar size={20} className="text-purple-600" />}
          color="bg-purple-100"
        />
      </div>

      <h2 className="text-lg font-semibold mb-3 text-gray-700">Restaurant Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <SummaryCard
          title="Today's Covers"
          value={restaurant.todaysCovers.toString()}
          change={restaurant.todaysCovers > 20 ? "+8.5%" : "-3.2%"}
          isPositive={restaurant.todaysCovers > 20}
          period="Since yesterday"
          icon={<Utensils size={20} className="text-amber-600" />}
          color="bg-amber-100"
        />
        <SummaryCard
          title="Table Occupancy"
          value={`${restaurant.tableOccupancy}%`}
          change={restaurant.tableOccupancy > 50 ? "+12.3%" : "-5.4%"}
          isPositive={restaurant.tableOccupancy > 50}
          period="Since yesterday"
          icon={<Users size={20} className="text-teal-600" />}
          color="bg-teal-100"
        />
        <SummaryCard
          title="Avg Spend per Guest"
          value={`$${restaurant.avgSpend}`}
          change={restaurant.avgSpend > 25 ? "+2.5%" : "-1.8%"}
          isPositive={restaurant.avgSpend > 25}
          period="Since last week"
          icon={<DollarSign size={20} className="text-emerald-600" />}
          color="bg-emerald-100"
        />
        <SummaryCard
          title="Total Orders"
          value={restaurant.totalOrders.toString()}
          change={restaurant.totalOrders > 15 ? "+11.5%" : "-4.2%"}
          isPositive={restaurant.totalOrders > 15}
          period="Since yesterday"
          icon={<ShoppingBag size={20} className="text-red-600" />}
          color="bg-red-100"
        />
      </div>

      <h2 className="text-lg font-semibold mb-3 text-gray-700">Business Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <SummaryCard
          title="Total Revenue"
          value={`$${combined.totalRevenue}`}
          change={combined.totalRevenue > 100 ? "+8.7%" : "-2.3%"}
          isPositive={combined.totalRevenue > 100}
          period="Since yesterday"
          icon={<DollarSign size={20} className="text-green-600" />}
          color="bg-green-100"
        />
        <SummaryCard
          title="Room Revenue"
          value={`$${hotel.roomRevenue}`}
          change={hotel.roomRevenue > 30 ? "+5.2%" : "-1.4%"}
          isPositive={hotel.roomRevenue > 30}
          period="Since yesterday"
          icon={<BedDouble size={20} className="text-blue-600" />}
          color="bg-blue-100"
        />
        <SummaryCard
          title="Staff on Duty"
          value={dashboardData.staff.total.toString()}
          change="0"
          isPositive={true}
          period="Current shift"
          icon={<Users size={20} className="text-violet-600" />}
          color="bg-violet-100"
        />
        <SummaryCard
          title="Inventory Alerts"
          value={combined.inventoryAlerts.toString()}
          change={combined.inventoryAlerts === 0 ? "-3" : "+2"}
          isPositive={combined.inventoryAlerts === 0}
          period="Since yesterday"
          icon={<ShoppingBag size={20} className="text-orange-600" />}
          color="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
            <LnChart />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          
          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-4">Popular Menu Items</h3>
            <div className="space-y-4">
              {restaurant.popularItems.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-amber-100 text-amber-600' : 
                      index === 1 ? 'bg-gray-100 text-gray-600' : 
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                    {item.orders} orders
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <PChart/>
        </div>
      </div>
    </div>
  );
}