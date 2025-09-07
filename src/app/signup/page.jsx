'use client';

import SignupForm from '@/components/SignupForm';
import '@/components/SignupForm.css';       // Moving border styles
import '@/components/StarsBackground.css';

export default function SignupPage() {
  return (
    <>
      {/* Starry background layers */}
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />

      <main className="flex items-center justify-center min-h-screen bg-transparent p-6">
        
          <SignupForm />
        
      </main>
    </>
  );
}
