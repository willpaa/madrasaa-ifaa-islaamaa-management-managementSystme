import React, { useState } from 'react';
import { UserRole } from '../../types/school';
import { 
  School, 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Users,
  GraduationCap
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, userDisplayName: string) => void;
  onExploreAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onExploreAsGuest
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailOrId, setEmailOrId] = useState('sophia.chen@ifaa-islaamaa.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Demo accounts quick-switch
  const demoAccounts: { role: UserRole; name: string; id: string; desc: string }[] = [
    { role: 'student', name: 'Sophia Chen', id: 'sophia.chen@ifaa-islaamaa.edu', desc: 'Grade 10 High School Scholar' },
    { role: 'parent', name: 'David & Elena Chen', id: 'dchen.family@example.com', desc: 'Guardian of Sophia & Leo' },
    { role: 'teacher', name: 'Dr. Evelyn Vance', id: 'e.vance@ifaa-islaamaa.edu', desc: 'Biology & 10-A Homeroom Educator' },
    { role: 'admin', name: 'Dr. Arthur Pendelton', id: 'principal@ifaa-islaamaa.edu', desc: 'Head of School / Principal' }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const demo = demoAccounts.find(d => d.role === role);
    if (demo) {
      setEmailOrId(demo.id);
      setPassword('SchoolPass2026!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const demo = demoAccounts.find(d => d.role === selectedRole);
      onLoginSuccess(selectedRole, demo ? demo.name : 'Authorized User');
      setIsLoading(false);
    }, 700);
  };

  const handleBiometricAuth = () => {
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      const demo = demoAccounts.find(d => d.role === selectedRole);
      onLoginSuccess(selectedRole, demo ? demo.name : 'Authorized User');
    }, 1200);
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Institution Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 p-3 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
            <School className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white font-heading">
            EduPulse Portal Login
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Madrasaa Ifaa Islaamaa • Unified K-12 Gateway
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="mb-6">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
            Select Your School Role:
          </label>
          <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            {demoAccounts.map((account) => {
              const isSelected = selectedRole === account.role;
              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleRoleSelect(account.role)}
                  className={`py-2 px-1 rounded-xl text-center font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="text-base">
                    {account.role === 'student' && '🎒'}
                    {account.role === 'parent' && '👨‍👩‍👧'}
                    {account.role === 'teacher' && '👩‍🏫'}
                    {account.role === 'admin' && '🏫'}
                  </div>
                  <span className="text-[10px] block capitalize font-medium mt-0.5">
                    {account.role}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-center">
            <span className="text-[11px] text-indigo-300 font-medium">
              Active Role: {demoAccounts.find(d => d.role === selectedRole)?.desc}
            </span>
          </div>
        </div>

        {/* Main Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {selectedRole === 'student' ? 'Student ID or School Email' : 'Email Address / Portal ID'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                required
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                placeholder="name@stjude.edu"
                className="w-full bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 pl-10 pr-10 py-2.5 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Campus SSO */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Remember device for 30 days</span>
            </label>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 2FA Ready
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all disabled:opacity-50"
          >
            <span>{isLoading ? 'Authenticating with School Vault...' : `Sign In as ${selectedRole.toUpperCase()}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Biometrics & Alternative Login Divder */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative bg-slate-900 px-3 text-[11px] text-slate-500 font-medium">
            or authenticate with
          </span>
        </div>

        {/* Biometric & Student QR Options */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleBiometricAuth}
            disabled={biometricScanning}
            className="p-2.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Fingerprint className={`w-4 h-4 text-emerald-400 ${biometricScanning ? 'animate-bounce' : ''}`} />
            <span>{biometricScanning ? 'Verifying...' : 'Face / Touch ID'}</span>
          </button>

          <button
            type="button"
            onClick={handleBiometricAuth}
            className="p-2.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <QrCode className="w-4 h-4 text-indigo-400" />
            <span>Scan Student Pass</span>
          </button>
        </div>

        {/* Quick Demo Fill Helper */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>Testing the portal? </span>
          <button
            onClick={() => handleRoleSelect(selectedRole)}
            className="text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-2 cursor-pointer ml-1"
          >
            Reset Demo Credentials
          </button>
          {onExploreAsGuest && (
            <div className="mt-2">
              <button
                onClick={onExploreAsGuest}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline cursor-pointer"
              >
                Continue to Public Campus Home
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Forgot Password */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-white font-heading">Reset School Password</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your registered student ID or parent email. A one-time verification passcode will be dispatched to your phone and primary inbox.
            </p>
            {forgotSuccess ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Passcode sent! Check your inbox or SMS.</span>
              </div>
            ) : (
              <input
                type="text"
                defaultValue={emailOrId}
                placeholder="Enter email or student ID"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl"
              />
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSuccess(false);
                }}
                className="flex-1 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl cursor-pointer font-medium"
              >
                Close
              </button>
              {!forgotSuccess && (
                <button
                  onClick={() => setForgotSuccess(true)}
                  className="flex-1 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl cursor-pointer"
                >
                  Send Passcode
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
