'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Twitter, Linkedin, Github, Instagram, Youtube, Twitch, Link } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { getPublicProfileByNickname } from '@/lib/auth';
import Image from 'next/image';


// --- Helper map for social icons ---
const SnapchatIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.7c-5.3 0-9.5 4-9.5 9s4.2 9 9.5 9c2.3 0 4.2-.7 5.7-1.8-1.5-.4-2.8-.7-4.2-.7-3.3 0-6.2-2.5-6.2-5.5s2.9-5.5 6.2-5.5c1.4 0 2.7.3 4.2.7-1.5-1.1-3.4-1.8-5.7-1.8z" />
    </svg>
);
const TelegramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);

const socialIconMap = {
    twitter: { icon: <Twitter />, name: 'Twitter' },
    linkedin: { icon: <Linkedin />, name: 'LinkedIn' },
    github: { icon: <Github />, name: 'GitHub' },
    instagram: { icon: <Instagram />, name: 'Instagram' },
    youtube: { icon: <Youtube />, name: 'YouTube' },
    twitch: { icon: <Twitch />, name: 'Twitch' },
    snapchat: { icon: <SnapchatIcon />, name: 'Snapchat' },
    telegram: { icon: <TelegramIcon />, name: 'Telegram' },
};

// Loading component to be used as a fallback for Suspense
function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
}


// This component contains the actual page logic that uses the search parameters.
function ProfileContent() {
    const searchParams = useSearchParams();
    const nickname = searchParams.get('user');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!nickname) {
            setError('No user specified in the URL.');
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const profile = await getPublicProfileByNickname(nickname);
                if (profile) {
                    setUserData(profile);
                } else {
                    setError('Profile not found or is not public.');
                }
            } catch (err) {
                console.error("Error fetching public profile:", err);
                setError('An error occurred while loading this profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [nickname]);

    if (loading) {
       return <LoadingSpinner />;
    }

    if (error || !userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
                <p>{error || 'Could not load profile.'}</p>
            </div>
        );
    }

    return (
        <>
            <style jsx="true" global="true">{`
                body {
                    overflow: hidden;
                }
                .cosmic-background {
                    background: linear-gradient(250deg, #1e0033, #3d1f7c, #0d0628);
                    background-size: 400% 400%;
                    animation: gradientAnimation 15s ease infinite;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }

                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                  100% { transform: translateY(0px); }
                }
            `}</style>
            <div className="cosmic-background"></div>
            <main className="flex items-center justify-center min-h-screen w-full p-4 relative overflow-hidden">
                {/* Showcase Container */}
                <div className="w-full max-w-md mx-auto bg-white/5 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-white">{userData.full_name}</h1>
                        <p className="text-indigo-300">@{userData.nickname}</p>
                    </div>
                    
                    <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
                        <div
                            className="transition-all duration-300 w-full rounded-2xl shadow-xl overflow-hidden"
                            style={{ backgroundColor: userData.design?.colors?.background || '#ffffff' }}
                        >
                            <div className="h-28" style={{ backgroundColor: userData.design?.colors?.primary || '#6366f1' }}></div>
                            <div className="relative -mt-16">
                                <Image src={userData.avatar_url || `https://placehold.co/128x128/c7d2fe/312e81?text=${userData.full_name?.charAt(0) || 'P'}`} alt="User Avatar" width={112} height={112} className="w-28 h-28 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover" />
                            </div>
                            <div className="pt-6 pb-8 px-6 text-center">
                                <p className="text-sm" style={{ color: userData.design?.colors?.text || '#1f2937' }}>{userData.bio}</p>
                                <div className={`flex justify-center items-center gap-4 mt-6 ${userData.design?.iconLayout === 'vertical' ? 'flex-col' : ''}`}>
                                    {Array.isArray(userData.socialLinks) && userData.socialLinks.map((link, index) => (
                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125" style={{ color: userData.design?.colors?.primary || '#6366f1' }}>
                                            {socialIconMap[link.platform]?.icon || <Link size={24} />}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Tilt>

                    <div className="text-center mt-6">
                        <a href="https://miniyou.co.in" target="_blank" rel="noopener noreferrer" className="px-6 py-2 text-sm font-semibold bg-white/80 text-indigo-600 rounded-full hover:bg-white transition">
                            Create Your Own MiniYou
                        </a>
                    </div>
                </div>
                
                <footer className="absolute bottom-4 text-center w-full">
                    <a href="https://miniyou.co.in" target="_blank" rel="noopener noreferrer" className="text-white/50 text-xs hover:text-white/80 transition">
                        A MiniYou by MiniMe 😉 © 2025 MiniMe.
                    </a>
                </footer>
            </main>
        </>
    );
}

// The main page export now wraps the dynamic content in a Suspense boundary.
export default function PublicProfilePage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ProfileContent />
        </Suspense>
    );
}

