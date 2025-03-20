import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-base-200 to-base-300">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body px-8 py-10">
                    <div className="text-center space-y-3 mb-6">
                        <h2 className="text-3xl font-bold text-base-content">
                            Welcome back
                        </h2>
                    </div>
                    <LoginForm />
                    <div className="mt-6 text-center text-sm">
                        <span className="text-base-content/70">Don't have an account? </span>
                        <Link to="/signup" className="link link-primary font-semibold">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage 