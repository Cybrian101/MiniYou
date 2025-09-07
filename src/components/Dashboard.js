'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import {
    Share2, Edit3, Palette, Link, QrCode, User, AtSign, Camera, Bot, Smile, UserSquare,
    Trash2, PlusCircle, Check, Copy, ChevronDown, LogOut
} from 'lucide-react';
// FIX: Import each icon individually to resolve build errors with Next.js barrel file optimization.
import { SlSocialTwitter } from 'react-icons/si';
import { SiLinkedin } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';
import { SiFacebook } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';
import { SiYoutube } from 'react-icons/si';
import { SiTwitch } from 'react-icons/si';
import { SiDiscord } from 'react-icons/si';
import { SiReddit } from 'react-icons/si';
import { SiMedium } from 'react-icons/si';
import { SiBehance } from 'react-icons/si';
import { SiSnapchat } from 'react-icons/si';
import { SiTelegram } from 'react-icons/si';
import { SiTinder } from 'react-icons/si';
import { SiLeetcode } from 'react-icons/si';
import { SiHackerrank } from 'react-icons/si';
import { SiCodechef } from 'react-icons/si';
import { SiStackoverflow } from 'react-icons/si';

import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';
import { getCurrentUser, getUserProfile, updateProfile, signOutUser, uploadAvatar } from '../lib/auth';

// --- Helper map for social icons ---
const socialIconMap = {
    twitter: { icon: <SlSocialTwitter size={24} />, name: 'Twitter' },
    linkedin: { icon: <SiLinkedin size={24} />, name: 'LinkedIn' },
    github: { icon: <SiGithub size={24} />, name: 'GitHub' },
    facebook: { icon: <SiFacebook size={24} />, name: 'Facebook' },
    instagram: { icon: <SiInstagram size={24} />, name: 'Instagram' },
    youtube: { icon: <SiYoutube size={24} />, name: 'YouTube' },
    twitch: { icon: <SiTwitch size={24} />, name: 'Twitch' },
    discord: { icon: <SiDiscord size={24} />, name: 'Discord' },
    reddit: { icon: <SiReddit size={24} />, name: 'Reddit' },
    medium: { icon: <SiMedium size={24} />, name: 'Medium' },
    behance: { icon: <SiBehance size={24} />, name: 'Behance' },
    snapchat: { icon: <SiSnapchat size={24} />, name: 'Snapchat' },
    telegram: { icon: <SiTelegram size={24} />, name: 'Telegram' },
    tinder: { icon: <SiTinder size={24} />, name: 'Tinder' },
    leetcode: { icon: <SiLeetcode size={24} />, name: 'LeetCode' },
    hackerrank: { icon: <SiHackerrank size={24} />, name: 'HackerRank' },
    codechef: { icon: <SiCodechef size={24} />, name: 'CodeChef' },
    stackoverflow: { icon: <SiStackoverflow size={24} />, name: 'Stack Overflow' },
};

