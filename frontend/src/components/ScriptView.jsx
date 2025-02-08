import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  IconScript, 
  IconEdit,
  IconCheck,
  IconX,
  IconRefresh,
  IconMessageCircle,
  IconArrowLeft,
  IconHome
} from '@tabler/icons-react';

const ScriptView = ({ script, onRegenerateScript, onBack, onReset, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState(script);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    setEditedScript(script);
    setIsRegenerating(false);
  }, [script]);

  const handleEditSave = () => {
    setIsEditing(false);
    // Here you could add logic to save the edited script if needed
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedScript(script);
  };

  const handleRegenerateClick = () => {
    setShowFeedbackInput(true);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setIsRegenerating(true);
      onRegenerateScript(null, feedback);
      setShowFeedbackInput(false);
      setFeedback('');
    }
  };

  const handleBackClick = () => {
    if (onBack) onBack();
  };

  const handleHomeClick = () => {
    if (onReset) onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 max-w-4xl mx-auto px-6 pb-24"
    >
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 transition-colors"
        >
          <IconArrowLeft className="w-5 h-5" />
          Back to USPs
        </button>
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 transition-colors"
        >
          <IconHome className="w-5 h-5" />
          Home
        </button>
      </div>

      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <IconScript className="w-6 h-6 text-blue-400" />
            Generated Script
          </h2>
          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors"
              disabled={isRegenerating}
            >
              <IconEdit className="w-5 h-5" />
            </button> */}
            <button
              onClick={handleRegenerateClick}
              className="flex items-center gap-2 p-2 w-40 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors"
              disabled={loading || isRegenerating}
            >
              <IconEdit className={`w-5 h-5 ${isRegenerating ? 'animate-spin' : ''}`} />
              Suggest Edits
            </button>
          </div>
        </div>

        {showFeedbackInput ? (
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What changes would you like to make to the script?"
                className="flex-1 bg-black/30 text-gray-200 px-4 py-3 rounded-lg border border-blue-500/20 focus:outline-none focus:border-blue-500 min-h-[100px]"
                disabled={isRegenerating}
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedback.trim() || loading || isRegenerating}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors disabled:opacity-50"
                >
                  {isRegenerating ? (
                    <div className="w-5 h-5 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
                  ) : (
                    <IconCheck className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setShowFeedbackInput(false)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  disabled={isRegenerating}
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <textarea
                value={editedScript}
                onChange={(e) => setEditedScript(e.target.value)}
                className="w-full bg-black/30 text-gray-200 px-4 py-3 rounded-lg border border-blue-500/20 focus:outline-none focus:border-blue-500 min-h-[200px]"
                disabled={isRegenerating}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleEditSave}
                  disabled={isRegenerating}
                  className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2"
                >
                  <IconCheck className="w-5 h-5" />
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  disabled={isRegenerating}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
                >
                  <IconX className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              {isRegenerating && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
                    <span className="text-blue-400">Regenerating script...</span>
                  </div>
                </div>
              )}
              <p className="text-gray-200 whitespace-pre-wrap">{editedScript}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ScriptView; 