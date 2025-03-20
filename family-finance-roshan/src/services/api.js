import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authAPI = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('users/register', userData),
    logout: () => api.post('/users/logout'),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/user/profile', data)
};

// Transaction endpoints
export const transactionAPI = {
    getAll: (params) => api.get('/transactions', { params }),
    getById: (id) => api.get(`/transactions/${id}`),
    create: (data) => api.post('/transactions', data),
    update: (id, data) => api.put(`/transactions/${id}`, data),
    delete: (id) => api.delete(`/transactions/${id}`),
    getCategories: () => api.get('/transactions/categories'),
    getBulk: (startDate, endDate) => api.get('/transactions/bulk', {
        params: { startDate, endDate }
    })
};

// Analytics endpoints
export const analyticsAPI = {
    getSummary: () => api.get('/analytics/summary'),
    getMonthlyStats: (year) => api.get('/analytics/monthly', { params: { year } }),
    getCategoryBreakdown: (startDate, endDate) => api.get('/analytics/categories', {
        params: { startDate, endDate }
    }),
    getSavingsAnalysis: (params) => api.get('/analytics/savings', { params }),
    getYearlyComparison: () => api.get('/analytics/yearly-comparison'),
    getProjections: () => api.get('/analytics/projections')
};

// Family endpoints
export const familyAPI = {
    getMembers: () => api.get('/family/members'),
    addMember: (data) => api.post('/family/members', data),
    updateMember: (id, data) => api.put(`/family/members/${id}`, data),
    removeMember: (id) => api.delete(`/family/members/${id}`),
    getInvites: () => api.get('/family/invites'),
    sendInvite: (email) => api.post('/family/invites', { email }),
    acceptInvite: (inviteId) => api.post(`/family/invites/${inviteId}/accept`),
    rejectInvite: (inviteId) => api.post(`/family/invites/${inviteId}/reject`)
};

// Budget endpoints
export const budgetAPI = {
    getAll: () => api.get('/budgets'),
    getById: (id) => api.get(`/budgets/${id}`),
    create: (data) => api.post('/budgets', data),
    update: (id, data) => api.put(`/budgets/${id}`, data),
    delete: (id) => api.delete(`/budgets/${id}`),
    getCurrentStatus: () => api.get('/budgets/status'),
    setGoal: (data) => api.post('/budgets/goals', data),
    updateGoal: (id, data) => api.put(`/budgets/goals/${id}`, data)
};

// Settings endpoints
export const settingsAPI = {
    get: () => api.get('/settings'),
    update: (data) => api.put('/settings', data),
    getNotifications: () => api.get('/settings/notifications'),
    updateNotifications: (data) => api.put('/settings/notifications', data),
    getCurrency: () => api.get('/settings/currency'),
    updateCurrency: (data) => api.put('/settings/currency', data)
};

// Export the base api instance for custom calls
export default api; 