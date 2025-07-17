import React, { useState, useRef, useEffect } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import UserPool from '../cognito/UserPool';

const s3API = import.meta.env.VITE_PRESIGN_URL_API
const dynamoAPI = import.meta.env.VITE_DYNAMO_METADATA_API

function UploadBlock() {
    const [date, setDate] = useState('');
    //const [teamName, setTeamName] = useState('');
    const [jerseycolor, setJerseycolor] = useState('');
    const [jerseyNumbers, setJerseyNumbers] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'video/mp4') {
                setVideoFile(file);
            } else {
                alert('Please select an MP4 video file.');
            }
        }
    };

    const handleDropAreaClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = async () => {
        if (!videoFile) {
            alert('Please select a video file.');
            return;
        }

        const user = UserPool.getCurrentUser();
        if (!user) {
            alert('User not authenticated.');
            return;
        }

        user.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
            if (err || !session) {
                alert('Failed to retrieve session');
                return;
            }

            const email = session.getIdToken().payload.email;
            const filename = `${Date.now()}_${videoFile.name}`;
            const userId = email;

            setUploading(true);

            try {
                // Step 1: Get pre-signed upload URL
                const presignRes = await fetch(s3API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename, userId })
                });

                const presignJson = await presignRes.json();
                const { uploadUrl, objectKey } = presignJson;

                if (!uploadUrl || !objectKey) {
                    throw new Error('Missing upload URL or objectKey');
                }

                // Step 2: Upload to S3
                const uploadRes = await fetch(uploadUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'video/mp4' },
                    body: videoFile
                });

                if (!uploadRes.ok) {
                    throw new Error(`S3 upload failed: ${await uploadRes.text()}`);
                }

                // Step 3: Send metadata to DynamoDB via another Lambda
                const metadataRes = await fetch(dynamoAPI, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        timestamp: Date.now(),
                        userId,
                        objectKey,
                        date,
                        jerseyColor: jerseycolor,
                        jerseyNumber: jerseyNumbers,
                        position: playerPosition
                    })
                });

                const metadataJson = await metadataRes.json();
                if (!metadataRes.ok) {
                    throw new Error(`Metadata save failed: ${metadataJson.message}`);
                }

                alert('Upload and metadata save successful!');
            } catch (err: any) {
                console.error('Error during upload:', err);
                alert(err.message || 'Upload failed. Check console for details.');
            } finally {
                setUploading(false);
            }
        });
    };

    return (
        <div className="relative z-10 flex flex-col w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload a New Match</h2>

            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6 cursor-pointer hover:border-blue-400 transition-colors"
                onClick={handleDropAreaClick}
            >
                <input
                    type="file"
                    accept="video/mp4"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <p className="text-gray-600 text-lg">Drag and drop a video file here, or click to browse</p>
                {videoFile && (
                    <p className="mt-4 text-blue-600 text-sm">Selected: {videoFile.name}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="text"
                        id="date"
                        placeholder="MM/YYYY"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="jerseycolor" className="block text-sm font-medium text-gray-700">Jersey Color</label>
                    <input
                        type="text"
                        id="jerseycolor"
                        placeholder="Ex. Blue"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600"
                        value={jerseycolor}
                        onChange={(e) => setJerseycolor(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <label htmlFor="jerseyNumbers" className="block text-sm font-medium text-gray-700">Jersey Number</label>
                    <input
                        type="text"
                        id="jerseyNumbers"
                        placeholder="Ex. 10"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600"
                        value={jerseyNumbers}
                        onChange={(e) => setJerseyNumbers(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="playerPosition" className="block text-sm font-medium text-gray-700">Player Position</label>
                    <input
                        type="text"
                        id="playerPosition"
                        placeholder="Ex. Forward"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600"
                        value={playerPosition}
                        onChange={(e) => setPlayerPosition(e.target.value)}
                    />
                </div>
            </div>

            <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleUpload}
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Upload & Analyze"}
            </button>
        </div>
    );
}

export default UploadBlock;
