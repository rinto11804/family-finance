import {
    HiCurrencyRupee,
    HiArrowTrendingUp,
    HiArrowTrendingDown
} from 'react-icons/hi2';
import StatsCard from './StatsCard';

const IncomeStats = ({ stats }) => {
    const statsData = [
        {
            title: "Monthly Income",
            value: stats.monthlyIncome,
            icon: <HiCurrencyRupee className="h-6 w-6" />,
            trend: "up",
            trendValue: stats.incomeChange
        },
        {
            title: "Monthly Expenses",
            value: stats.monthlyExpenses,
            icon: <HiArrowTrendingDown className="h-6 w-6" />,
            trend: "down",
            trendValue: stats.expenseChange
        },
        {
            title: "Total Savings",
            value: stats.totalSavings,
            icon: <HiArrowTrendingUp className="h-6 w-6" />,
            trend: "up",
            trendValue: stats.savingsChange
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default IncomeStats; 