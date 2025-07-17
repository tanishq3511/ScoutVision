import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPool from '../cognito/UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

function SignupBlock({ className, navigate }: { className?: string, navigate: (path: string) => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (!email || !password || !name) {
            alert("Please fill in all fields");
            return;
        }

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            }),
            new CognitoUserAttribute({
                Name: 'given_name',
                Value: name
            })
        ];
        
        UserPool.signUp(email, password, attributeList, [], (err, data) => {
            if (err) {
                console.error('Signup error:', err);
                alert(err.message || "Something went wrong during signup");
            } else {
                console.log('Signup successful:', data);
                navigate('/confirm-signup');
            }
        });
    }

    return (
        <div className={`relative z-10 flex flex-col lg:flex-row w-full max-w-screen-2xl p-4 bg-white rounded-2xl shadow-xl overflow-hidden max-h-[60vh] ${className}`}>
            {/* Left Section - Illustration */}
            <div className="hidden lg:flex items-center justify-center flex-1 p-8 flex-shrink-0">
                {/* Replace with actual illustration component or image */}
                {/* Using a placeholder for now */} 
                <img src="/placeholder-signup-illustration.svg" alt="Signup Illustration" className="max-h-full object-contain" />
            </div>

            {/* Right Section - Signup Form */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Make an account with ScoutVision</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text" 
                                id="name" 
                                placeholder="Enter your name" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                id="email" 
                                placeholder="Enter email" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                id="password" 
                                placeholder="Enter password" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password" 
                                id="confirm-password" 
                                placeholder="Confirm password" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Sign up
                    </button>

                    <div className="text-center text-sm mt-4">
                        <a onClick={() => navigate('/login')} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupBlock;