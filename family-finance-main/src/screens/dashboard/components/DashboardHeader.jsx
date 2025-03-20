import {
    HiHome,
    HiBell,
    HiUserCircle
} from 'react-icons/hi2';

const DashboardHeader = ({ familyName }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <HiHome className="text-primary" />
                    {familyName || 'Smith Family'}
                </h1>
                <p className="text-base-content/60 text-sm">Manage your family finances</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <HiBell className="h-5 w-5" />
                        <span className="indicator-item badge badge-primary badge-xs"></span>
                    </div>
                </button>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <HiUserCircle className="h-8 w-8" />
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader; 