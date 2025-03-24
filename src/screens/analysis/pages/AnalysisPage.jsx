import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { analysisService } from '../../../services/analysisService';

const AnalysisPage = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnalysisData();
    }, []);

    const fetchAnalysisData = async () => {
        try {
            const [monthly, categories, trends] = await Promise.all([
                analysisService.getMonthlyAnalysis(),
                analysisService.getCategoryAnalysis(),
                analysisService.getTrendAnalysis()
            ]);
            setMonthlyData(monthly);
            setCategoryData(categories);
            setTrendData(trends);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError('Failed to fetch analysis data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Financial Analysis</h1>

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                {/* Monthly Overview */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Monthly Overview</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th className="text-right">Income</th>
                                        <th className="text-right">Expenses</th>
                                        <th className="text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyData.map((month) => (
                                        <tr key={month.month}>
                                            <td>{month.month}</td>
                                            <td className="text-right text-success">
                                                ${month.income.toFixed(2)}
                                            </td>
                                            <td className="text-right text-error">
                                                ${month.expenses.toFixed(2)}
                                            </td>
                                            <td className={`text-right ${month.balance >= 0 ? 'text-success' : 'text-error'}`}>
                                                ${month.balance.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Category Breakdown</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categoryData.map((category) => (
                                <div key={category.category} className="bg-base-200 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">{category.category}</span>
                                        <span className={`${category.amount >= 0 ? 'text-success' : 'text-error'}`}>
                                            ${Math.abs(category.amount).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-base-300 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${category.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spending Trends */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Spending Trends</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Previous Month</th>
                                        <th>Current Month</th>
                                        <th>Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trendData.map((trend) => (
                                        <tr key={trend.category}>
                                            <td>{trend.category}</td>
                                            <td>${trend.previousMonth.toFixed(2)}</td>
                                            <td>${trend.currentMonth.toFixed(2)}</td>
                                            <td className={`${trend.change >= 0 ? 'text-success' : 'text-error'}`}>
                                                {trend.change >= 0 ? '+' : ''}
                                                {trend.change.toFixed(1)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AnalysisPage; 