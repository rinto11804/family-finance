import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen bg-base-200">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;