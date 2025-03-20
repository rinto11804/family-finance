import { useState } from 'react';
import { HiXMark, HiCurrencyRupee, HiTag, HiArrowUp, HiArrowDown, HiPencil } from 'react-icons/hi2';

const CategoryDetailsModal = ({ category, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(category);

    if (!category) return null;

    const progress = (formData.amount / formData.limit) * 100; // Calculate progress percentage

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData); // Call the update function with the new data
        onClose();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{formData.name}</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
                        <HiXMark className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center mb-2">
                        {formData.type === 'Income' ? (
                            <HiArrowUp className="text-success h-6 w-6 mr-2" />
                        ) : (
                            <HiArrowDown className="text-error h-6 w-6 mr-2" />
                        )}
                        <span className="text-sm font-medium">{formData.type} Category</span>
                    </div>

                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Category Name</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Limit</span>
                        </label>
                        <input
                            type="number"
                            value={formData.limit}
                            onChange={(e) => setFormData(prev => ({ ...prev, limit: parseFloat(e.target.value) }))}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <span className="badge badge-outline">Used: ₹{formData.amount}</span>
                        <span className="badge badge-outline ml-2">Limit: ₹{formData.limit}</span>
                    </div>

                    <div className="mb-4">
                        <div className="relative w-full h-2 bg-base-200 rounded">
                            <div
                                className="absolute h-full bg-primary rounded"
                                style={{ width: `${progress > 100 ? 100 : progress}%` }} // Cap at 100%
                            ></div>
                        </div>
                        <span className="text-xs text-base-content/60">{progress > 100 ? 'Over Budget' : `${progress.toFixed(2)}% of limit used`}</span>
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryDetailsModal; 