import { useState } from 'react';
import {
    HiXMark,
    HiCurrencyRupee,
    HiTag,
    HiCalendar,
    HiPencil
} from 'react-icons/hi2';

const TransactionModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle transaction submission
        console.log(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">New Transaction</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
                        <HiXMark className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            className={`flex-1 btn ${formData.type === 'expense' ? 'btn-error' : 'btn-outline btn-error'}`}
                            onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            className={`flex-1 btn ${formData.type === 'income' ? 'btn-success' : 'btn-outline btn-success'}`}
                            onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                        >
                            Income
                        </button>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Amount</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 flex items-center">
                                <HiCurrencyRupee className="h-5 w-5" />
                            </span>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="0.00"
                                className="join-item input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Category</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 flex items-center">
                                <HiTag className="h-5 w-5" />
                            </span>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="join-item select select-bordered w-full"
                                required
                            >
                                <option value="">Select category</option>
                                <option value="food">Food & Dining</option>
                                <option value="transport">Transportation</option>
                                <option value="housing">Housing</option>
                                <option value="utilities">Utilities</option>
                                <option value="shopping">Shopping</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Date</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 flex items-center">
                                <HiCalendar className="h-5 w-5" />
                            </span>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                className="join-item input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Description</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 flex items-center">
                                <HiPencil className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter description"
                                className="join-item input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal; 