
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { BarChart2, TrendingUp, Users, Eye } from "lucide-react";

interface AnalyticsData {
  pageViews: number[];
  uniqueVisitors: number[];
  bounceRate: number;
  avgSessionDuration: number;
}

export default function AnalyticsChart() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  if (!analytics) {
    return <div className="animate-pulse">Loading analytics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 bg-blue-950/30 border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-400">Page Views</p>
            <h3 className="text-2xl font-bold text-white">
              {analytics.pageViews.reduce((a, b) => a + b, 0)}
            </h3>
          </div>
          <Eye className="h-8 w-8 text-blue-400" />
        </div>
      </Card>
      
      <Card className="p-6 bg-green-950/30 border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-400">Unique Visitors</p>
            <h3 className="text-2xl font-bold text-white">
              {analytics.uniqueVisitors.reduce((a, b) => a + b, 0)}
            </h3>
          </div>
          <Users className="h-8 w-8 text-green-400" />
        </div>
      </Card>

      <Card className="p-6 bg-purple-950/30 border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-400">Bounce Rate</p>
            <h3 className="text-2xl font-bold text-white">
              {analytics.bounceRate}%
            </h3>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-400" />
        </div>
      </Card>

      <Card className="p-6 bg-orange-950/30 border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-400">Avg. Session</p>
            <h3 className="text-2xl font-bold text-white">
              {Math.floor(analytics.avgSessionDuration / 60)}m
            </h3>
          </div>
          <BarChart2 className="h-8 w-8 text-orange-400" />
        </div>
      </Card>
    </div>
  );
}
