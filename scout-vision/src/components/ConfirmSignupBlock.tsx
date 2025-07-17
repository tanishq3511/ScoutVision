import React, { useState } from 'react';
import UserPool from '../cognito/UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';

function ConfirmSignupBlock({ className, navigate }: { className?: string, navigate: (path: string) => void }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !code) {
            alert("Please fill in all fields");
            return;
        }

        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                console.error('Confirmation error:', err);
                alert(err.message || "Something went wrong during confirmation");
            } else {
                console.log('Confirmation successful:', result);
                alert("Account confirmed successfully!");
                navigate('/login');
            }
        });
    }

    return (
        <div className={`relative z-10 flex flex-col lg:flex-row w-full max-w-screen-2xl p-4 bg-white rounded-2xl shadow-xl overflow-hidden max-h-[60vh] ${className}`}>
            {/* Left Section - Illustration */}
            <div className="hidden lg:flex items-center justify-center flex-1 p-8 flex-shrink-0">
                <img src="/placeholder-confirm-signup-illustration.svg" alt="Confirm Signup Illustration" className="max-h-full object-contain" />
            </div>

            {/* Right Section - Confirm Signup Form */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto">
                <form onSubmit={onSubmit} className="w-full max-w-md space-y-6 mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Confirm your account</h2>
                    
                    <div className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Confirmation Code</label>
                            <input 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                type="text" 
                                id="code" 
                                placeholder="Enter confirmation code" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Confirm Account
                    </button>

                    <div className="text-center text-sm mt-4">
                        <a onClick={() => navigate('/login')} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Back to Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ConfirmSignupBlock; 