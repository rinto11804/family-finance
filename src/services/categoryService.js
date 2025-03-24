import api from './api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const categoryService = {
    createCategory: async (categoryData) => {
        const response = await api.post('/api/categories/create', categoryData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/api/categories', {
            headers: getAuthHeader()
        });
        return response.data;
    },

    updateCategory: async (categoryId, categoryData) => {
        const response = await api.put(`/api/categories/${categoryId}`, categoryData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    deleteCategory: async (categoryId) => {
        const response = await api.delete(`/api/categories/${categoryId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    }
}; 