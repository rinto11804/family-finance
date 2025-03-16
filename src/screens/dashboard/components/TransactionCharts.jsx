import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { HiChartBar } from 'react-icons/hi2';

const TransactionCharts = () => {
    const [activeTab, setActiveTab] = useState('daily');

    const dailyData = [
        { date: 'Mon', income: 5000, expense: 3200 },
        { date: 'Tue', income: 4200, expense: 2800 },
        { date: 'Wed', income: 6800, expense: 3900 },
        { date: 'Thu', income: 4900, expense: 2400 },
        { date: 'Fri', income: 7200, expense: 4100 },
        { date: 'Sat', income: 3800, expense: 2900 },
        { date: 'Sun', income: 2900, expense: 1800 }
    ];

    const monthlyData = [
        { month: 'Jan', income: 82500, expense: 48900 },
        { month: 'Feb', income: 75800, expense: 42300 },
        { month: 'Mar', income: 88900, expense: 51200 },
        { month: 'Apr', income: 95000, expense: 48700 },
        { month: 'May', income: 78900, expense: 45600 },
        { month: 'Jun', income: 85400, expense: 49800 }
    ];

    const formatCurrency = (value) => {
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-base-100 p-4 rounded-lg shadow-lg border border-base-300">
                    <p className="font-medium mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className={`text-sm ${entry.name === 'income' ? 'text-success' : 'text-error'
                                }`}
                        >
                            {entry.name === 'income' ? 'Income: ' : 'Expense: '}
                            {formatCurrency(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <HiChartBar className="h-5 w-5 text-primary" />
                        <h3 className="card-title">Transaction Analysis</h3>
                    </div>
                    <div className="tabs tabs-boxed">
                        <button
                            className={`tab ${activeTab === 'daily' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('daily')}
                        >
                            Daily
                        </button>
                        <button
                            className={`tab ${activeTab === 'monthly' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={activeTab === 'daily' ? dailyData : monthlyData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis
                                dataKey={activeTab === 'daily' ? 'date' : 'month'}
                                tick={{ fill: 'currentColor' }}
                                axisLine={{ stroke: 'currentColor' }}
                            />
                            <YAxis
                                tick={{ fill: 'currentColor' }}
                                axisLine={{ stroke: 'currentColor' }}
                                tickFormatter={formatCurrency}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{
                                    paddingTop: '20px'
                                }}
                            />
                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="hsl(var(--su))"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="expense"
                                name="Expense"
                                fill="hsl(var(--er))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="stat bg-base-200/50 rounded-box p-4">
                        <div className="stat-title text-sm">Average Daily</div>
                        <div className="stat-value text-xl text-success">
                            {formatCurrency(
                                dailyData.reduce((acc, curr) => acc + curr.income, 0) /
                                dailyData.length
                            )}
                        </div>
                        <div className="stat-desc">Income</div>
                    </div>
                    <div className="stat bg-base-200/50 rounded-box p-4">
                        <div className="stat-title text-sm">Average Daily</div>
                        <div className="stat-value text-xl text-error">
                            {formatCurrency(
                                dailyData.reduce((acc, curr) => acc + curr.expense, 0) /
                                dailyData.length
                            )}
                        </div>
                        <div className="stat-desc">Expense</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCharts; 