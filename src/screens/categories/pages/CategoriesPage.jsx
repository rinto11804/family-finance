import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { categoryService } from '../../../services/categoryService';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
            setError(err.response?.data?.message || 'Failed to fetch categories. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (categoryId) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await categoryService.deleteCategory(categoryId);
            setCategories(categories.filter(cat => cat.id !== categoryId));
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError(err.response?.data?.message || 'Failed to delete category. Please try again.');
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
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <button
                        className="btn btn-primary gap-2"
                        onClick={() => navigate('/categories/create')}
                    >
                        <HiPlus className="h-5 w-5" />
                        Add Category
                    </button>
                </div>

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div key={category.id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="card-title">{category.name}</h2>
                                        <p className="text-base-content/70">{category.description}</p>
                                        <p className="text-sm text-base-content/50 mt-2">
                                            Created: {new Date(category.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => navigate(`/categories/edit/${category.id}`)}
                                        >
                                            <HiPencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-sm text-error"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            <HiTrash className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && !loading && (
                    <div className="text-center py-8">
                        <p className="text-base-content/70">No categories found. Create one to get started!</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default CategoriesPage; 