import { useState } from "react";
import { validateCustomSlug, saveUrl } from "../utils/storage";

export default function Premium() {
    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [shortCode, setShortCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [validationError, setValidationError] = useState("");

    const handleSlugChange = (e) => {
        const slug = e.target.value;
        setCustomSlug(slug);

        if (slug) {
            const validation = validateCustomSlug(slug);
            if (!validation.valid) {
                setValidationError(validation.error);
            }
            else {
                setValidationError("");
            }
        } else {
            setValidationError("");
        }
    };

    const handleCreate = () => {
        if (!url.trim()) {
            alert("Please enter a URL");
            return;
        }

        if (!customSlug.trim()) {
            alert("Please enter a custom slug");
            return;
        }

        const validation = validateCustomSlug(customSlug);
        if (!validation.valid) {
            setValidationError(validation.error);
            return;
        }


        saveUrl(customSlug, url, true);

        setShortCode(customSlug);
    };

    const handleCopy = () => {
        const fullUrl = `${window.location.origin}/${shortCode}`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setUrl("");
        setCustomSlug("");
        setShortCode("");
        setCopied(false);
        setValidationError("");
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-orange-400/30 p-8 shadow-2xl shadow-orange-400/20">
                <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-400 to-orange-500 text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                    <span>👑</span>
                    <span>PREMIUM</span>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">Premium Access</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                            Custom Links
                        </span>
                    </h2>
                </div>

                {!shortCode ? (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="urlInput" className="block text-sm font-semibold text-orange-300 mb-3 uppercase tracking-wide">
                                Enter your long URL
                            </label>
                            <input
                                id="urlInput"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com/very/long/url"
                                className="w-full px-5 py-4 bg-black/50 border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-400 transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="slugInput" className="block text-sm font-semibold text-orange-300 mb-3 uppercase tracking-wide">
                                Custom slug (3-20 characters)
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm pointer-events-none">
                                    {window.location.origin}/
                                </div>
                                <input
                                    id="slugInput"
                                    type="text"
                                    value={customSlug}
                                    onChange={handleSlugChange}
                                    className={`w-full px-5 py-4 bg-black/50 border-2 ${validationError ? 'border-red-500' : 'border-gray-800'
                                        } rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-400 transition-all font-mono text-sm`}
                                    style={{ paddingLeft: `${window.location.origin.length * 9.5 + 55}px` }}
                                />
                            </div>
                            {validationError && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span>
                                    <span>{validationError}</span>
                                </p>
                            )}
                            {customSlug && !validationError && (
                                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                                    <span>✓</span>
                                    <span>Slug is available!</span>
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleCreate}
                            disabled={!!validationError || !customSlug}
                            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-400/50"
                        >
                            Create Custom Link
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-black/60 rounded-xl border border-orange-400/30 p-6">
                            <p className="text-sm text-orange-300 mb-3 font-semibold uppercase tracking-wide">Your custom URL:</p>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <code className="flex-1 text-lg font-mono text-orange-200 bg-black/50 px-4 py-3 rounded-lg border border-orange-400/20">
                                    {window.location.origin}/{shortCode}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="bg-orange-400 hover:bg-orange-500 text-black px-6 py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 font-bold"
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
                            className="w-full bg-gray-900 hover:bg-gray-800 text-orange-300 font-bold py-4 px-6 rounded-xl transition-all border-2 border-gray-800 hover:border-orange-400/50"
                        >
                            Create Another Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}