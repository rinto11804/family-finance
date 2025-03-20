import { useState } from 'react';
import {
    HiCalendar,
    HiPlus,
    HiCurrencyRupee,
    HiBellAlert
} from 'react-icons/hi2';

const CalendarEvents = () => {
    const [currentDate] = useState(new Date());
    const [events] = useState([
        {
            date: '2024-03-15',
            title: 'Rent Payment Due',
            amount: '₹12,000',
            type: 'expense',
            category: 'Housing'
        },
        {
            date: '2024-03-25',
            title: 'Salary Credit',
            amount: '₹50,000',
            type: 'income',
            category: 'Salary'
        },
        {
            date: '2024-03-20',
            title: 'Electricity Bill',
            amount: '₹2,500',
            type: 'expense',
            category: 'Utilities'
        }
    ]);

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getEventsForDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(event => event.date === dateStr);
    };

    const renderCalendarDays = () => {
        const days = [];
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Render week days
        weekDays.forEach(day => {
            days.push(
                <div key={`weekday-${day}`} className="font-medium text-sm text-base-content/70 text-center py-2">
                    {day}
                </div>
            );
        });

        // Empty cells for days before the first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Render month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = getEventsForDate(day);
            const isToday = day === currentDate.getDate();
            const hasEvents = dayEvents.length > 0;

            days.push(
                <div
                    key={`day-${day}`}
                    className={`p-2 min-h-[100px] border border-base-200 relative ${isToday ? 'bg-primary/5' : ''
                        }`}
                >
                    <span className={`text-sm ${isToday ? 'font-bold text-primary' : 'text-base-content'
                        }`}>
                        {day}
                    </span>

                    {hasEvents && (
                        <div className="mt-1 space-y-1">
                            {dayEvents.map((event, idx) => (
                                <div
                                    key={idx}
                                    className={`text-xs p-1 rounded ${event.type === 'expense'
                                            ? 'bg-error/10 text-error'
                                            : 'bg-success/10 text-success'
                                        }`}
                                >
                                    <div className="font-medium truncate">{event.title}</div>
                                    <div className="flex items-center gap-1">
                                        <HiCurrencyRupee className="h-3 w-3" />
                                        {event.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <HiCalendar className="h-5 w-5 text-primary" />
                        <h3 className="card-title">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h3>
                    </div>
                    <button className="btn btn-primary btn-sm gap-2">
                        <HiPlus className="h-4 w-4" />
                        Add Event
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-px">
                    {renderCalendarDays()}
                </div>

                <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <HiBellAlert className="h-4 w-4 text-warning" />
                        Upcoming Events
                    </h4>
                    <div className="space-y-2">
                        {events
                            .filter(event => new Date(event.date) >= currentDate)
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .slice(0, 3)
                            .map((event, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-2 rounded-lg bg-base-200/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${event.type === 'expense'
                                                ? 'bg-error/10 text-error'
                                                : 'bg-success/10 text-success'
                                            }`}>
                                            <HiCurrencyRupee className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{event.title}</p>
                                            <p className="text-xs text-base-content/60">{event.date}</p>
                                        </div>
                                    </div>
                                    <p className={`font-medium ${event.type === 'expense' ? 'text-error' : 'text-success'
                                        }`}>
                                        {event.amount}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarEvents; 