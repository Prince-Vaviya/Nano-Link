import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Freemium from "./components/Freemium";
import Premium from "./components/Premium";
import Redirect from "./components/Redirect";
import PremiumAccessModal from "./components/PremiumAccessModal";

function AppContent() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const access = localStorage.getItem('premiumAccess');
    if (access === 'granted') {
      setHasPremiumAccess(true);
    }
  }, []);

  const handlePremiumClick = (e) => {
    e.preventDefault();

    if (hasPremiumAccess) {
      navigate('/premium');
    } else {
      setShowPremiumModal(true);
    }
  };

  const handleAccessGranted = () => {
    setHasPremiumAccess(true);
    setShowPremiumModal(false);
    navigate('/premium');
  };

  return (
    <>
      <div className="min-h-screen bg-black">
        <div className="text-center py-16 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                Nano
              </span>
              <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                Link
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Shorten your URLs instantly using NanoLink.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <NavLink
                to="/freemium"
                className={({ isActive }) =>
                  `group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${isActive
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/50"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800 hover:border-cyan-500/50"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🆓</span>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-wider opacity-70">Free</div>
                    <div className="text-lg">Freemium</div>
                  </div>
                </div>
              </NavLink>

              <button
                onClick={handlePremiumClick}
                className={`group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${location.pathname === '/premium'
                    ? "bg-gradient-to-r from-orange-400 to-orange-500 text-black shadow-lg shadow-orange-400/50"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800 hover:border-orange-400/50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-wider opacity-70">Premium</div>
                    <div className="text-lg">Custom Links</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/freemium" replace />} />
          <Route path="/freemium" element={<Freemium />} />
          <Route path="/premium" element={hasPremiumAccess ? <Premium /> : <Navigate to="/freemium" replace />} />
          <Route path="/:shortCode" element={<Redirect />} />
        </Routes>
      </div>

      {showPremiumModal && (
        <PremiumAccessModal
          onAccessGranted={handleAccessGranted}
          onClose={() => setShowPremiumModal(false)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
