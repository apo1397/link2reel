import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IconBrandOpenai, 
  IconScript, 
  IconLink, 
  IconArrowLeft,
  IconHome,
  IconEdit,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import axios from 'axios';

const ResultsView = ({ url, usps, onGenerateScript, loading, onReset, onBack }) => {
  const [metadata, setMetadata] = useState(null);
  const [metaLoading, setMetaLoading] = useState(true);
  const [editingUsp, setEditingUsp] = useState(null);
  const [editedUsps, setEditedUsps] = useState(usps);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // Using a proxy service to avoid CORS issues
        const response = await axios.get(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        setMetadata(response.data.data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setMetaLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  const handleEditStart = (index, value) => {
    setEditingUsp(index);
    setEditValue(value);
  };

  const handleEditSave = (index) => {
    const newUsps = [...editedUsps];
    newUsps[index] = editValue;
    setEditedUsps(newUsps);
    setEditingUsp(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingUsp(null);
    setEditValue('');
  };

  const handleBackClick = () => {
    if (onBack) onBack();
  };

  const handleHomeClick = () => {
    if (onReset) onReset();
  };

  const handleGenerateScript = () => {
    onGenerateScript(editedUsps);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 max-w-4xl mx-auto px-6 pb-24"
    >
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 transition-colors"
        >
          <IconArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 transition-colors"
        >
          <IconHome className="w-5 h-5" />
          Home
        </button>
      </div>

      {/* URL Preview Card */}
      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Submitted URL</h2>
        <div className="flex items-start space-x-4">
          {metadata?.image ? (
            <img 
              src={metadata.image.url} 
              alt={metadata.title || 'Website preview'} 
              className="w-24 h-24 object-cover rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
              <IconLink className="w-8 h-8 text-gray-600" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors line-clamp-1"
            >
              {metadata?.title || url}
            </a>
            {metadata?.description && (
              <p className="text-sm text-gray-400 line-clamp-2">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* USPs List */}
      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <IconBrandOpenai className="w-6 h-6 text-blue-400" />
          Generated USPs
        </h2>
        <div className="grid gap-4">
          {editedUsps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-4 rounded-lg bg-black/50 border border-white/10 hover:border-blue-500/20 transition-colors">
                {editingUsp === index ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 bg-black/30 text-gray-200 px-3 py-1 rounded border border-blue-500/20 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditSave(index)}
                      className="p-1 rounded hover:bg-green-500/20 text-green-400"
                    >
                      <IconCheck className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400"
                    >
                      <IconX className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-gray-200">{usp}</p>
                    <button
                      onClick={() => handleEditStart(index, usp)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-blue-500/20 text-blue-400 transition-opacity"
                    >
                      <IconEdit className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <button
          onClick={handleGenerateScript}
          disabled={loading}
          className="mt-8 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Generating Script...
            </>
          ) : (
            <>
              <IconScript className="w-5 h-5" />
              Generate Script
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsView; 