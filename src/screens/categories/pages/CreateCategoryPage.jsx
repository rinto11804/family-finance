import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { categoryService } from '../../../services/categoryService';
import { HiTag } from 'react-icons/hi';

const CreateCategoryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await categoryService.createCategory(formData);
            navigate('/categories');
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError(err.response?.data?.message || 'Failed to create category. Please try again.');
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
                    <h1 className="text-2xl font-bold mb-6">Create New Category</h1>

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
                                        <span className="label-text">Category Name</span>
                                    </label>
                                    <div className="join w-full">
                                        <span className="join-item bg-base-200 px-3 flex items-center">
                                            <HiTag className="h-5 w-5 text-base-content/70" />
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter category name"
                                            className="join-item input input-bordered w-full"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter category description"
                                        className="textarea textarea-bordered h-24"
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
                                        Create Category
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => navigate('/categories')}
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

export default CreateCategoryPage; 