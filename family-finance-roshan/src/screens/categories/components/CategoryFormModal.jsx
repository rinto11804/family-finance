import { useState } from 'react';
import { HiXMark, HiCurrencyRupee, HiTag, HiPencil } from 'react-icons/hi2';
import InputField from './InputField'; // Import the reusable InputField component
import { MdOutlineColorLens } from "react-icons/md";
import { IoMdCopy } from "react-icons/io";

const CategoryFormModal = ({ isOpen, onClose, onAddCategory }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Expense',
        amount: '',
        transactions: 0,
        description: '',
        color: '#ffffff', // Default color
        icon: 'HiTag' // Default icon
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCategory({ ...formData, amount: parseFloat(formData.amount) });
        setFormData({ name: '', type: 'Expense', amount: '', transactions: 0, description: '', color: '#ffffff', icon: 'HiTag' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">New Category</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
                        <HiXMark className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Category Name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter category name"
                        icon={HiTag}
                        required
                    />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Category Type</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 flex items-center">
                                <HiTag className="h-5 w-5" />
                            </span>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                className="join-item select select-bordered w-full"
                                required
                            >
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                            </select>
                        </div>
                    </div>


                    <InputField
                        label="Amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0.00"
                        icon={HiCurrencyRupee}
                        required
                    />

                    <InputField
                        label="Description"
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                        icon={HiPencil}
                    />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Color</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 flex items-center">
                                <MdOutlineColorLens className="h-5 w-5" />
                            </span>
                            <div className="join-item flex items-center gap-3 select select-bordered w-full bg-base-100 px-3 py-2">
                                <input
                                    type="color"
                                    value={formData.color}
                                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                    className="w-8 h-8 border-0 rounded cursor-pointer"
                                    title="Select a color for this category"
                                />
                                <div className="flex items-center gap-2">
                                    {/* <span className="h-6 w-6 rounded-full border border-base-300" style={{ backgroundColor: formData.color }}></span> */}
                                    <input
                                        type="text"
                                        value={formData.color}
                                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                        className="input input-sm input-bordered w-24 text-xs"
                                        placeholder="#RRGGBB"
                                    />
                                    <IoMdCopy
                                        className="h-4 w-4 cursor-pointer text-base-content/70 hover:text-base-content"
                                        onClick={() => navigator.clipboard.writeText(formData.color)}
                                        title="Copy color code"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryFormModal; 