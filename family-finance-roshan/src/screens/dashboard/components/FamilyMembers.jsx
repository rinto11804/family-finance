import { HiUserCircle, HiCurrencyRupee } from 'react-icons/hi';

const FamilyMembers = () => {
    const members = [
        { name: "John Smith", role: "Family Head", income: "₹50,000" },
        { name: "Sarah Smith", role: "Member", income: "₹32,500" },
        { name: "Mike Smith", role: "Member", income: "₹28,000" }
    ];

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="card-title">Family Members</h3>
                    <button className="btn btn-ghost btn-sm">View All</button>
                </div>

                <div className="space-y-4">
                    {members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-base-200/50">
                            <div className="flex items-center gap-3">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                        <HiUserCircle className="w-12 h-12" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-base-content/60">{member.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-base-content/70">
                                <HiCurrencyRupee className="h-4 w-4" />
                                <span>{member.income}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FamilyMembers; 