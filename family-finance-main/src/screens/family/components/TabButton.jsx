import { HiUserGroup, HiUserAdd } from 'react-icons/hi';

const TabButton = ({ isActive, onClick, type }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-6 px-8 transition-all relative hover:bg-base-200/50
      ${isActive ? 'text-primary' : 'text-base-content/60'}`}
    >
        <div className="flex items-center justify-center gap-3 text-lg font-medium">
            {type === 'create' ? (
                <>
                    <HiUserGroup className="text-xl" />
                    Create Family
                </>
            ) : (
                <>
                    <HiUserAdd className="text-xl" />
                    Join Family
                </>
            )}
        </div>
        {isActive && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg" />
        )}
    </button>
);

export default TabButton; 