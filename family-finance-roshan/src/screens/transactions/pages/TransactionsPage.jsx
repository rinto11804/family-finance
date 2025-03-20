import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import TransactionsList from '../components/TransactionsList';
import TransactionCharts from '../components/TransactionCharts';
import { HiPlus } from 'react-icons/hi2';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([
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
            title: "Salary Credit",
            amount: "+₹50,000",
            date: "2 days ago",
            category: "Income",
            type: "income"
        }
    ]);

    const handleAddTransaction = (newTransaction) => {
        setTransactions(prev => [newTransaction, ...prev]);
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                </div>

                <div className="space-y-8">
                    {/* Charts Section */}
                    <TransactionCharts />

                    {/* Transactions List */}
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <TransactionsList
                                transactions={transactions}
                                onAddTransaction={handleAddTransaction}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransactionsPage; 