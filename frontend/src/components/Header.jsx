import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <div className="relative w-full">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40rem] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 stroke-slate-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]">
          <motion.svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 80V.5H80" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
          </motion.svg>
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-6 md:py-8">
          <div className="relative flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                LINK2REEL
              </span>
            </motion.div>

            {/* Meteor effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] delay-[${i * 0.1}s]`}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;