import { useState } from "react";
import { generateShortCode, saveUrl } from "../utils/storage";

export default function Freemium() {
    const [url, setUrl] = useState("");
    const [shortCode, setShortCode] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        if (!url.trim()) {
            alert("Please enter a URL");
            return;
        }

        let code = generateShortCode();

        saveUrl(code, url);

        setShortCode(code);
    };

    const handleReset = () => {
        setUrl("");
        setShortCode("");
        setCopied(false);
    };

    const handleCopy = () => {
        const fullUrl = `${window.location.origin}/${shortCode}`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-cyan-500/30 p-8 shadow-2xl shadow-cyan-500/20">

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse">

                        </div>
                        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">Free Access</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                            Freemium
                        </span>
                    </h2>
                </div>

                {!shortCode ? (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="urlInput" className="block text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">
                                Enter your long URL
                            </label>
                            <input
                                id="urlInput"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://google.com"
                                className="w-full px-5 py-4 bg-black/50 border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50"
                        >
                            Generate Short Link
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-black/60 rounded-xl border border-cyan-500/30 p-6">
                            <p className="text-sm text-cyan-400 mb-3 font-semibold uppercase tracking-wide">Your shortened URL:</p>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <code className="flex-1 text-lg font-mono text-cyan-300 bg-black/50 px-4 py-3 rounded-lg border border-cyan-500/20">
                                    {window.location.origin}/{shortCode}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 font-bold"
                                >
                                    {copied ? (
                                        <>
                                            <span>✓</span>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>📋</span>
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="bg-black/60 rounded-xl border border-gray-800 p-6">
                            <p className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wide">Original URL:</p>
                            <p className="text-white break-all">{url}</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-cyan-400 font-bold py-4 px-6 rounded-xl transition-all border-2 border-gray-800 hover:border-cyan-500/50"
                        >
                            Create Another Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}