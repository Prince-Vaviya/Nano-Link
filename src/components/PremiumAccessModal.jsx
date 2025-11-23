import { useState } from 'react';

export default function PremiumAccessModal({ onAccessGranted, onClose }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (code === '2006') {
            localStorage.setItem('premiumAccess', 'granted');
            onAccessGranted();
        } else {
            setError('Invalid access code. Please try again.');
            setCode('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-orange-400/30 p-8 max-w-md w-full shadow-2xl shadow-orange-400/20 animate-fadeIn">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mb-4">
                        <span className="text-3xl">👑</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                            Premium Access
                        </span>
                    </h2>
                    <p className="text-gray-400">
                        Enter the premium access code
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="accessCode" className="block text-sm font-semibold text-orange-300 mb-2 uppercase tracking-wide">
                            Access Code
                        </label>
                        <input
                            id="accessCode"
                            type="password"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter code"
                            className="w-full px-5 py-4 bg-black/50 border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-400 transition-all text-center text-2xl tracking-widest"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-400 text-sm mt-2 flex items-center justify-center gap-1">
                                <span>⚠️</span>
                                <span>{error}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold py-3 px-6 rounded-xl transition-all border-2 border-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-400/50"
                        >
                            Unlock
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
