'use client'

import { useState } from 'react'
import { HiMail, HiUser, HiLockClosed, HiCurrencyDollar } from 'react-icons/hi'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'

function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        currency: 'USD',
        income: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log(formData)
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
            <div className="space-y-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Username</span>
                    </label>
                    <div className="join w-full">
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiUser className="h-5 w-5 text-base-content/70" />
                        </span>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="johndoe"
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
                        <span className="join-item bg-base-200 px-3 flex items-center">
                            <HiCurrencyDollar className="h-5 w-5 text-base-content/70" />
                        </span>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="join-item select select-bordered w-1/4 rounded-none"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                        </select>
                        <input
                            type="number"
                            name="income"
                            value={formData.income}
                            onChange={handleChange}
                            placeholder="Enter your monthly income"
                            className="join-item input input-bordered w-3/4"
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
            >
                Create Account
            </Button>
        </form>
    )
}

export default SignUpForm 