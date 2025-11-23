import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTargetUrl } from "../utils/storage";

export default function Redirect() {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!shortCode) {
            setError(true);
            setLoading(false);
            return;
        }

        setTimeout(() => {
            const targetUrl = getTargetUrl(shortCode);

            if (targetUrl) {
                let finalUrl = targetUrl;
                if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                    finalUrl = 'https://' + targetUrl;
                }

                window.location.href = finalUrl;
            } else {
                setError(true);
                setLoading(false);
            }
        }, 500);
    }, [shortCode]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
                    <p className="text-white text-xl">Redirecting...</p>
                    <p className="text-gray-400 text-sm mt-2">Taking you to your destination</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 p-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-red-500/30 p-8 max-w-md text-center">
                    <div className="text-6xl mb-4">🔗❌</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Link Not Found</h1>
                    <p className="text-gray-300 mb-6">
                        The short link <code className="bg-black/30 px-2 py-1 rounded text-red-400">/{shortCode}</code> doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate('/freemium')}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                    >
                        Create a New Link
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
