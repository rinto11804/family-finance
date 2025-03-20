import { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import IncomeStats from '../components/IncomeStats';
import FamilyMembers from '../components/FamilyMembers';
import CalendarEvents from '../components/CalendarEvents';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const DashboardPage = () => {
    const [familyData, setFamilyData] = useState({
        familyName: "Smith Family",
        stats: {
            monthlyIncome: "₹82,500",
            monthlyExpenses: "₹48,900",
            totalSavings: "₹2,35,000",
            incomeChange: 12,
            expenseChange: -8,
            savingsChange: 23
        },
        members: [
            { name: "John Smith", role: "Family Head", income: "₹50,000" },
            { name: "Sarah Smith", role: "Member", income: "₹32,500" },
            { name: "Mike Smith", role: "Member", income: "₹28,000" }
        ],
        transactions: [
            {
                title: "Grocery Shopping",
                amount: "-₹1,200",
                date: "Today",
                category: "Shopping",
                type: "expense"
            },
            {
                title: "Rent Payment",
                amount: "-₹12,000",
                date: "Yesterday",
                category: "Housing",
                type: "expense"
            },
            {
                title: "Car Insurance",
                amount: "-₹8,500",
                date: "2 days ago",
                category: "Transport",
                type: "expense"
            }
        ]
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // In real application, fetch data from your API
        // fetchFamilyData().then(data => {
        //   setFamilyData(data);
        //   setIsLoading(false);
        // });
    }, []);

    const handleAddTransaction = (newTransaction) => {
        setFamilyData(prev => ({
            ...prev,
            transactions: [newTransaction, ...prev.transactions]
        }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <DashboardHeader familyName={familyData.familyName} />

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
                        <IncomeStats stats={familyData.stats} />
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <CalendarEvents />
                        </div>

                        <div className="lg:col-span-1">
                            <FamilyMembers members={familyData.members} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage; 