import { HiKey, HiLockClosed, HiUser } from 'react-icons/hi';

const JoinFamilyForm = ({ familyCode, setFamilyCode, onSubmit }) => {
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
                <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                    <div className="form-control w-full">
                        <label className="label px-1 pb-1">
                            <span className="label-text text-sm md:text-base font-medium">Your Name</span>
                        </label>
                        <div className="join w-full">
                            <span className="join-item bg-base-200 px-3 md:px-5 flex items-center">
                                <HiUser className="h-4 w-4 md:h-5 md:w-5 text-base-content/70" />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="join-item input input-bordered w-full h-11 md:h-14"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label px-1 pb-1">
                            <span className="label-text text-sm md:text-base font-medium">Family Code</span>
                        </label>
                        <div className="grid grid-cols-6 gap-2 md:gap-4">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="input input-bordered w-full h-12 md:h-16 text-center text-xl md:text-2xl font-mono uppercase bg-base-100"
                                    placeholder="●"
                                    required
                                />
                            ))}
                        </div>

                    </div>

                    <div className="divider my-4 md:my-6"></div>

                    <button type="submit" className="btn btn-primary w-full h-11 md:h-14 gap-2 text-sm md:text-base normal-case">
                        <HiKey className="h-4 w-4 md:h-5 md:w-5" />
                        Join Family
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinFamilyForm; 