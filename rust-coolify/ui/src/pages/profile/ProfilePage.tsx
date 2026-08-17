// completed ui_page_028
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ProfileNavbar from './ProfileNavbar';
import { User, Shield, Key, Eye, EyeOff, Lock, RefreshCw, Copy, Check } from 'lucide-react';

export default function ProfilePage() {
  useDocumentTitle('Profile');
  const { user } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Email Dəyişmə Dövlətləri (Coolify index.blade.php kimi)
  const [newEmail, setNewEmail] = useState('');
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  // Şifrə Dövlətləri
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 2FA Dövlətləri (Coolify index.blade.php kimi)
  const [twoFactorStatus, setTwoFactorStatus] = useState<'disabled' | 'pending' | 'enabled'>('disabled');
  const [qrCodeSvg, setQrCodeSvg] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
    fetch2FAStatus();
  }, [user]);

  const fetch2FAStatus = async () => {
    try {
      const res = await fetch('/api/profile/two-factor', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTwoFactorStatus(data.status); // 'disabled', 'pending', 'enabled'
        if (data.status === 'pending') {
          setQrCodeSvg(data.qr_code_svg || '');
          setSecretKey(data.secret_key || '');
        }
        if (data.status === 'enabled') {
          setRecoveryCodes(data.recovery_codes || []);
        }
      }
    } catch (_) {}
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        toast.success('Profil yeniləndi.');
        const localUser = JSON.parse(localStorage.getItem('md_user') || '{}');
        localUser.name = name;
        localStorage.setItem('md_user', JSON.stringify(localUser));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setLoading(true);
    try {
      const res = await fetch('/api/profile/email-change/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ new_email: newEmail.toLowerCase() }),
      });

      if (res.ok) {
        toast.success(`Verification code sent to ${newEmail}`);
        setShowEmailChange(false);
        setShowVerification(true);
      } else {
        const data = await res.json();
        toast.error(data.error || 'E-poçt dəyişdirmə sorğusu uğursuz oldu.');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVerificationCode) return;
    setLoading(true);
    try {
      const res = await fetch('/api/profile/email-change/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ code: emailVerificationCode }),
      });

      if (res.ok) {
        toast.success('Email address updated successfully.');
        setEmail(newEmail);
        setShowVerification(false);
        setNewEmail('');
        setEmailVerificationCode('');
        
        const localUser = JSON.parse(localStorage.getItem('md_user') || '{}');
        localUser.email = newEmail;
        localStorage.setItem('md_user', JSON.stringify(localUser));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Keçərsiz və ya müddəti bitmiş kod.');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Yeni şifrələr üst-üstə düşmür.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        }),
      });

      if (res.ok) {
        toast.success('Password updated.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Şifrə yenilənə bilmədi.');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigure2FA = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile/two-factor', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTwoFactorStatus('pending');
        setQrCodeSvg(data.qr_code_svg);
        setSecretKey(data.secret_key);
        toast.success('2FA konfiqurasiyası başladıldı.');
      }
    } catch (_) {}
    setLoading(false);
  };

  const handleValidate2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/profile/two-factor/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ code: otpCode }),
      });
      if (res.ok) {
        const data = await res.json();
        setTwoFactorStatus('enabled');
        setRecoveryCodes(data.recovery_codes || []);
        toast.success('Two factor authentication confirmed and enabled successfully.');
      } else {
        toast.error('Keçərsiz OTP kodu.');
      }
    } catch (_) {}
    setLoading(false);
  };

  const handleDisable2FA = async () => {
    if (!confirm('2FA deaktiv edilsin?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/profile/two-factor', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
      });
      if (res.ok) {
        setTwoFactorStatus('disabled');
        setRecoveryCodes([]);
        toast.success('Two factor authentication is disabled.');
      }
    } catch (_) {}
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 text-text-main">
      <h1 className="text-2xl font-bold tracking-wide text-text-main">
        Profile Settings
      </h1>
      
      <ProfileNavbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Form */}
        <div className="bg-bg-secondary border border-border-main rounded-xl p-6 space-y-6 transition-colors duration-200">
          <div className="flex justify-between items-center border-b border-border-main pb-4">
            <h2 className="text-base font-bold text-text-main flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-400" />
              General
            </h2>
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-1.5 bg-bg-tertiary hover:bg-opacity-80 text-text-main border border-border-main rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs text-text-muted font-semibold mb-2">NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted font-semibold mb-2">EMAIL</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-bg-tertiary bg-opacity-40 border border-border-main rounded-lg px-4 py-2 text-sm text-text-muted focus:outline-none cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowEmailChange(!showEmailChange)}
                  disabled={showVerification}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  Change Email
                </button>
              </div>
            </div>
          </form>

          {/* Email Change Step 1 */}
          {showEmailChange && (
            <form onSubmit={handleRequestEmailChange} className="bg-bg-tertiary bg-opacity-30 p-4 border border-border-main rounded-lg space-y-3">
              <label className="block text-xs text-text-muted font-semibold">NEW EMAIL ADDRESS</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-1.5 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                  required
                />
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer">
                  Send Code
                </button>
              </div>
              <p className="text-[10px] text-indigo-400 font-bold">A verification code will be sent to your new email address.</p>
            </form>
          )}

          {/* Email Change Step 2 (Verification) */}
          {showVerification && (
            <form onSubmit={handleVerifyEmailChange} className="bg-bg-tertiary bg-opacity-30 p-4 border border-border-main rounded-lg space-y-3">
              <label className="block text-xs text-text-muted font-semibold">VERIFICATION CODE (6 DIGITS)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerificationCode(e.target.value)}
                  className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-1.5 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                  required
                />
                <button type="submit" className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer">
                  Verify & Update
                </button>
              </div>
              <p className="text-[10px] text-amber-500 font-bold">Verification code sent to {newEmail}. Valid for 10 minutes.</p>
            </form>
          )}

          <hr className="border-border-main" />

          {/* Change Password */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-text-main flex items-center gap-2">
                <Key className="h-4 w-4 text-indigo-400" />
                Change Password
              </h2>
              <button
                onClick={handleUpdatePassword}
                className="px-4 py-1.5 bg-bg-tertiary hover:bg-opacity-80 text-text-main border border-border-main rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
            <p className="text-xs text-amber-500 font-bold">Resetting the password will logout all sessions.</p>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted font-semibold mb-2">CURRENT PASSWORD</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-text-muted font-semibold mb-2">NEW PASSWORD</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted font-semibold mb-2">NEW PASSWORD AGAIN</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 2FA Panel (Two-factor Authentication) */}
        <div className="bg-bg-secondary border border-border-main rounded-xl p-6 space-y-6 transition-colors duration-200">
          <h2 className="text-base font-bold text-text-main flex items-center gap-2 border-b border-border-main pb-4">
            <Lock className="h-5 w-5 text-indigo-400" />
            Two-factor Authentication
          </h2>

          {twoFactorStatus === 'disabled' && (
            <div className="space-y-4">
              <p className="text-sm text-text-muted">Two-factor authentication adds an extra layer of security to your account.</p>
              <button
                onClick={handleConfigure2FA}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Configure
              </button>
            </div>
          )}

          {twoFactorStatus === 'pending' && (
            <div className="space-y-6">
              <p className="text-sm text-text-main">
                Please finish configuring two factor authentication below. Read the QR code or enter the secret key manually.
              </p>

              {/* QR Code Svg Box */}
              <div className="flex justify-center bg-white p-4 rounded-lg w-64 h-64 mx-auto" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />

              <div className="space-y-2 max-w-sm mx-auto">
                <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="w-full text-center py-2 bg-bg-tertiary hover:bg-opacity-80 text-text-main border border-border-main rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {showSecret ? 'Hide Secret Key' : 'Show Secret Key'}
                </button>
                
                {showSecret && (
                  <div className="flex items-center gap-2 bg-bg-tertiary bg-opacity-30 p-3 border border-border-main rounded-lg">
                    <code className="text-xs text-indigo-400 select-all flex-1 truncate">{secretKey}</code>
                    <button onClick={() => copyToClipboard(secretKey)} className="text-text-muted hover:text-text-main">
                      {copiedKey ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>

              {/* OTP Form */}
              <form onSubmit={handleValidate2FA} className="flex items-end gap-3 max-w-sm mx-auto">
                <div className="flex-1">
                  <label className="block text-xs text-text-muted font-semibold mb-2">ONE TIME (OTP) CODE</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-bg-tertiary border border-border-main rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:border-indigo-500"
                    placeholder="123456"
                    required
                  />
                </div>
                <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer">
                  Validate 2FA
                </button>
              </form>
            </div>
          )}

          {twoFactorStatus === 'enabled' && (
            <div className="space-y-6">
              <p className="text-sm text-green-400 font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Two factor authentication is enabled.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleDisable2FA}
                  className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Disable
                </button>
              </div>


              {recoveryCodes.length > 0 && (
                <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-4 space-y-3">
                  <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Recovery Codes</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Store these recovery codes in a secure location. They can be used to access your account if you lose your 2FA device.</p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs text-indigo-400">
                    {recoveryCodes.map((code, idx) => (
                      <div key={idx} className="bg-[var(--bg-secondary)] p-1.5 border border-[var(--border-color)] rounded text-center select-all">{code}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}