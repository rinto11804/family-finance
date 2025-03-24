import api from './api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeader = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const familyService = {
    createFamily: async (familyData) => {
        const response = await api.post('/families/create', familyData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    },

    joinFamily: async (joinData) => {
        const response = await api.post('/families/join', joinData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    },

    getFamilyMembers: async () => {
        const response = await api.get('/families/members', {
            headers: getAuthHeader(),
            withCredentials: true
        });
        return response.data;
    }
}; 