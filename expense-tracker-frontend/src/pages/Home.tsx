import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashoardLayout';
import { InfoCard } from '../components/InfoCard';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';


import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  PlusCircle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { UserContext } from '../context/UserContext';


interface DashboardData {
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  recentTransactions?: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

const Home: React.FC = () => {


  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
    const { updateUser } = useContext(UserContext)!;

  
  const addThousandSeparator = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const fetchDashboardData = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get<DashboardData>(API_PATHS.DASHBOARD.GET_DASHBOARD_DATA);
      
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddTransaction = () => {
    navigate('/add-transaction');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="space-y-6">
    
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your expenses and income</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddTransaction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
            <button
              onClick={handleViewReports}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </button>
          </div>
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard 
            icon={<Wallet className="w-6 h-6" />} 
            label="Total Balance" 
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-blue-500"
            description="Current account balance"
          />
          
          <InfoCard 
            icon={<TrendingUp className="w-6 h-6" />} 
            label="Total Income" 
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
            description="All time income"
          />
          
          <InfoCard 
            icon={<TrendingDown className="w-6 h-6" />} 
            label="Total Expenses" 
            value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
            description="All time expenses"
          />
          
          <InfoCard 
            icon={<DollarSign className="w-6 h-6" />} 
            label="Net Worth" 
            value={addThousandSeparator((dashboardData?.totalIncome || 0) - (dashboardData?.totalExpenses || 0))}
            color="bg-purple-500"
            description="Income - Expenses"
          />
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Income</span>
                <span className="text-green-600 font-semibold">
                  {addThousandSeparator(dashboardData?.monthlyIncome || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Expenses</span>
                <span className="text-red-600 font-semibold">
                  {addThousandSeparator(dashboardData?.monthlyExpenses || 0)}
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-semibold">Net This Month</span>
                <span className={`font-bold ${
                  (dashboardData?.monthlyIncome || 0) - (dashboardData?.monthlyExpenses || 0) >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {addThousandSeparator((dashboardData?.monthlyIncome || 0) - (dashboardData?.monthlyExpenses || 0))}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/add-income')}
                className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <span className="text-sm text-green-600 font-medium">Add Income</span>
              </button>
              
              <button
                onClick={() => navigate('/add-expense')}
                className="p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
              >
                <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-sm text-red-600 font-medium">Add Expense</span>
              </button>
              
              <button
                onClick={() => navigate('/categories')}
                className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <span className="text-sm text-blue-600 font-medium">Categories</span>
              </button>
              
              <button
                onClick={() => navigate('/budget')}
                className="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
              >
                <Wallet className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <span className="text-sm text-purple-600 font-medium">Budget</span>
              </button>
            </div>
          </div>
        </div>

     
        {dashboardData?.recentTransactions && dashboardData.recentTransactions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button
                onClick={() => navigate('/transactions')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {dashboardData.recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{addThousandSeparator(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;