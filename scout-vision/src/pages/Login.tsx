import { useNavigate } from 'react-router-dom'
import LoginBlock from '../components/LoginBlock';

function Login() {
    const navigate = useNavigate()

    return(
        <div className="h-screen bg-gray-900 overflow-hidden relative flex flex-col items-center justify-center">
            {/* Background gradient - similar to Home.tsx */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent"></div>

            {/* Main content container with two sections */}
            <div className="-mt-16">
                <LoginBlock navigate={navigate} />
            </div>
        </div>
    )
}

export default Login