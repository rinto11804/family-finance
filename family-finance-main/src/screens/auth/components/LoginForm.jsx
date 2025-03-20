'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import { authAPI } from '../../../services/api'

function LoginForm() {
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.login({
                email: formData.email,
                password: formData.password
            });
            
            // Store the token
            if (response.token) {
                localStorage.setItem('token', response.token);
                // Navigate to dashboard page after successful login
                navigate('/dashboard');
            } else {
                setError('Invalid login response from server');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
            console.error('Login failed:', error);
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
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="label cursor-pointer gap-2">
                        <input 
                            type="checkbox" 
                            className="checkbox checkbox-sm checkbox-primary"
                            disabled={isLoading}
                        />
                        <span className="label-text">Remember me</span>
                    </label>

                    <a href="#" className="link link-primary text-sm">
                        Forgot password?
                    </a>
                </div>
            </div>

            <Button
                type="submit"
                className={`w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
        </form>
    )
}

export default LoginForm 