// --- Main Dashboard Component ---
export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    const profile = await getUserProfile(currentUser.id);
                    setUserData(profile);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                toast.error("Could not fetch user data.");
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [router]);

    const handleSignOut = async () => {
        await signOutUser();
        toast.success("You've been signed out.");
        router.push('/login');
    };

    if (loading) {
        return <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center text-white"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div></div>;
    }
    if (!userData) {
        return <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center text-red-500">Failed to load profile. Please try logging in again.</div>;
    }

    const shareableLink = `https://miniyou.co.in/${userData.nickname}`;

    return (
        <>
            <Toaster position="bottom-center" toastOptions={{
                style: { background: '#333', color: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.5)' },
                success: { iconTheme: { primary: '#a78bfa', secondary: 'white' } }
            }} />
            <style jsx="true" global="true">{`
                @keyframes subtle-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-subtle-float {
                    animation: subtle-float 6s ease-in-out infinite;
                }
            `}</style>
            <main className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">Welcome back, {userData.full_name?.split(' ')[0]}!</h1>
                            <p className="text-indigo-200">Here's your dashboard. Let's make your card shine.</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 sm:mt-0">
                             <a href={`/profiles?user=${userData.nickname}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 font-semibold text-indigo-600 bg-white rounded-lg hover:bg-indigo-100 transition">
                                View Public Page
                            </a>
                            <button onClick={handleSignOut} className="p-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </header>

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Real-time Profile Card Preview */}
                        <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-8">
                            <Tilt glareEnable={true} glareMaxOpacity={0.1} scale={1.05} className="animate-subtle-float">
                                <div
                                    className="transition-all duration-300 w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden"
                                    style={{ backgroundColor: userData.design?.colors?.background || '#ffffff' }}
                                >
                                    <div className="h-28" style={{ backgroundColor: userData.design?.colors?.primary || '#6366f1' }}></div>
                                    <div className="relative -mt-16">
                                        <img src={userData.avatar_url || `https://placehold.co/128x128/c7d2fe/312e81?text=${userData.full_name?.charAt(0) || 'P'}`} alt="User Avatar" className="w-28 h-28 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover" />
                                    </div>
                                    <div className="pt-6 pb-8 px-6 text-center">
                                        <h1 className="text-2xl font-bold" style={{ color: userData.design?.colors?.text || '#1f2937' }}>{userData.full_name}</h1>
                                        <p style={{ color: userData.design?.colors?.primary || '#6366f1' }}>@{userData.nickname}</p>
                                        <p className="mt-4 text-sm" style={{ color: userData.design?.colors?.text || '#1f2937' }}>{userData.bio}</p>
                                        <div className={`flex justify-center items-center gap-4 mt-6 ${userData.design?.iconLayout === 'vertical' ? 'flex-col' : ''}`}>
                                            {Array.isArray(userData.socialLinks) && userData.socialLinks.map((link, index) => (
                                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110" style={{ color: userData.design?.colors?.primary || '#6366f1' }}>
                                                    {socialIconMap[link.platform]?.icon || <Link size={24} />}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </div>

                        {/* Right Column: Customization Panel */}
                        <div className="lg:col-span-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8">
                            <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
                                <TabButton icon={<Edit3 />} label="Profile" activeTab={activeTab} onClick={() => setActiveTab('profile')} />
                                <TabButton icon={<Bot />} label="Avatar" activeTab={activeTab} onClick={() => setActiveTab('avatar')} />
                                <TabButton icon={<Palette />} label="Design" activeTab={activeTab} onClick={() => setActiveTab('design')} />
                                <TabButton icon={<Share2 />} label="Share" activeTab={activeTab} onClick={() => setActiveTab('share')} />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                    {activeTab === 'profile' && <ProfileEditor user={user} userData={userData} setUserData={setUserData} />}
                                    {activeTab === 'avatar' && <AvatarEditor user={user} userData={userData} setUserData={setUserData} />}
                                    {activeTab === 'design' && <DesignEditor user={user} userData={userData} setUserData={setUserData} />}
                                    {activeTab === 'share' && <SharePanel link={shareableLink} userData={userData} />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

// --- Sub-components for the dashboard (memoized for performance) ---

const TabButton = memo(({ icon, label, activeTab, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-2 px-3 sm:px-4 py-2 font-semibold text-sm transition ${activeTab === label.toLowerCase() ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>
        {icon} <span className="hidden sm:inline">{label}</span>
    </button>
));

const ProfileEditor = memo(({ user, userData, setUserData }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(userData.avatar_url);

    useEffect(() => {
        setAvatarPreview(userData.avatar_url);
    }, [userData.avatar_url]);

    const handleDataChange = useCallback((field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    }, [setUserData]);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let avatarUrl = userData.avatar_url;
            if (avatarFile) {
                avatarUrl = await uploadAvatar(user.id, avatarFile);
            }
            
            const updates = {
                full_name: userData.full_name,
                nickname: userData.nickname,
                bio: userData.bio,
                avatar_url: avatarUrl,
            };

            const updatedProfile = await updateProfile(user.id, updates);
            setUserData(prev => ({ ...prev, ...updatedProfile }));
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error("Profile save error:", error);
            toast.error('Could not save profile.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Your Profile</h3>
            
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src={avatarPreview || `https://placehold.co/128x128/c7d2fe/312e81?text=${userData.full_name?.charAt(0) || 'P'}`} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover"/>
                    <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700 transition">
                        <Camera size={16} />
                        <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                </div>
                 <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Upload a new photo</p>
                    <p className="text-xs text-gray-500">Or generate one in the Avatar tab.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWithIcon icon={<User />} label="Full Name" name="full_name" value={userData.full_name || ''} onChange={(e) => handleDataChange('full_name', e.target.value)} />
                <InputWithIcon icon={<AtSign />} label="Nickname" name="nickname" value={userData.nickname || ''} onChange={(e) => handleDataChange('nickname', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea name="bio" value={userData.bio || ''} onChange={(e) => handleDataChange('bio', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600" rows="3"></textarea>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Profile'}
            </motion.button>
        </motion.div>
    );
});

const AvatarEditor = memo(({ user, userData, setUserData }) => {
    const [seed, setSeed] = useState(userData.nickname || 'procard');
    const [style, setStyle] = useState('adventurer');
    const [isSaving, setIsSaving] = useState(false);

    const avatarUrl = `https://api.dicebear.com/8.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

    const handleSetAvatar = () => {
        setUserData(prev => ({ ...prev, avatar_url: avatarUrl }));
        toast.success('Avatar preview updated!');
    };
    
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const updates = { avatar_url: avatarUrl };
            const updatedProfile = await updateProfile(user.id, updates);
            setUserData(prev => ({ ...prev, ...updatedProfile }));
            toast.success('Avatar saved successfully!');
        } catch (error) {
             console.error("Avatar save error:", error);
            toast.error('Could not save avatar.');
        } finally {
            setIsSaving(false);
        }
    };
    
    const avatarStyles = [
        { id: 'adventurer', name: 'Adventurer', icon: <UserSquare/> },
        { id: 'bottts', name: 'Bots', icon: <Bot/> },
        { id: 'pixel-art', name: 'Pixel Art', icon: <UserSquare/> },
        { id: 'initials', name: 'Initials', icon: <AtSign/> },
        { id: 'fun-emoji', name: 'Emoji', icon: <Smile/> }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Generate an Avatar</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full"/>
                </div>
                <div className="flex-1 w-full space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar Style</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {avatarStyles.map(s => (
                                <button key={s.id} onClick={() => setStyle(s.id)} className={`flex items-center justify-center gap-2 p-2 text-sm rounded-lg transition ${style === s.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    {s.icon} {s.name}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seed</label>
                        <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Enter a seed" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSetAvatar} className="w-full sm:w-auto flex-1 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">
                    Preview on Card
                 </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto flex-1 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                    {isSaving ? 'Saving...' : 'Save Avatar'}
                </motion.button>
            </div>
        </motion.div>
    );
});

const DesignEditor = memo(({ user, userData, setUserData }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    const handleDesignChange = (field, value) => {
        setUserData(prev => ({ ...prev, design: { ...(prev.design || { colors: {} }), [field]: value } }));
    };
    
    const handleColorChange = (name, value) => {
         setUserData(prev => ({ ...prev, design: { ...(prev.design || {}), colors: { ...(prev.design?.colors || {}), [name]: value } } }));
    };

    const handleAddLink = useCallback((newLink) => {
        if (!newLink.url) return;
        const updatedLinks = [...(userData.socialLinks || []), newLink];
        setUserData(prev => ({ ...prev, socialLinks: updatedLinks }));
        toast.success('Social link added!');
    }, [userData.socialLinks, setUserData]);

    const handleRemoveLink = useCallback((index) => {
        const updatedLinks = (userData.socialLinks || []).filter((_, i) => i !== index);
        setUserData(prev => ({...prev, socialLinks: updatedLinks}));
    }, [userData.socialLinks, setUserData]);

    const handleSave = async () => {
        setIsSaving(true);
        const updates = {
            design: userData.design,
            socialLinks: userData.socialLinks,
        };
        await toast.promise(
            updateProfile(user.id, updates),
            {
                loading: 'Saving design...',
                success: (updatedProfile) => {
                    setUserData(prev => ({ ...prev, ...updatedProfile }));
                    return 'Design saved successfully!';
                },
                error: 'Could not save design.',
            }
        );
        setIsSaving(false);
    };

    return (
        <>
            <AddLinkModal 
                isOpen={isLinkModalOpen} 
                onClose={() => setIsLinkModalOpen(false)}
                onAddLink={handleAddLink}
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Card Colors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ColorPicker label="Background" name="background" value={userData.design?.colors?.background || '#ffffff'} onChange={(e) => handleColorChange('background', e.target.value)} />
                        <ColorPicker label="Text" name="text" value={userData.design?.colors?.text || '#1f2937'} onChange={(e) => handleColorChange('text', e.target.value)} />
                        <ColorPicker label="Primary" name="primary" value={userData.design?.colors?.primary || '#6366f1'} onChange={(e) => handleColorChange('primary', e.target.value)} />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Icon Layout</h3>
                    <div className="flex gap-4">
                        <RadioPill id="horizontal" name="iconLayout" value="horizontal" checked={userData.design?.iconLayout === 'horizontal'} onChange={(e) => handleDesignChange('iconLayout', e.target.value)} label="Horizontal" />
                        <RadioPill id="vertical" name="iconLayout" value="vertical" checked={userData.design?.iconLayout === 'vertical'} onChange={(e) => handleDesignChange('iconLayout', e.target.value)} label="Vertical" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Manage Social Links</h3>
                        <button onClick={() => setIsLinkModalOpen(true)} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 text-sm font-semibold rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900">
                            <PlusCircle size={16} /> Add Link
                        </button>
                    </div>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {Array.isArray(userData.socialLinks) && userData.socialLinks.map((link, index) => (
                                <motion.div layout key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                                    <div className="text-gray-500">{socialIconMap[link.platform]?.icon}</div>
                                    <input type="text" value={link.url} readOnly className="flex-grow p-1 bg-transparent text-sm" />
                                    <button onClick={() => handleRemoveLink(index)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><Trash2 size={18} /></button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                    {isSaving ? 'Saving...' : 'Save Design'}
                </motion.button>
            </motion.div>
        </>
    );
});

const AddLinkModal = memo(({ isOpen, onClose, onAddLink }) => {
    const [step, setStep] = useState(1);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal closes
            setTimeout(() => {
                setStep(1);
                setSelectedPlatform(null);
                setUrl('');
            }, 300); // Delay to allow exit animation
        }
    }, [isOpen]);

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        setStep(2);
    };

    const handleAdd = () => {
        onAddLink({ platform: selectedPlatform, url });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6"
                    >
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Choose a platform</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                        {Object.entries(socialIconMap).map(([platform, { icon, name }]) => (
                                            <button key={platform} onClick={() => handlePlatformSelect(platform)} className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition">
                                                {icon}
                                                <span className="text-xs font-semibold">{name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <button onClick={() => setStep(1)} className="text-sm text-gray-500 mb-4 hover:text-indigo-600">&larr; Back</button>
                                    <div className="flex items-center gap-3 mb-4">
                                        {socialIconMap[selectedPlatform]?.icon}
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Add {socialIconMap[selectedPlatform]?.name} Link</h3>
                                    </div>
                                    <div className="relative">
                                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder={`https://www.${selectedPlatform}.com/...`}
                                            className="pl-10 block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                                        <button onClick={handleAdd} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Add Link</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});


const SharePanel = memo(({ link, userData }) => {
    const [copied, setCopied] = useState(false);

    const shareMessage = `Check out my digital identity on MiniYou! Create your own at miniyou.co.in ✨\n\n${link}`;
    
    const handleCopyMessage = useCallback(() => {
        navigator.clipboard.writeText(shareMessage);
        toast.success('Share message copied!');
    }, [shareMessage]);
    
    // Construct QR Code URL with user avatar
    const encodedLink = encodeURIComponent(link);
    const avatarForQr = userData.avatar_url || `https://placehold.co/128x128/c7d2fe/312e81?text=${userData.full_name?.charAt(0) || 'M'}`;
    const encodedAvatarUrl = encodeURIComponent(avatarForQr);
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodedLink}&logo=${encodedAvatarUrl}&size=200&centerImage=true`;

    const handleDownloadQR = () => {
        const a = document.createElement('a');
        a.href = qrCodeUrl;
        a.download = 'MiniYou_QR_Code.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Share Your Card</h3>
            
            {/* Share on Socials */}
            <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">One-click Share</label>
                 <div className="flex gap-2">
                     <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition">
                         <SiTwitter/> Twitter
                     </a>
                     <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedLink}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition">
                         <SiLinkedin/> LinkedIn
                     </a>
                     <a href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition">
                         <SiWhatsapp/> WhatsApp
                     </a>
                 </div>
            </div>

            {/* Share Message Section */}
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Copy Share Message</label>
                <textarea readOnly value={shareMessage} className="w-full h-24 p-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600 text-sm" />
                <button onClick={handleCopyMessage} className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Copy Message</button>
            </div>

            {/* QR Code Section */}
            <div className="text-center">
                <div className="relative inline-block p-4 bg-white rounded-lg shadow-md">
                    <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40"/>
                    <button onClick={handleDownloadQR} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition">
                        <Download size={14}/>
                    </button>
                </div>
                <p className="font-bold text-lg text-gray-700 dark:text-gray-300 mt-2">MiniYou</p>
                <p className="text-sm text-gray-500 mt-1">Scan or download your QR code</p>
            </div>
        </motion.div>
    );
});

const InputWithIcon = memo(({ icon, label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{icon}</div>
            <input {...props} className="w-full pl-10 p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600" />
        </div>
    </div>
));

const ColorPicker = memo(({ label, name, value, onChange }) => (
    <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
        <div className="relative w-12 h-12">
            <input type="color" name={name} value={value || '#ffffff'} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-full h-full rounded-full border-2 border-gray-300" style={{ backgroundColor: value }}></div>
        </div>
    </div>
));

const RadioPill = memo(({ id, name, value, checked, onChange, label }) => (
    <div>
        <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
        <label htmlFor={id} className={`block cursor-pointer px-4 py-2 rounded-full text-sm font-semibold transition ${checked ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
            {label}
        </label>
    </div>
));

