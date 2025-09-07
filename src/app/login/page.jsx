import LoginForm from '@/components/LoginForm.js';
import '@/components/StarsBackground.css';

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen w-full dark:bg-gray-900 p-4 overflow-hidden">

      {/* Star layers positioned absolutely behind the form */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>
      <div id="stars5"></div>

      {/* Form container with relative z-index so it appears above stars */}
      <div className="relative w-full max-w-md z-10">
        <LoginForm />
      </div>

    </main>
  );
}
