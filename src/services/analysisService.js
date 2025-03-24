import api from './api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const analysisService = {
    getMonthlyAnalysis: async () => {
        const response = await api.get('/api/analysis/monthly', {
            headers: getAuthHeader()
        });
        return response.data;
    },

    getCategoryAnalysis: async () => {
        const response = await api.get('/api/analysis/categories', {
            headers: getAuthHeader()
        });
        return response.data;
    },

    getTrendAnalysis: async () => {
        const response = await api.get('/api/analysis/trends', {
            headers: getAuthHeader()
        });
        return response.data;
    }
}; 