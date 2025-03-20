const StatsCard = ({ title, value, icon, trend, trendValue }) => {
    const isPositive = trend === 'up';

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-base-content/60 text-sm">{title}</p>
                        <h3 className="text-2xl font-bold mt-1">{value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                        {icon}
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <span className={isPositive ? 'text-success' : 'text-error'}>
                        {isPositive ? '↑' : '↓'} {trendValue}%
                    </span>
                    <span className="text-base-content/60 text-sm">vs last month</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard; 