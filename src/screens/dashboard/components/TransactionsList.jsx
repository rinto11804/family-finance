import { useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import {
    HiShoppingCart,
    HiHomeModern,
    HiTruck,
    HiCurrencyRupee
} from 'react-icons/hi2';
import TransactionModal from './TransactionModal';

const TransactionsList = ({ transactions, onAddTransaction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTransaction = (transaction) => {
        onAddTransaction(transaction);
        setIsModalOpen(false);
    };

    const getTransactionIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'shopping':
                return <HiShoppingCart className="h-5 w-5" />;
            case 'housing':
                return <HiHomeModern className="h-5 w-5" />;
            case 'transport':
                return <HiTruck className="h-5 w-5" />;
            default:
                return <HiShoppingCart className="h-5 w-5" />;
        }
    };

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="card-title">Recent Transactions</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary btn-sm gap-2"
                    >
                        <HiPlus className="h-4 w-4" />
                        New Transaction
                    </button>
                </div>

                <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-base-200/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${transaction.type === 'expense' ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
                                    }`}>
                                    {getTransactionIcon(transaction.category)}
                                </div>
                                <div>
                                    <p className="font-medium">{transaction.title}</p>
                                    <p className="text-sm text-base-content/60">{transaction.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-medium ${transaction.type === 'expense' ? 'text-error' : 'text-success'
                                    }`}>{transaction.amount}</p>
                                <p className="text-sm text-base-content/60">{transaction.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddTransaction}
                />
            </div>
        </div>
    );
};

export default TransactionsList; 