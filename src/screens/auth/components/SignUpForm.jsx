'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMail, HiUser, HiLockClosed, HiCurrencyDollar } from 'react-icons/hi'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import { authService } from '../../../services/authService.js'

function SignUpForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        income: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            // Remove any existing token before registration
            localStorage.removeItem('token')

            // Prepare data for registration
            const registerData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                income: parseFloat(formData.income)
            }

            await authService.register(registerData)
            navigate('/login') // Redirect to login after successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            )}
            <div className="space-y-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Name</span>
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
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Monthly Income</span>
                    </label>
                    <div className="join w-full">
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
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
        </form>
    )
}

export default SignUpForm 