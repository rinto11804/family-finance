import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiExclamationCircle } from 'react-icons/hi';
import InfoBox from '../components/InfoBox';
import TabButton from '../components/TabButton';
import CreateFamilyForm from '../components/CreateFamilyForm';
import JoinFamilyForm from '../components/JoinFamilyForm';

const FamilySetupPage = () => {
    const [isCreating, setIsCreating] = useState(true);
    const [familyCode, setFamilyCode] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateFamily = async (e) => {
        e.preventDefault();
        try {
            // TODO: Implement API call to create family
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create family. Please try again.');
        }
    };

    const handleJoinFamily = async (e) => {
        e.preventDefault();
        try {
            if (familyCode.trim()) {
                // TODO: Implement API call to join family
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid family code. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-200 to-base-300 flex items-center justify-center p-6">
            <div className="card w-full max-w-2xl bg-base-100/95 shadow-xl backdrop-blur-sm">
                {/* Tabs */}
                <div className="flex border-b border-base-200">
                    <TabButton
                        isActive={isCreating}
                        onClick={() => setIsCreating(true)}
                        type="create"
                    />
                    <TabButton
                        isActive={!isCreating}
                        onClick={() => setIsCreating(false)}
                        type="join"
                    />
                </div>

                <div className="card-body w-full">
                    {error && (
                        <div className="alert alert-error">
                            <HiExclamationCircle className="h-6 w-6" />
                            <span>{error}</span>
                        </div>
                    )}

                    {isCreating ? (
                        <CreateFamilyForm
                            familyName={familyName}
                            setFamilyName={setFamilyName}
                            onSubmit={handleCreateFamily}
                        />
                    ) : (
                        <JoinFamilyForm
                            familyCode={familyCode}
                            setFamilyCode={setFamilyCode}
                            onSubmit={handleJoinFamily}
                        />
                    )}

                    <div className="divider"></div>

                    <div className="text-center text-base-content/60">
                        {isCreating ? (
                            <>Already have a family code? <button className="btn btn-link btn-sm" onClick={() => setIsCreating(false)}>Join existing family</button></>
                        ) : (
                            <>Need to create a new family? <button className="btn btn-link btn-sm" onClick={() => setIsCreating(true)}>Create family space</button></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilySetupPage; 