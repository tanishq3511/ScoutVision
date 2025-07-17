import React from 'react';

function ForgotPasswordBlock({ className, navigate }: { className?: string, navigate: (path: string) => void }) {
    return (
        <div className={`relative z-10 flex flex-col lg:flex-row w-full max-w-screen-2xl p-4 bg-white rounded-2xl shadow-xl overflow-hidden max-h-[60vh] ${className}`}>
            {/* Left Section - Illustration */}
            <div className="hidden lg:flex items-center justify-center flex-1 p-8 flex-shrink-0">
                {/* Replace with actual illustration component or image */}
                {/* Using a placeholder for now */} 
                <img src="/placeholder-forgot-password-illustration.svg" alt="Forgot Password Illustration" className="max-h-full object-contain" />
            </div>

            {/* Right Section - Forgot Password Form */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto">
                {/* Wrapper for form content with max height and internal scroll */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Reset your password</h2>

                    <div className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter email" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Reset Password
                    </button>

                    <div className="text-center text-sm mt-4">
                        <a onClick={() => navigate('/login')} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordBlock; 