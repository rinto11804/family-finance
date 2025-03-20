import { useState } from 'react';
import { HiPlus } from 'react-icons/hi2';

const CategoryForm = ({ onAddCategory, onClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Expense');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCategory({ name, type, amount: parseFloat(amount), transactions });
        setName('');
        setAmount('');
        setTransactions(0);
    };

    return (
        <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body">
                <h3 className="card-title flex items-center">
                    <HiPlus className="mr-2" />
                    Add New Category
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Category Name</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Category Type</span>
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="select select-bordered"
                        >
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Amount</span>
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="btn btn-ghost mr-2" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Category</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm; 