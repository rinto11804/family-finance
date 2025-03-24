import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { transactionService } from '../../../services/transactionService';
import { categoryService } from '../../../services/categoryService';
import { HiTag, HiCurrencyDollar } from 'react-icons/hi';

const AddTransactionPage = () => {
    const [formData, setFormData] = useState({
        amount: '',
        categoryId: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        transactionType: 'EXPENSE'
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategories();
            setCategories(response);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError('Failed to fetch categories. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await transactionService.addTransaction({
                ...formData,
                amount: parseFloat(formData.amount)
            });
            navigate('/transactions');
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError(err.response?.data?.message || 'Failed to add transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Add New Transaction</h1>

                    {error && (
                        <div className="alert alert-error mb-6">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Transaction Type</span>
                                    </label>
                                    <select
                                        name="transactionType"
                                        value={formData.transactionType}
                                        onChange={handleChange}
                                        className="select select-bordered w-full"
                                        required
                                        disabled={loading}
                                    >
                                        <option value="EXPENSE">Expense</option>
                                        <option value="INCOME">Income</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Amount</span>
                                    </label>
                                    <div className="join w-full">
                                        <span className="join-item bg-base-200 px-3 flex items-center">
                                            <HiCurrencyDollar className="h-5 w-5 text-base-content/70" />
                                        </span>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            className="join-item input input-bordered w-full"
                                            required
                                            min="0"
                                            step="0.01"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <div className="join w-full">
                                        <span className="join-item bg-base-200 px-3 flex items-center">
                                            <HiTag className="h-5 w-5 text-base-content/70" />
                                        </span>
                                        <select
                                            name="categoryId"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            className="join-item select select-bordered w-full"
                                            required
                                            disabled={loading}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter transaction description"
                                        className="input input-bordered w-full"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className={`btn btn-primary flex-1 ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        Add Transaction
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => navigate('/transactions')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddTransactionPage; 