'use client'
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Summary */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Tariq Mehmood
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Full Stack MERN Developer | AI Integration & DevOps
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Building modern web applications with MERN stack, AI, and cloud deployment.
            </p>
            {/* Contact quick links for mobile */}
            <div className="mt-4 flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <span>📞 +923325293542</span>
              <span>✉️ tmtariq110@gmail.com</span>
              <span>📍 Pakistan</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack Highlights */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Tech Stack
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400">MERN Stack</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">Next.js & Tailwind</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">AI / LLM Integration</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">DevOps & Cloud</li>
            </ul>
          </div>

          {/* Column 4: Social & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href="https://www.linkedin.com/in/tariq992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/tariq992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="#"
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Portfolio
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              &copy; {currentYear} Tariq Mehmood. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Bar with additional info */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <span>Full Stack Developer • MERN • AI • DevOps</span>
          <span className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;