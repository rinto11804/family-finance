import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import CategoryList from '../components/CategoryList';
import CategoryFormModal from '../components/CategoryFormModal';
import CategoryDetailsModal from '../components/CategoryDetailsModal';
import { HiPlus } from 'react-icons/hi2';

const CategoryPage = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Groceries', type: 'Expense', amount: 15000, limit: 20000, transactions: 5 },
        { id: 2, name: 'Utilities', type: 'Expense', amount: 3000, limit: 5000, transactions: 3 },
        { id: 3, name: 'Salary', type: 'Income', amount: 50000, limit: 50000, transactions: 1 },
        { id: 4, name: 'Entertainment', type: 'Expense', amount: 2000, limit: 5000, transactions: 2 },
        { id: 5, name: 'Transportation', type: 'Expense', amount: 1000, limit: 3000, transactions: 1 },
        { id: 6, name: 'Savings', type: 'Income', amount: 20000, limit: 20000, transactions: 1 },
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleAddCategory = (newCategory) => {
        setCategories(prev => [...prev, { id: Date.now(), ...newCategory }]);
        setShowForm(false);
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleCloseDetails = () => {
        setSelectedCategory(null);
    };

    const handleUpdateCategory = (updatedCategory) => {
        setCategories(prev => prev.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat)));
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Manage Categories</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary gap-2"
                    >
                        <HiPlus className="h-4 w-4" />
                        New Category
                    </button>
                </div>

                <CategoryFormModal
                    isOpen={showForm}
                    onClose={() => setShowForm(false)}
                    onAddCategory={handleAddCategory}
                />

                <CategoryList
                    categories={categories}
                    onSelectCategory={handleSelectCategory}
                />

                <CategoryDetailsModal
                    category={selectedCategory}
                    onClose={handleCloseDetails}
                    onUpdate={handleUpdateCategory}
                />
            </div>
        </DashboardLayout>
    );
};

export default CategoryPage; 