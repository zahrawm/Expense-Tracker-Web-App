import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  CreditCard,
  ShoppingCart,
  Home,
  Car,
  Coffee,
  Smartphone,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useContext';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

const Expense: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  useAuthContext();

  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const totalBalance = 2847.32;
  const monthlyIncome = 4200.00;
  const monthlyExpenses = 1352.68;
  const savingsRate = 67.8;

  const recentTransactions: Transaction[] = [
    { id: '1', amount: -45.67, description: 'Grocery Store', category: 'Food', date: '2025-08-17', type: 'expense' },
    { id: '2', amount: -12.50, description: 'Coffee Shop', category: 'Food', date: '2025-08-17', type: 'expense' },
    { id: '3', amount: 2100.00, description: 'Salary Deposit', category: 'Salary', date: '2025-08-15', type: 'income' },
    { id: '4', amount: -89.99, description: 'Internet Bill', category: 'Bills', date: '2025-08-14', type: 'expense' },
    { id: '5', amount: -25.00, description: 'Gas Station', category: 'Transport', date: '2025-08-13', type: 'expense' },
  ];

  const categorySpending: CategorySpending[] = [
    { category: 'Food & Dining', amount: 456.78, percentage: 33.8, icon: <Coffee className="w-5 h-5" />, color: 'bg-blue-500' },
    { category: 'Transport', amount: 234.50, percentage: 17.3, icon: <Car className="w-5 h-5" />, color: 'bg-green-500' },
    { category: 'Bills & Utilities', amount: 189.99, percentage: 14.0, icon: <Home className="w-5 h-5" />, color: 'bg-purple-500' },
    { category: 'Shopping', amount: 167.32, percentage: 12.4, icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-orange-500' },
    { category: 'Entertainment', amount: 89.45, percentage: 6.6, icon: <Smartphone className="w-5 h-5" />, color: 'bg-pink-500' },
    { category: 'Others', amount: 214.64, percentage: 15.9, icon: <MoreHorizontal className="w-5 h-5" />, color: 'bg-gray-500' },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const fetchExpenseData = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get<Transaction[]>(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const handleAddTransaction = () => {
    navigate('/home');
  };

  const handleViewReports = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Track your expenses and manage your budget</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
            <button 
              onClick={handleAddTransaction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalBalance)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(monthlyIncome)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monthly Expenses</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(monthlyExpenses)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">+3.1%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Savings Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{savingsRate}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5.7%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {(expenseData.length > 0 ? expenseData : recentTransactions).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <CreditCard className={`w-5 h-5 ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleViewReports}
                className="w-full mt-4 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
              >
                View All Transactions
              </button>
            </div>
          </div>

          {/* Spending by Category */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Spending by Category</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {categorySpending.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                          <div className={category.color.replace('bg-', 'text-')}>
                            {category.icon}
                          </div>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">{formatCurrency(category.amount)}</p>
                        <p className="text-xs text-gray-600">{category.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;