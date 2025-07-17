import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="h-[90vh] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent"></div>

        <div className="h-full container mx-auto px-4 max-w-7xl flex items-center relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Section - Text Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent animate-gradient">
                AI-Powered Soccer Match Analyzer
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                Transform your game analysis with cutting-edge AI technology. Get instant insights and detailed match statistics.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
              >
                Get Started
              </button>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1 w-full">
              <img 
                src="/sv-homepage-placeholder.jpg" 
                alt="ScoutVision AI Analysis Preview" 
                className="w-full h-auto max-h-[50vh] object-contain rounded-2xl shadow-2xl shadow-blue-500/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                About ScoutVision
              </h2>
              <p className="text-gray-300 mb-4">
                ScoutVision is a specialized web-based platform designed for individual soccer players to analyze and improve their performance. Using cutting-edge AI technology, we provide detailed insights into your gameplay, helping you understand your strengths and areas for improvement.
              </p>
              <p className="text-gray-300">
                Whether you're a youth player, amateur athlete, or coach looking to develop individual players, ScoutVision offers the tools you need to take your game to the next level.
              </p>
            </div>
            <div className="flex-1">
              <img 
                src="/about-illustration.svg" 
                alt="About ScoutVision" 
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Individual Player Tracking</h3>
              <p className="text-gray-300">Track your movements and actions in uploaded match videos with precise AI analysis.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Performance Statistics</h3>
              <p className="text-gray-300">Get detailed stats on touches, passes, distance covered, and more.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Performance Heatmaps</h3>
              <p className="text-gray-300">Visualize your movement patterns and positional awareness on a virtual field.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 