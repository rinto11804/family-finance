import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import JoinFamilyForm from '../components/JoinFamilyForm';
import { familyService } from '../../../services/familyService';

const JoinFamilyPage = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [familyData, setFamilyData] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setError('');
        setLoading(true);

        try {
            // Check if user is authenticated
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await familyService.joinFamily(formData);

            // Store the family data
            setFamilyData(response);
            localStorage.setItem('familyId', response.id);
        } catch (err) {
            // Handle authentication errors
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            setError(err.response?.data?.message || 'Invalid family code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Join Existing Family</h1>

                    {error && (
                        <div className="alert alert-error mb-6">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            {familyData ? (
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold mb-4">Successfully Joined Family!</h2>
                                    <div className="bg-base-200 p-4 rounded-lg mb-6">
                                        <p className="text-sm text-base-content/70 mb-2">Family Name:</p>
                                        <p className="text-xl font-bold">{familyData.familyName}</p>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate('/family/members')}
                                    >
                                        Continue to Family Dashboard
                                    </button>
                                </div>
                            ) : (
                                <JoinFamilyForm
                                    onSubmit={handleSubmit}
                                    loading={loading}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default JoinFamilyPage; 