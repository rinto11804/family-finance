'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMail, HiUser, HiLockClosed, HiCurrencyDollar } from 'react-icons/hi'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import { authAPI } from '../../../services/api'

function SignUpForm() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        income: ''
    })

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            // Transform data to match UserRequestDTO
            const registrationData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                income: Number(formData.income) // Convert to number for Long type
            };
            
            const response = await authAPI.register(registrationData);
            
            // Show success message
            alert('Registration successful! Please login to continue.');
            
            // Navigate to login page on success
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (error) setError('');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <div className="space-y-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Full Name</span>
                    </label>
                    <div className="join w-full">
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiUser className="h-5 w-5 text-base-content/70" />
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="join-item input input-bordered w-full"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="join w-full">
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiMail className="h-5 w-5 text-base-content/70" />
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="join-item input input-bordered w-full"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="join w-full">
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiLockClosed className="h-5 w-5 text-base-content/70" />
                        </span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="join-item input input-bordered w-full"
                            required
                            disabled={isLoading}
                            minLength={6}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Confirm Password</span>
                    </label>
                    <div className="join w-full">
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiLockClosed className="h-5 w-5 text-base-content/70" />
                        </span>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="join-item input input-bordered w-full"
                            required
                            disabled={isLoading}
                            minLength={6}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Monthly Income</span>
                    </label>
                    <div className="join w-full">
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiCurrencyDollar className="h-5 w-5 text-base-content/70" />
                        </span>
                        <input
                            type="number"
                            name="income"
                            value={formData.income}
                            onChange={handleChange}
                            placeholder="Enter your monthly income"
                            className="join-item input input-bordered w-full"
                            required
                            min="0"
                            step="100"
                            disabled={isLoading}
                        />
                    </div>
                    <label className="label">
                        <span className="label-text-alt text-base-content/60">
                            This helps us provide better financial insights
                        </span>
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                className={`w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
        </form>
    )
}

export default SignUpForm 