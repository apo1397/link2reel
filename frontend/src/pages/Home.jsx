import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateUSPs, generateScript } from '../api';
import Header from "../components/Header";
import { 
  IconBrandOpenai, 
  IconScript, 
  IconRocket, 
  IconBrandYoutube,
  IconLink,
  IconArrowRight
} from '@tabler/icons-react';
import ResultsView from '../components/ResultsView';
import ScriptView from '../components/ScriptView';

const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute -top-[40rem] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2">
        <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-blue-500/40 to-teal-500/40 blur-3xl" />
      </div>
    </div>
  );
};

const Home = () => {
  const [url, setUrl] = useState("");
  const [usps, setUsps] = useState(null);
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('initial'); // 'initial', 'usps', or 'script'

  const handleReset = () => {
    setUrl("");
    setUsps(null);
    setScript(null);
    setError(null);
    setView('initial');
  };

  const handleBack = () => {
    if (view === 'script') {
      setView('usps');
      setScript(null);
    } else {
      setView('initial');
      setUsps(null);
      setScript(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const useMock = urlParams.get('mock') === 'true';
      
      const result = await generateUSPs(url, useMock);
      setUsps(result.usps);
      setView('usps');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScriptGenerate = async (editedUsps, feedback = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const useMock = urlParams.get('mock') === 'true';
      
      const uspsToUse = feedback ? usps : editedUsps;
      
      const result = await generateScript(url, uspsToUse, useMock, feedback);
      setScript(result.script);
      setView('script');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 overflow-hidden">
      <Header />
      <BackgroundBeams />
      
      {view === 'initial' ? (
        // Initial URL Input View
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm text-blue-300 rounded-full gap-x-2 bg-blue-950/40 border border-blue-500/20">
                <IconBrandYoutube className="w-4 h-4" />
                AI-Powered Video Marketing
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Create Viral Marketing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-600">
                  Reels
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 max-w-lg mx-auto">
                Transform any product URL into engaging social media content using AI.
                Get unique selling points and professional scripts in seconds.
              </p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-10"
              >
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-gray-400">
                        <IconLink className="w-5 h-5" />
                      </div>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter product URL..."
                        required
                        className="block w-full rounded-lg border-0 pl-10 pr-32 py-3 text-gray-900 bg-white/20 backdrop-blur-xl shadow-2xl placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Processing
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Generate
                            <IconArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                  >
                    {error}
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
              >
                {[
                  {
                    icon: <IconBrandOpenai className="w-6 h-6" />,
                    title: "AI-Powered Analysis",
                    description: "Extract key selling points automatically"
                  },
                  {
                    icon: <IconScript className="w-6 h-6" />,
                    title: "Professional Scripts",
                    description: "Generate engaging marketing scripts"
                  },
                  {
                    icon: <IconRocket className="w-6 h-6" />,
                    title: "Quick Results",
                    description: "Get your content ready in seconds"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl border border-white/10 p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-800/5 to-teal-800/5 rounded-xl" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : view === 'usps' ? (
        <div className="pt-24">
          <ResultsView 
            url={url}
            usps={usps}
            onGenerateScript={handleScriptGenerate}
            loading={loading}
            onReset={handleReset}
            onBack={handleBack}
          />
        </div>
      ) : (
        <div className="pt-24">
          <ScriptView
            script={script}
            onRegenerateScript={handleScriptGenerate}
            onBack={handleBack}
            onReset={handleReset}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default Home;