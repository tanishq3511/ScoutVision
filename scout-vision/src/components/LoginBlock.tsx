import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../cognito/UserPool';

function LoginBlock({ className, navigate }: { className?: string, navigate: (path: string) => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (session) => {
                console.log('Login success:', session);
                localStorage.setItem('accessToken', session.getAccessToken().getJwtToken());
                navigate('/upload'); // Update this as needed
            },
            onFailure: (err) => {
                console.error('Login failed:', err);
                alert(err.message || 'Login failed');
            },
        });
    };

    return (
        <div className={`relative z-10 flex flex-col lg:flex-row w-full max-w-screen-2xl p-4 bg-white rounded-2xl shadow-xl overflow-hidden max-h-[60vh] ${className}`}>
            <div className="hidden lg:flex items-center justify-center flex-1 p-8 flex-shrink-0">
                <img src="/placeholder-login-illustration.svg" alt="Login Illustration" className="max-h-full object-contain" />
            </div>

            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 mx-auto max-h-full overflow-y-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Welcome back to ScoutVision!</h2>

                    <div className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Log in
                    </button>

                    <div className="text-center text-sm mt-2">
                        <a onClick={() => navigate('/forgot-password')} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Forgot password?</a>
                    </div>

                    <div className="text-center text-sm">
                        <a onClick={() => navigate('/signup')} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Don't have an account?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginBlock;
