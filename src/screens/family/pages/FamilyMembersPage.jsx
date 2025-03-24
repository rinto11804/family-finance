import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const FamilyMembersPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // TODO: Fetch family members from API
        const fetchMembers = async () => {
            try {
                // Simulated data
                setMembers([
                    { id: 1, name: 'John Doe', role: 'Family Head', income: 10000 },
                    { id: 2, name: 'Jane Doe', role: 'Member', income: 10000 },
                    { id: 3, name: 'Jimmy Doe', role: 'Member', income: 15000 }
                ]);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch family members');
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Family Members</h1>
                    <button className="btn btn-primary">Add Member</button>
                </div>

                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid gap-6">
                    {members.map((member) => (
                        <div key={member.id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="card-title">{member.name}</h2>
                                        <p className="text-base-content/70">{member.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">₹{member.income.toLocaleString()}</p>
                                        <p className="text-sm text-base-content/70">Monthly Income</p>
                                    </div>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-ghost btn-sm">Edit</button>
                                    <button className="btn btn-ghost btn-sm text-error">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FamilyMembersPage; 