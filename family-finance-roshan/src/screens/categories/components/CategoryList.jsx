import { HiCurrencyRupee, HiArrowUp, HiArrowDown, HiPencil } from 'react-icons/hi2';

const CategoryList = ({ categories, onSelectCategory }) => {
    const groupedCategories = categories.reduce((acc, category) => {
        if (!acc[category.type]) {
            acc[category.type] = [];
        }
        acc[category.type].push(category);
        return acc;
    }, {});

    return (
        <div className="overflow-x-auto w-full">
            {Object.entries(groupedCategories).map(([type, items]) => (
                <div key={type} className="card bg-base-100 shadow-sm mb-6 w-full">
                    <div className="card-body">
                        <h3 className="card-title flex items-center">
                            {type === 'Income' ? <HiArrowUp className="text-success mr-2" /> : <HiArrowDown className="text-error mr-2" />}
                            {type} Categories
                        </h3>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Category</th>
                                    <th className="text-left">Limit</th>
                                    <th className="text-left">Amount Used</th>
                                    <th className="text-left">Progress</th>
                                    <th className="text-left">Transactions</th>
                                    <th className="text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(category => {
                                    const progress = (category.amount / category.limit) * 100; // Calculate progress percentage
                                    return (
                                        <tr
                                            key={category.id}
                                            className="hover:bg-base-200 cursor-pointer"
                                            onClick={() => onSelectCategory(category)}
                                        >
                                            <td className="flex items-center gap-2">
                                                <HiCurrencyRupee className="h-5 w-5 text-primary" />
                                                <span className="font-medium">{category.name}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${category.type === 'Expense' ? 'badge-error' : 'badge-success'}`}>
                                                    ₹{category.limit}
                                                </span>
                                            </td>
                                            <td>₹{category.amount}</td>
                                            <td>
                                                <div className="relative w-full h-2 bg-base-200 rounded">
                                                    <div
                                                        className="absolute h-full bg-primary rounded"
                                                        style={{ width: `${progress > 100 ? 100 : progress}%` }} // Cap at 100%
                                                    ></div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-outline">{category.transactions}</span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSelectCategory(category);
                                                    }}
                                                >
                                                    <HiPencil className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList; 