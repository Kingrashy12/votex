import React from "react";
import { FiGithub, FiTwitter, FiGlobe } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-4 md:px-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Votex</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Empowering decentralized voting with $VTX tokens.
          </p>
        </div>

        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <a
            href="https://github.com/Kingrashy12/votex"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://x.com/Kingrashy12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiTwitter size={20} />
          </a>
          <a
            href="https://votex-five.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FiGlobe size={20} />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Votex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
