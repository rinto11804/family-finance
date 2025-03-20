import { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaChartLine, FaWallet, FaChartPie, FaArrowUp, FaArrowDown, FaPiggyBank, FaRegCalendarAlt } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function AnalyticsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('6months');
    const [savingsMetric, setSavingsMetric] = useState('total'); // 'total' | 'monthly' | 'goal'

    // Sample data - replace with real data from your backend
    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                data: [4500, 4800, 4600, 4900, 5100, 5300],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: [3800, 4100, 3900, 4200, 4400, 4100],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };

    const categoryData = {
        labels: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Others'],
        datasets: [{
            data: [35, 25, 15, 10, 10, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        }],
    };

    const savingsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Savings',
                data: [700, 1500, 2250, 3150, 4150, 5350, 6550, 7750, 9250, 10450, 11950, 13150],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Monthly Savings',
                data: [700, 800, 750, 900, 1000, 1200, 1200, 1200, 1500, 1200, 1500, 1200],
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Savings Goal',
                data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderDash: [5, 5],
                tension: 0,
            }
        ],
    };

    const savingsSummary = {
        currentTotal: 13150,
        monthlyAverage: 1096,
        yearlyProjection: 15800,
        goalProgress: 82, // percentage
        goalAmount: 16000
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    family: "'Inter', sans-serif"
                },
                bodyFont: {
                    size: 13,
                    family: "'Inter', sans-serif"
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-4 md:mb-0">
                        Financial Analytics
                    </h1>
                    <div className="join">
                        <button 
                            className={`join-item btn ${selectedPeriod === '1month' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedPeriod('1month')}
                        >
                            1M
                        </button>
                        <button 
                            className={`join-item btn ${selectedPeriod === '6months' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedPeriod('6months')}
                        >
                            6M
                        </button>
                        <button 
                            className={`join-item btn ${selectedPeriod === '1year' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setSelectedPeriod('1year')}
                        >
                            1Y
                        </button>
                    </div>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <FaWallet className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="card-title text-primary mb-1">Total Income</h2>
                                    <p className="text-3xl font-bold">INR 29,200</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaArrowUp className="text-success" />
                                        <span className="text-success text-sm font-medium">8% from last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/10 rounded-lg">
                                    <FaChartLine className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h2 className="card-title text-secondary mb-1">Total Expenses</h2>
                                    <p className="text-3xl font-bold">INR 24,500</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaArrowUp className="text-error" />
                                        <span className="text-error text-sm font-medium">5% from last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-accent/10 rounded-lg">
                                    <FaChartPie className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h2 className="card-title text-accent mb-1">Net Savings</h2>
                                    <p className="text-3xl font-bold">INR 4,700</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <FaArrowUp className="text-success" />
                                        <span className="text-success text-sm font-medium">12% from last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body">
                            <h2 className="card-title mb-6 text-xl font-semibold flex items-center gap-2">
                                <FaChartLine className="text-primary" />
                                Income vs Expenses
                            </h2>
                            <Bar 
                                data={monthlyData}
                                options={{
                                    ...chartOptions,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: 'rgba(0, 0, 0, 0.05)'
                                            }
                                        },
                                        x: {
                                            grid: {
                                                display: false
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body">
                            <h2 className="card-title mb-6 text-xl font-semibold flex items-center gap-2">
                                <FaChartPie className="text-secondary" />
                                Expense Categories
                            </h2>
                            <Pie 
                                data={categoryData}
                                options={{
                                    ...chartOptions,
                                    plugins: {
                                        ...chartOptions.plugins,
                                        legend: {
                                            position: 'right',
                                            labels: {
                                                padding: 20,
                                                font: {
                                                    size: 12
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Enhanced Savings Trend Section */}
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 lg:col-span-2">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h2 className="card-title text-xl font-semibold flex items-center gap-2">
                                    <FaPiggyBank className="text-accent" />
                                    Savings Analysis
                                </h2>
                                <div className="join mt-4 md:mt-0">
                                    <button 
                                        className={`join-item btn btn-sm INR {savingsMetric === 'total' ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => setSavingsMetric('total')}
                                    >
                                        Total
                                    </button>
                                    <button 
                                        className={`join-item btn btn-sm ${savingsMetric === 'monthly' ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => setSavingsMetric('monthly')}
                                    >
                                        Monthly
                                    </button>
                                    <button 
                                        className={`join-item btn btn-sm ${savingsMetric === 'goal' ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => setSavingsMetric('goal')}
                                    >
                                        Goal
                                    </button>
                                </div>
                            </div>

                            {/* Savings Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="stats bg-base-200 shadow">
                                    <div className="stat">
                                        <div className="stat-title">Total Savings</div>
                                        <div className="stat-value text-primary">INR {savingsSummary.currentTotal}</div>
                                        <div className="stat-desc">
                                            <FaArrowUp className="inline mr-1 text-success" />
                                            vs last month
                                        </div>
                                    </div>
                                </div>
                                <div className="stats bg-base-200 shadow">
                                    <div className="stat">
                                        <div className="stat-title">Monthly Average</div>
                                        <div className="stat-value text-secondary">INR {savingsSummary.monthlyAverage}</div>
                                        <div className="stat-desc">per month</div>
                                    </div>
                                </div>
                                <div className="stats bg-base-200 shadow">
                                    <div className="stat">
                                        <div className="stat-title">Year Projection</div>
                                        <div className="stat-value text-accent">INR {savingsSummary.yearlyProjection}</div>
                                        <div className="stat-desc">by end of year</div>
                                    </div>
                                </div>
                                <div className="stats bg-base-200 shadow">
                                    <div className="stat">
                                        <div className="stat-title">Goal Progress</div>
                                        <div className="stat-value text-info">{savingsSummary.goalProgress}%</div>
                                        <div className="stat-desc">of INR{savingsSummary.goalAmount}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Savings Chart */}
                            <div className="h-[400px]"> {/* Fixed height for better visualization */}
                                <Line 
                                    data={{
                                        ...savingsData,
                                        datasets: savingsData.datasets.filter(ds => 
                                            (savingsMetric === 'total' && ds.label === 'Total Savings') ||
                                            (savingsMetric === 'monthly' && ds.label === 'Monthly Savings') ||
                                            (savingsMetric === 'goal' && (ds.label === 'Total Savings' || ds.label === 'Savings Goal'))
                                        )
                                    }}
                                    options={{
                                        ...chartOptions,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                grid: {
                                                    color: 'rgba(0, 0, 0, 0.05)'
                                                },
                                                ticks: {
                                                    callback: value => `$${value}`
                                                }
                                            },
                                            x: {
                                                grid: {
                                                    display: false
                                                }
                                            }
                                        },
                                        plugins: {
                                            ...chartOptions.plugins,
                                            tooltip: {
                                                ...chartOptions.plugins.tooltip,
                                                callbacks: {
                                                    label: context => `${context.dataset.label}: $${context.parsed.y}`
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage; 