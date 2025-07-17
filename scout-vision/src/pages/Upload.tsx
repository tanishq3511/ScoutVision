import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBlock from '../components/UploadBlock';
import UserPool from '../cognito/UserPool';
import {
  CognitoUserSession,
  CognitoUser
} from 'amazon-cognito-identity-js';

function Upload() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const user: CognitoUser | null = UserPool.getCurrentUser();

    if (!user) {
      setAuthorized(false); // triggers redirect
      return;
    }

    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session || !session.isValid()) {
        setAuthorized(false); // triggers redirect
      } else {
        setAuthorized(true);
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (authorized === false) {
      navigate('/login');
    }
  }, [authorized, navigate]);

  if (authorized === null) {
    return null; // or <LoadingSpinner />
  }

  return (
    <div className="h-screen bg-gray-900 overflow-hidden relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent"></div>
      <div className="-mt-16">
        <UploadBlock />
      </div>
    </div>
  );
}

export default Upload;
