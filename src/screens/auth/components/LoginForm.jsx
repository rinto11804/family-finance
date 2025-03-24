'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import { authService } from '../../../services/authService.js'

function LoginForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Remove any existing token before login
            localStorage.removeItem('token')
            await authService.login(formData)
            navigate('/dashboard') // Redirect to dashboard after successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.')
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
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                />

                <div className="flex items-center justify-between">
                    <label className="label cursor-pointer gap-2">
                        <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                        <span className="label-text">Remember me</span>
                    </label>

                    <a href="#" className="link link-primary text-sm">
                        Forgot password?
                    </a>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                disabled={loading}
            >
                {loading ? 'Signing in...' : 'Sign in'}
            </Button>
        </form>
    )
}

export default LoginForm 