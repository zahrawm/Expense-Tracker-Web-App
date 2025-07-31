import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    sales: 4000,
    revenue: 2400,
  },
  {
    name: 'Feb',
    sales: 3000,
    revenue: 1398,
  },
  {
    name: 'Mar',
    sales: 2000,
    revenue: 9800,
  },
  {
    name: 'Apr',
    sales: 2780,
    revenue: 3908,
  },
  {
    name: 'May',
    sales: 1890,
    revenue: 4800,
  },
  {
    name: 'Jun',
    sales: 2390,
    revenue: 3800,
  },
  {
    name: 'Jul',
    sales: 3490,
    revenue: 4300,
  },
];

const SampleGraph = () => {
  return (
    <div className="w-full h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Monthly Sales & Revenue Report
        </h2>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#374151' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="sales" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="revenue" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-6 flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleGraph;