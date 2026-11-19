import React, { useEffect, useState } from 'react';
import { User, LockKeyhole, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authenticatedUser, startSession } from './session';
import './Login.css';

export default function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const username = import.meta.env.VITE_DEMO_USERNAME;
  const expectedPassword = import.meta.env.VITE_DEMO_PASSWORD;

  useEffect(() => {
    if (authenticatedUser()) window.location.replace('/');
  }, []);

  function submit(event) {
    event.preventDefault();
    setMessage('');

    if (!username || !expectedPassword) {
      setMessageType('error');
      setMessage('Demo login is not configured. Set the credentials in .env.local and restart the app.');
      return;
    }

    if (usernameInput.trim().toLowerCase() !== username.trim().toLowerCase() || password !== expectedPassword) {
      setMessageType('error');
      setMessage('Incorrect username or password.');
      return;
    }

    try {
      startSession(username, remember);
      window.location.replace('/');
    } catch {
      setMessageType('error');
      setMessage('Could not save your login in browser storage. Check your browser settings and try again.');
    }
  }

  function showUnavailableMessage(text) {
    setMessageType('info');
    setMessage(text);
  }

  return (
    <main className="pq-auth-page">
      <div className="pq-auth-landscape" aria-hidden="true" />
      <div className="pq-auth-sunlight" aria-hidden="true" />
      <div className="pq-auth-ball" aria-hidden="true">
        <span className="pq-auth-ball-trail" />
        <span className="pq-auth-ball-body"><i/><i/><i/><i/><i/><i/></span>
      </div>

      <a className="pq-auth-brand" href="/" aria-label="Picklequeue home">
        <span className="pq-auth-brand-icon">p<span /></span>
        <span>picklequeue<span className="pq-auth-brand-dot">.</span></span>
      </a>

      <div className="pq-auth-content">
        <section className="pq-auth-intro" aria-label="Welcome to Picklequeue">
          <div className="pq-auth-eyebrow"><span /> MADE FOR OPEN PLAY</div>
          <h1>More playing.<br/><em>Less waiting.</em></h1>
          <p>Keep your pickleball games moving.</p>
        </section>

        <div className="pq-auth-card-frame">
          <div className="pq-auth-card-back" aria-hidden="true" />
          <div className="pq-auth-star" aria-hidden="true">✳</div>
          <section className="pq-auth-card" aria-labelledby="pq-auth-title">
            <header className="pq-auth-card-header">
              <h2 id="pq-auth-title">Sign in</h2>
              <p>Good to see you again.</p>
            </header>
            <form onSubmit={submit}>
              <div className="pq-auth-field">
                <label htmlFor="pq-auth-username">Username</label>
                <div className="pq-auth-control">
                  <User size={20} aria-hidden="true" />
                  <input id="pq-auth-username" type="text" placeholder="Enter your username" autoComplete="username" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} required />
                </div>
              </div>
              <div className="pq-auth-field">
                <label htmlFor="pq-auth-password">Password</label>
                <div className="pq-auth-control">
                  <LockKeyhole size={20} aria-hidden="true" />
                  <input id="pq-auth-password" type={visible ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button className="pq-auth-visibility" type="button" onClick={() => setVisible(v => !v)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>
                    {visible ? <EyeOff size={21} /> : <Eye size={21} />}
                  </button>
                </div>
              </div>
              <div className="pq-auth-options">
                <label className="pq-auth-remember"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
                <a href="#forgot-password" onClick={e => { e.preventDefault(); showUnavailableMessage('Password recovery is not available in this demo.'); }}>Forgot password?</a>
              </div>
              <button className="pq-auth-submit" type="submit">Sign in <ArrowRight size={21} aria-hidden="true" /></button>
              {message && <p className={`pq-auth-message ${messageType}`} role={messageType === 'error' ? 'alert' : 'status'}>{message}</p>}
            </form>
            <div className="pq-auth-divider"><span>or</span></div>
            <p className="pq-auth-signup">New to Picklequeue? <a href="#register" onClick={e => { e.preventDefault(); showUnavailableMessage('Account registration is not available in this demo.'); }}>Create an account</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
