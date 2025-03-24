import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HiHome,
    HiChartBar,
    HiCalendarDays,
    HiCurrencyRupee,
    HiUserGroup,
    HiChevronDoubleLeft,
    HiCog6Tooth,
    HiArrowRightOnRectangle,
    HiClipboardDocumentList,
    HiSquares2X2,
    HiChevronDown,
    HiChevronRight
} from 'react-icons/hi2';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState([]);
    const location = useLocation();

    const navigation = [
        {
            title: 'Main',
            items: [
                {
                    name: 'Dashboard',
                    icon: <HiHome className="w-5 h-5" />,
                    path: '/dashboard'
                },
                {
                    name: 'Categories',
                    icon: <HiSquares2X2 className="w-5 h-5" />,
                    path: '/categories'
                }
            ]
        },
        {
            title: 'Finance',
            items: [
                {
                    name: 'Transactions',
                    icon: <HiCurrencyRupee className="w-5 h-5" />,
                    path: '/transactions'
                },
                {
                    name: 'Analytics',
                    icon: <HiChartBar className="w-5 h-5" />,
                    path: '/analysis'
                }
            ]
        },
        {
            title: 'Management',
            items: [
                {
                    name: 'Family Management',
                    icon: <HiUserGroup className="w-5 h-5" />,
                    path: '/family',
                    subItems: [
                        {
                            name: 'Family Members',
                            path: '/family/members'
                        },
                        {
                            name: 'Create Family',
                            path: '/family/create'
                        },
                        {
                            name: 'Join Family',
                            path: '/family/join'
                        }
                    ]
                },
                {
                    name: 'Events',
                    icon: <HiCalendarDays className="w-5 h-5" />,
                    path: '/events'
                },
                {
                    name: 'Recent Activity',
                    icon: <HiClipboardDocumentList className="w-5 h-5" />,
                    path: '/activity'
                }
            ]
        }
    ];

    const isActive = (path) => location.pathname === path;
    const isExpanded = (itemName) => expandedItems.includes(itemName);
    const toggleExpand = (itemName) => {
        setExpandedItems(prev =>
            prev.includes(itemName)
                ? prev.filter(item => item !== itemName)
                : [...prev, itemName]
        );
    };

    const renderNavItem = (item, index) => {
        if (item.subItems) {
            return (
                <div key={index}>
                    <button
                        onClick={() => toggleExpand(item.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(item.path) || item.subItems.some(subItem => isActive(subItem.path))
                                ? 'bg-primary text-primary-content'
                                : 'hover:bg-base-200'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            {!collapsed && <span>{item.name}</span>}
                        </div>
                        {!collapsed && (
                            isExpanded(item.name) ? <HiChevronDown className="w-4 h-4" /> : <HiChevronRight className="w-4 h-4" />
                        )}
                    </button>
                    {!collapsed && isExpanded(item.name) && (
                        <div className="ml-4 mt-1 space-y-1">
                            {item.subItems.map((subItem, subIndex) => (
                                <Link
                                    key={subIndex}
                                    to={subItem.path}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(subItem.path)
                                            ? 'bg-primary/20 text-primary'
                                            : 'hover:bg-base-200'
                                        }`}
                                >
                                    <span>{subItem.name}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(item.path)
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-200'
                    }`}
            >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
            </Link>
        );
    };

    return (
        <div
            className={`bg-base-100 h-screen sticky top-0 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-72'
                } border-r border-base-200`}
        >
            {/* Logo Section */}
            <div className="p-4 border-b border-base-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <HiCurrencyRupee className="w-6 h-6 text-primary" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">FamFin</span>
                            <span className="text-xs text-base-content/60">Family Finance</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Section */}
            <div className="py-4 flex flex-col h-[calc(100vh-4rem-1px)]">
                <nav className="flex-1 space-y-1 px-3">
                    {navigation.map((group, idx) => (
                        <div key={idx} className="mb-6">
                            {!collapsed && (
                                <h3 className="px-4 mb-2 text-sm font-medium text-base-content/60">
                                    {group.title}
                                </h3>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item, index) => renderNavItem(item, index))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-3 border-t border-base-200">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="btn btn-ghost btn-sm w-full justify-start gap-3"
                    >
                        <HiChevronDoubleLeft
                            className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''
                                }`}
                        />
                        {!collapsed && <span>Collapse</span>}
                    </button>

                    <div className="mt-2 space-y-1">
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-base-200"
                        >
                            <HiCog6Tooth className="w-5 h-5" />
                            {!collapsed && <span>Settings</span>}
                        </Link>
                        <button
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-base-200 w-full text-left text-error"
                        >
                            <HiArrowRightOnRectangle className="w-5 h-5" />
                            {!collapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;