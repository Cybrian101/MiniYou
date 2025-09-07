'use client';

import { useState } from 'react';
import { ArrowRight, LogIn } from "lucide-react";
import { SiLinkedin, SiGithub, SiYoutube, SiInstagram, SiDribbble, SiMedium, SiTelegram } from 'react-icons/si';
import { motion } from 'framer-motion';

// --- Reusable Icon Component for Hover Effects ---
const SocialIcon = ({ icon, href, hoverColorClass }) => (
    <motion.a
        href={href}
        className="text-gray-400 transition-colors"
        whileHover={{ scale: 1.3, rotate: 10, color: hoverColorClass }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        {icon}
    </motion.a>
);

export default function LandingPage() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
            <main className="flex-grow flex items-center justify-center w-full p-4 overflow-hidden relative">
                {/* Background Starfield */}
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <style jsx="true" global="true">{`
                    @keyframes animate-stars { 0% { transform: translateY(0); } 100% { transform: translateY(-2000px); } }
                    #stars { position: absolute; top: 0; left: 0; width: 1px; height: 1px; background: transparent; box-shadow: 15vw 85vh #FFF, 89vw 91vh #FFF, 83vw 37vh #FFF, 50vw 3vh #FFF, 4vw 9vh #FFF, 7vw 41vh #FFF, 85vw 23vh #FFF, 54vw 89vh #FFF, 42vw 35vh #FFF, 2vw 45vh #FFF, 88vw 98vh #FFF, 48vw 58vh #FFF, 76vw 6vh #FFF, 47vw 72vh #FFF, 43vw 9vh #FFF, 1vw 48vh #FFF, 88vw 74vh #FFF, 85vw 3vh #FFF, 54vw 29vh #FFF, 70vw 7vh #FFF, 3vw 60vh #FFF, 36vw 40vh #FFF, 8vw 9vh #FFF, 91vw 12vh #FFF, 23vw 94vh #FFF; animation: animate-stars 150s linear infinite; }
                    #stars2 { position: absolute; top: 0; left: 0; width: 2px; height: 2px; background: transparent; box-shadow: 23vw 7vh #FFF, 8vw 91vh #FFF, 62vw 12vh #FFF, 34vw 69vh #FFF, 96vw 53vh #FFF, 91vw 43vh #FFF, 85vw 52vh #FFF, 8vw 27vh #FFF, 24vw 56vh #FFF, 99vw 88vh #FFF, 7vw 80vh #FFF, 59vw 74vh #FFF, 1vw 90vh #FFF, 44vw 46vh #FFF, 28vw 4vh #FFF, 67vw 2vh #FFF, 52vw 49vh #FFF, 68vw 80vh #FFF, 43vw 69vh #FFF, 77vw 58vh #FFF, 93vw 10vh #FFF, 55vw 22vh #FFF, 20vw 8vh #FFF, 22vw 75vh #FFF; animation: animate-stars 100s linear infinite; }
                    #stars3 { position: absolute; top: 0; left: 0; width: 3px; height: 3px; background: transparent; box-shadow: 97vw 10vh #FFF, 28vw 15vh #FFF, 94vw 97vh #FFF, 96vw 8vh #FFF, 6vw 48vh #FFF, 74vw 70vh #FFF, 51vw 85vh #FFF, 10vw 81vh #FFF, 61vw 76vh #FFF, 55vw 17vh #FFF, 3vw 4vh #FFF, 32vw 20vh #FFF, 49vw 8vh #FFF, 64vw 36vh #FFF; animation: animate-stars 50s linear infinite; }
                    @keyframes blob { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
                    .animate-blob { animation: blob 8s ease-in-out infinite; }
                    .animation-delay-2000 { animation-delay: -2s; }
                    .animation-delay-4000 { animation-delay: -4s; }
                `}</style>
                <div className="relative w-full max-w-5xl">
                    {/* Background Glows & Blobs */}
                    <div className="absolute -top-40 -left-4 w-72 h-72 sm:w-80 sm:h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                    <div className="absolute -bottom-40 -right-4 w-72 h-72 sm:w-80 sm:h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 p-6 sm:p-8 lg:p-12 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                        {/* Left Section: Content & Pitch */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">
                                Create Your MiniYou!
                            </h1>
                            <p className="text-base sm:text-lg text-gray-200/90">
                                Build a stunning, shareable profile card that links to all your socials in one place. Make a lasting impression, your way.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                                <a href="/signup" className="w-full sm:w-auto">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.5)" }} 
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-600 rounded-xl shadow-lg transition-shadow"
                                    >
                                        Build Your MiniYou <ArrowRight size={20} />
                                    </motion.button>
                                </a>
                                <a href="/login" className="w-full sm:w-auto">
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }} 
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-white/10 border-2 border-white/50 rounded-xl"
                                    >
                                        Log In <LogIn size={20} />
                                    </motion.button>
                                </a>
                            </div>
                        </div>

                        {/* Right Section: Animated Card Preview - Now fully responsive */}
                        <div 
                            className="group relative flex items-center justify-center min-h-[400px] lg:h-96 [perspective:1000px]"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Card 1 - Cosmic Coder */}
                            <motion.div 
                                className="absolute w-full max-w-xs bg-white rounded-2xl shadow-xl z-10 lg:group-hover:-rotate-6"
                                initial={{ y: 0, rotate: 0 }}
                                animate={{ 
                                    x: isHovered ? '-105%' : 0, 
                                    y: !isHovered ? 0 : 0,
                                    rotate: isHovered ? -6 : 0 
                                }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <div className="h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-t-2xl"></div>
                                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                                    <img src="/card1.png" alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg"/>
                                </div>
                                <div className="pt-16 pb-8 px-6 text-center">
                                    <h2 className="text-xl font-bold text-gray-500 tracking-widest uppercase">Cosmic Coder</h2>
                                    <h1 className="text-3xl font-bold text-gray-800 mt-1">Robo Shankar</h1>
                                    <div className="flex justify-center items-center gap-4 mt-6">
                                        <SocialIcon href="#" icon={<SiGithub size={24} />} hoverColorClass="text-gray-800" />
                                        <SocialIcon href="#" icon={<SiYoutube size={24} />} hoverColorClass="text-red-500" />
                                        <SocialIcon href="#" icon={<SiLinkedin size={24} />} hoverColorClass="text-blue-600" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3 - Pixel Artist */}
                            <motion.div 
                                className="absolute w-full max-w-xs bg-white rounded-2xl shadow-xl z-10 lg:group-hover:rotate-6"
                                initial={{ y: 0, rotate: 0 }}
                                animate={{ 
                                    x: isHovered ? '105%' : 0, 
                                    y: !isHovered ? 0 : 0,
                                    rotate: isHovered ? 6 : 0 
                                }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <div className="h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-t-2xl"></div>
                                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                                    <img src="/card2.png" alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg"/>
                                </div>
                                <div className="pt-16 pb-8 px-6 text-center">
                                    <h2 className="text-xl font-bold text-gray-500 tracking-widest uppercase">Pixel Artist</h2>
                                    <h1 className="text-3xl font-bold text-gray-800 mt-1">Alex Ray</h1>
                                    <div className="flex justify-center items-center gap-4 mt-6">
                                         <SocialIcon href="#" icon={<SiDribbble size={24} />} hoverColorClass="text-pink-500" />
                                         <SocialIcon href="#" icon={<SiInstagram size={24} />} hoverColorClass="text-purple-600" />
                                         <SocialIcon href="#" icon={<SiTelegram size={24} />} hoverColorClass="text-sky-500" />
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Card 2 - Meme Master - Adapts for mobile stacking */}
                            <motion.div 
                                className="relative w-full max-w-xs bg-white rounded-2xl shadow-xl z-20 lg:group-hover:scale-110"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <div className="h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
                                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                                    <img src="/card3.png" alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200"/>
                                </div>
                                <div className="pt-16 pb-8 px-6 text-center">
                                    <h2 className="text-xl font-bold text-gray-500 tracking-widest uppercase">Meme Master</h2>
                                    <h1 className="text-3xl font-bold text-gray-800 mt-1">Shuri</h1>
                                    <div className="flex justify-center items-center gap-4 mt-6">
                                        <SocialIcon href="#" icon={<SiGithub size={24} />} hoverColorClass="text-gray-800" />
                                        <SocialIcon href="#" icon={<SiLinkedin size={24} />} hoverColorClass="text-blue-600" />
                                        <SocialIcon href="#" icon={<SiMedium size={24} />} hoverColorClass="text-sky-500" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="w-full text-center p-6">
                <p className="font-semibold text-base text-indigo-200">
                    A MiniYou by MiniMe 😉 &copy; 2025 MiniMe.
                </p>
            </footer>
        </div>
    );
}

