import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { transactionService } from '../../../services/transactionService';
import { HiPlus } from 'react-icons/hi';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await transactionService.getFamilyTransactions();
            setTransactions(response);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError(err.response?.data?.message || 'Failed to fetch transactions. Please try again.');
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <button
                        className="btn btn-primary gap-2"
                        onClick={() => navigate('/transactions/add')}
                    >
                        <HiPlus className="h-5 w-5" />
                        Add Transaction
                    </button>
                </div>

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.category}</td>
                                    <td>
                                        <span className={`badge ${transaction.transactionType === 'INCOME'
                                                ? 'badge-success'
                                                : 'badge-error'
                                            }`}>
                                            {transaction.transactionType}
                                        </span>
                                    </td>
                                    <td className={`text-right ${transaction.transactionType === 'INCOME'
                                            ? 'text-success'
                                            : 'text-error'
                                        }`}>
                                        {transaction.transactionType === 'INCOME' ? '+' : '-'}
                                        ${Math.abs(transaction.amount).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions.length === 0 && !loading && (
                    <div className="text-center py-8">
                        <p className="text-base-content/70">No transactions found. Add one to get started!</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default TransactionsPage; 