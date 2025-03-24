import { useState } from 'react';
import { HiKey, HiMail } from 'react-icons/hi';

const JoinFamilyForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        email: '',
        familyCode: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            email: formData.email,
            familyCode: formData.familyCode.trim().toUpperCase()
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="card bg-base-100 shadow-lg w-full max-w-xl mx-auto h-fit max-h-[95vh] overflow-y-auto">
            <div className="card-body p-6 sm:p-8 md:px-12 md:py-10">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-6 md:mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl"></div>
                        <div className="relative bg-primary/10 text-primary rounded-2xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                            <HiKey className="w-10 h-10 md:w-12 md:h-12" />
                        </div>
                    </div>
                    <div className="space-y-1 md:space-y-2 max-w-sm">
                        <h2 className="text-xl md:text-2xl font-bold text-base-content">Join Your Family</h2>
                        <p className="text-base-content/60 text-xs md:text-sm">
                            Enter the family code to connect with your family members
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="form-control w-full">
                        <label className="label px-1 pb-1">
                            <span className="label-text text-sm md:text-base font-medium">Your Email</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 md:px-5 flex items-center">
                                <HiMail className="h-4 w-4 md:h-5 md:w-5 text-base-content/70" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="join-item input input-bordered w-full h-11 md:h-14"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label px-1 pb-1">
                            <span className="label-text text-sm md:text-base font-medium">Family Code</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 md:px-5 flex items-center">
                                <HiKey className="h-4 w-4 md:h-5 md:w-5 text-base-content/70" />
                            </span>
                            <input
                                type="text"
                                name="familyCode"
                                value={formData.familyCode}
                                onChange={handleChange}
                                placeholder="Enter 6-digit family code"
                                className="join-item input input-bordered w-full h-11 md:h-14 font-mono uppercase"
                                maxLength="6"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="divider my-4 md:my-6"></div>

                    <button 
                        type="submit" 
                        className={`btn btn-primary w-full h-11 md:h-14 gap-2 text-sm md:text-base normal-case ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        <HiKey className="h-4 w-4 md:h-5 md:w-5" />
                        Join Family
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinFamilyForm; 