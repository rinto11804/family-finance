import api from './api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const transactionService = {
    addTransaction: async (transactionData) => {
        const response = await api.post('/api/transactions/add', transactionData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    getFamilyTransactions: async () => {
        const response = await api.get('/api/transactions/family', {
            headers: getAuthHeader()
        });
        return response.data;
    }
}; 