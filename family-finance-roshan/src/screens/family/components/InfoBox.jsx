import { HiShieldCheck, HiUserGroup } from 'react-icons/hi';
import { BsCashStack, BsPieChart, BsPeople } from 'react-icons/bs';

const InfoBox = ({ type }) => {
    const content = {
        create: {
            title: "Create as Family Head",
            icon: <HiShieldCheck className="h-8 w-8" />,
            features: [
                {
                    icon: <BsCashStack className="h-5 w-5" />,
                    text: "Manage family budget and expenses"
                },
                {
                    icon: <BsPeople className="h-5 w-5" />,
                    text: "Add and remove family members"
                },
                {
                    icon: <BsPieChart className="h-5 w-5" />,
                    text: "Monitor all financial activities"
                }
            ]
        },
        join: {
            title: "Join as Family Member",
            icon: <HiUserGroup className="h-8 w-8" />,
            features: [
                {
                    icon: <BsCashStack className="h-5 w-5" />,
                    text: "View family budget and expenses"
                },
                {
                    icon: <BsPeople className="h-5 w-5" />,
                    text: "Contribute to family savings"
                },
                {
                    icon: <BsPieChart className="h-5 w-5" />,
                    text: "Track shared expenses"
                }
            ]
        }
    }[type];

    return (
        <div className="card bg-base-200/40 backdrop-blur-sm">
            <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {content.icon}
                    </div>
                    <h3 className="card-title text-xl">{content.title}</h3>
                </div>
                <div className="space-y-4">
                    {content.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-base-content/70">
                            <div className="text-primary/70">{feature.icon}</div>
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfoBox;