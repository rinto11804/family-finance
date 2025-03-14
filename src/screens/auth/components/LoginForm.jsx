'use client'

import { useState } from 'react'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
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
            >
                Sign in
            </Button>
        </form>
    )
}

export default LoginForm 