import { useState } from 'react';
import { Chrome, Apple, Facebook, Mail, Lock, User, ChevronRight, Eye, EyeOff } from 'lucide-react';
import gymBg from '@/assets/gym-bg.jpg';

interface AuthScreenProps {
  onLogin: (username: string) => void;
  onSignUp: () => void;
}

const AuthScreen = ({ onLogin, onSignUp }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'user') {
      onLogin(username);
    } else {
      setError('Invalid credentials. Try user / user');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSignUp = () => {
    if (signupName && signupEmail && signupPassword) {
      onLogin(signupName);
      onSignUp();
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={gymBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col safe-top safe-bottom px-6">
        {/* Logo */}
        <div className="flex-1 flex flex-col justify-center items-center pt-12">
          <div className="mb-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 mx-auto neon-glow">
              <span className="font-display font-bold text-2xl text-primary">AI</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-center">
              <span className="neon-text">AI COACH</span>
            </h1>
            <p className="text-muted-foreground text-center text-sm mt-2">Your intelligent fitness companion</p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="pb-8 animate-slide-up">
          {isLogin ? (
            <>
              {/* Login Form */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={username}
                    onChange={e => { setUsername(e.target.value); setError(''); }}
                    placeholder="Username"
                    className="w-full h-13 rounded-2xl glass-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="Password"
                    className="w-full h-13 rounded-2xl glass-surface pl-11 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                    {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-destructive text-xs text-center mb-3 animate-slide-up">{error}</div>
              )}

              <button
                onClick={handleLogin}
                className="haptic-press touch-target w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-base flex items-center justify-center gap-2 neon-glow mb-4"
              >
                Sign In
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted-foreground text-xs">or continue with</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="haptic-press touch-target h-13 rounded-2xl glass-surface flex items-center justify-center gap-2 hover:border-primary/50 transition-all">
                  <Chrome className="w-5 h-5" />
                </button>
                <button className="haptic-press touch-target h-13 rounded-2xl glass-surface flex items-center justify-center gap-2 hover:border-primary/50 transition-all">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="haptic-press touch-target h-13 rounded-2xl glass-surface flex items-center justify-center gap-2 hover:border-primary/50 transition-all">
                  <Apple className="w-5 h-5" />
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-primary font-display font-semibold">
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Sign Up Form */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-13 rounded-2xl glass-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full h-13 rounded-2xl glass-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-13 rounded-2xl glass-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleSignUp}
                className="haptic-press touch-target w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-base flex items-center justify-center gap-2 neon-glow mb-4"
              >
                Create Account
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-primary font-display font-semibold">
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
