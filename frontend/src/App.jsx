import { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ── API helpers ────────────────────────────────────────────────────────────────
const api = {
  async post(path, body, token) {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Request failed");
    return res.json();
  },
  async get(path, token) {
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Request failed");
    return res.json();
  },
  async uploadForm(path, formData, token) {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Upload failed");
    return res.json();
  },
};

// ── Gauge component ────────────────────────────────────────────────────────────
function ScoreGauge({ score, size = 120 }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const filled = (score / 100) * arc;
  
  // High contrast colors
  const color = score >= 75 ? "var(--success)" : score >= 50 ? "var(--warning)" : "var(--danger)";
  
  // Dynamic sizing based on provided size prop
  const isSmall = size < 100;
  const textSizeClass = isSmall ? "text-lg" : "text-3xl";
  const labelSize = isSmall ? "8px" : "10px";
  const marginTop = isSmall ? "-4px" : "-10px";
  
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border-color)" strokeWidth="8"
          strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round"
          strokeDashoffset={circ * 0.125} transform="rotate(-225 60 60)" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round"
          strokeDashoffset={circ * 0.125} transform="rotate(-225 60 60)"
          style={{ transition: "stroke-dasharray 1s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop }}>
        <span className={`${textSizeClass} font-bold`} style={{ color }}>{score}%</span>
        <span className="uppercase-label" style={{ fontSize: labelSize }}>Match</span>
      </div>
    </div>
  );
}

// ── Skill chip ─────────────────────────────────────────────────────────────────
function Chip({ label, type }) {
  return (
    <span className={`chip ${type || ''}`}>
      {label}
    </span>
  );
}

// ── Mini bar for admin ─────────────────────────────────────────────────────────
function MiniBar({ label, value, max }) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-secondary">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
      <div className="progress-bg">
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value }) {
  return (
    <div className="card flex-col gap-2">
      <div className="uppercase-label">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("login"); // login | register | app | admin
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
  const [tab, setTab] = useState("analyze"); // analyze | history
  const [adminTab, setAdminTab] = useState("stats");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Auth state
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Analyze state
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [inputMode, setInputMode] = useState("text"); // text | file
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");

  // History
  const [history, setHistory] = useState([]);
  const [histLoading, setHistLoading] = useState(false);

  // Admin
  const [stats, setStats] = useState(null);
  const [skillDemand, setSkillDemand] = useState(null);
  const [adminError, setAdminError] = useState("");

  const fileRef = useRef();

  useEffect(() => {
    if (token) setView("app");
    applyTheme(theme);
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // ── Auth ──
  const handleAuth = async (mode) => {
    setAuthLoading(true); setAuthError("");
    try {
      const data = mode === "login"
        ? await api.post("/auth/login", { email: authForm.email, password: authForm.password })
        : await api.post("/auth/register", authForm);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      setToken(data.token); setUserName(data.name); setView("app");
    } catch (e) { setAuthError(e.message); }
    setAuthLoading(false);
  };

  const logout = () => {
    localStorage.clear(); setToken(""); setUserName(""); setView("login");
    setResult(null); setHistory([]);
  };

  // ── Analyze ──
  const handleAnalyze = async () => {
    if (!jdText.trim()) { setAnalyzeError("Please enter a job description."); return; }
    if (inputMode === "text" && !resumeText.trim()) { setAnalyzeError("Please enter your resume text."); return; }
    if (inputMode === "file" && !uploadFile) { setAnalyzeError("Please select a file."); return; }

    setAnalyzing(true); setAnalyzeError(""); setResult(null);
    try {
      let data;
      if (inputMode === "file") {
        const fd = new FormData();
        fd.append("job_description", jdText);
        fd.append("file", uploadFile);
        data = await api.uploadForm("/analyze/upload", fd, token);
      } else {
        data = await api.post("/analyze/text", { resume_text: resumeText, job_description: jdText }, token);
      }
      setResult(data);
    } catch (e) { setAnalyzeError(e.message); }
    setAnalyzing(false);
  };

  const loadHistory = async () => {
    setHistLoading(true);
    try { setHistory(await api.get("/analyze/history", token)); }
    catch (e) { /* silent */ }
    setHistLoading(false);
  };

  useEffect(() => { if (tab === "history" && token) loadHistory(); }, [tab]);

  // ── Admin ──
  const loadAdmin = async () => {
    setAdminError("");
    try {
      const [s, d] = await Promise.all([
        api.get("/admin/stats", token),
        api.get("/admin/skill-demand", token),
      ]);
      setStats(s); setSkillDemand(d);
    } catch (e) { setAdminError(e.message); }
  };

  useEffect(() => { if (view === "admin" && token) loadAdmin(); }, [view]);

  // Shared Header
  const Header = ({ title, showTabs = true }) => (
    <nav className="nav-header">
      <div className="container flex items-center justify-between" style={{ height: '64px' }}>
        <div className="flex items-center gap-2">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
           <span className="font-semibold">{title || "ResumeAI"}</span>
           {view === 'admin' && <span className="text-xs font-semibold" style={{ background: 'var(--text-primary)', color: 'var(--bg-color)', padding: '2px 6px', borderRadius: '4px' }}>Admin</span>}
        </div>
        
        {showTabs && view !== 'admin' && (
          <div className="flex gap-2">
            <button className={`btn btn-ghost ${tab === 'analyze' ? 'active' : ''}`} onClick={() => setTab("analyze")}>Analyze</button>
            <button className={`btn btn-ghost ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab("history")}>History</button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
          
          {view === 'admin' ? (
             <button className="btn btn-ghost" onClick={() => setView("app")}>Back to App</button>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setView("admin")}>Admin</button>
            </>
          )}
          <button className="btn btn-secondary" onClick={logout}>Sign out</button>
        </div>
      </div>
    </nav>
  );

  // ── RENDER: Auth ──────────────────────────────────────────────────────────────
  if (view === "login" || view === "register") {
    const isReg = view === "register";
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: "100vh", position: 'relative' }}>
         <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
         </div>

        <div style={{ width: "100%", maxWidth: "380px", padding: "0 1.5rem" }}>
          <div className="mb-8" style={{ textAlign: "center" }}>
            <svg style={{ margin: '0 auto 1rem' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h1 className="text-2xl">ResumeAI</h1>
            <p className="text-secondary text-sm mt-2">AI-powered resume analysis</p>
          </div>

          <div className="card animate-fade-in">
            <h2 className="text-xl mb-6 text-center">
              {isReg ? "Create an account" : "Welcome back"}
            </h2>

            {isReg && (
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <input className="input-field" placeholder="Jane Doe"
                  value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} />
              </div>
            )}
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Email address</label>
              <input className="input-field" type="email" placeholder="you@example.com"
                value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} />
            </div>
            <div className="mb-6">
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input className="input-field" type="password" placeholder="••••••••"
                value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleAuth(isReg ? "register" : "login")} />
            </div>
            
            {authError && <div className="mb-4 text-sm" style={{ color: "var(--danger)" }}>{authError}</div>}
            
            <button className="btn btn-primary" style={{ width: "100%" }}
              onClick={() => handleAuth(isReg ? "register" : "login")} disabled={authLoading}>
              {authLoading ? "Processing…" : isReg ? "Sign up" : "Sign in"}
            </button>
          </div>

          <div className="text-center mt-6 text-sm text-secondary">
            {isReg ? "Already have an account? " : "Don't have an account? "}
            <button style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", fontWeight: 600, padding: 0 }}
              onClick={() => { setView(isReg ? "login" : "register"); setAuthError(""); }}>
              {isReg ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RENDER: Admin Dashboard ───────────────────────────────────────────────────
  if (view === "admin") {
    const maxMissing = skillDemand?.top_missing?.[0]?.[1] || 1;
    const maxMatched = skillDemand?.top_matched?.[0]?.[1] || 1;
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header title="ResumeAI" showTabs={false} />

        <div className="container mt-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl">Admin Overview</h1>
            <p className="text-secondary mt-2">Platform statistics and skill demand analytics.</p>
          </div>

          {adminError && <div className="mb-6 text-sm" style={{ color: "var(--danger)" }}>{adminError}</div>}

          {stats && (
            <div className="grid grid-cols-3 mb-8">
              <StatCard label="Total Users" value={stats.total_users} />
              <StatCard label="Total Resumes" value={stats.total_resumes} />
              <StatCard label="Avg Match Score" value={`${stats.average_score}%`} />
            </div>
          )}

          {stats && (
            <div className="card mb-8">
              <div className="uppercase-label mb-4">Score Distribution</div>
              {Object.entries(stats.score_distribution).map(([k, v]) => (
                <MiniBar key={k} label={k} value={v} max={stats.total_resumes || 1} />
              ))}
            </div>
          )}

          {skillDemand && (
            <div className="grid grid-cols-2">
              <div className="card">
                <div className="uppercase-label mb-4">Top Matched Skills</div>
                {skillDemand.top_matched.map(([skill, count]) => (
                  <MiniBar key={skill} label={skill} value={count} max={maxMatched} />
                ))}
              </div>
              <div className="card">
                <div className="uppercase-label mb-4">Top Missing Skills</div>
                {skillDemand.top_missing.map(([skill, count]) => (
                  <MiniBar key={skill} label={skill} value={count} max={maxMissing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RENDER: Main App ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />

      <div className="container mt-8 animate-fade-in" style={{ maxWidth: '960px' }}>
        
        {/* ── Analyze Tab ── */}
        {tab === "analyze" && (
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-3xl">Analyze Resume</h1>
              <p className="text-secondary mt-2">Upload your resume and a job description to get instant feedback.</p>
            </div>

            <div className="grid grid-cols-2 mb-6">
              {/* Resume Input */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg">Your Resume</h2>
                  <div className="flex gap-2">
                    <button className={`btn btn-ghost text-xs ${inputMode === 'text' ? 'active' : ''}`} style={{ padding: '0.25rem 0.5rem' }} onClick={() => setInputMode("text")}>Text</button>
                    <button className={`btn btn-ghost text-xs ${inputMode === 'file' ? 'active' : ''}`} style={{ padding: '0.25rem 0.5rem' }} onClick={() => setInputMode("file")}>File</button>
                  </div>
                </div>
                {inputMode === "text" ? (
                  <textarea className="input-field" placeholder="Paste your resume content here..."
                    value={resumeText} onChange={e => setResumeText(e.target.value)} />
                ) : (
                  <div 
                    onClick={() => fileRef.current.click()} 
                    className={`upload-zone ${uploadFile ? 'active' : ''}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    <span className="text-sm font-medium">{uploadFile ? uploadFile.name : "Select PDF or TXT file"}</span>
                    {!uploadFile && <span className="text-xs text-tertiary mt-1">or click to browse</span>}
                    <input ref={fileRef} type="file" accept=".pdf,.txt" style={{ display: "none" }}
                      onChange={e => setUploadFile(e.target.files[0])} />
                  </div>
                )}
              </div>

              {/* JD Input */}
              <div className="card">
                <h2 className="text-lg mb-4">Job Description</h2>
                <textarea className="input-field" style={{ minHeight: '170px' }}
                  placeholder="Paste the job description here..."
                  value={jdText} onChange={e => setJdText(e.target.value)} />
              </div>
            </div>

            {analyzeError && <div className="mb-6 text-sm" style={{ color: "var(--danger)", textAlign: 'center' }}>{analyzeError}</div>}

            <div className="flex justify-center mb-12">
              <button className="btn btn-primary" style={{ padding: "0.75rem 2.5rem" }}
                onClick={handleAnalyze} disabled={analyzing}>
                {analyzing ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="animate-fade-in pb-12">
                <div className="card flex items-center gap-8 mb-6">
                  <ScoreGauge score={result.score} />
                  <div className="flex-col" style={{ flex: 1 }}>
                    <h2 className="text-xl mb-4">Analysis Results</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex-col">
                        <span className="uppercase-label">Tech Match</span>
                        <span className="text-2xl font-bold">{result.tech_score}%</span>
                      </div>
                      <div className="flex-col">
                        <span className="uppercase-label">Soft Skills</span>
                        <span className="text-2xl font-bold">{result.soft_score}%</span>
                      </div>
                      <div className="flex-col">
                        <span className="uppercase-label">Experience</span>
                        <span className="text-2xl font-bold">{result.experience_years}+ yrs</span>
                      </div>
                    </div>
                    {result.contact?.email && (
                      <div className="text-sm text-secondary pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                        {result.contact.email} {result.contact.phone && ` • ${result.contact.phone}`}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <div className="card">
                    <div className="uppercase-label mb-4">Matched ({result.matched_skills.length})</div>
                    <div className="flex flex-wrap gap-2">{result.matched_skills.map(s => <Chip key={s} label={s} type="match" />)}</div>
                    {result.matched_skills.length === 0 && <span className="text-sm text-tertiary">None found</span>}
                  </div>
                  <div className="card">
                    <div className="uppercase-label mb-4">Missing ({result.missing_skills.length})</div>
                    <div className="flex flex-wrap gap-2">{result.missing_skills.map(s => <Chip key={s} label={s} type="missing" />)}</div>
                    {result.missing_skills.length === 0 && <span className="text-sm text-tertiary">None missing</span>}
                  </div>
                  <div className="card">
                    <div className="uppercase-label mb-4">Extra ({result.extra_skills.length})</div>
                    <div className="flex flex-wrap gap-2">{result.extra_skills.map(s => <Chip key={s} label={s} />)}</div>
                    {result.extra_skills.length === 0 && <span className="text-sm text-tertiary">None</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── History Tab ── */}
        {tab === "history" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl">History</h1>
              <p className="text-secondary mt-2">Your recent analysis results.</p>
            </div>

            {histLoading && <div className="text-secondary text-center py-8">Loading...</div>}

            {!histLoading && history.length === 0 && (
              <div className="card text-center py-16">
                <div className="text-secondary mb-2">No history available</div>
                <div className="text-sm text-tertiary">Run an analysis to see your past results here.</div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {history.map((r) => (
                <div key={r._id} className="card flex items-center gap-6">
                  <ScoreGauge score={r.score} size={70} />
                  <div className="flex-col" style={{ flex: 1 }}>
                    <div className="flex gap-4 mb-2">
                      <span className="text-sm text-secondary">Tech: <span className="font-semibold text-primary">{r.tech_score}%</span></span>
                      <span className="text-sm text-secondary">Soft: <span className="font-semibold text-primary">{r.soft_score}%</span></span>
                      <span className="text-sm text-secondary">Exp: <span className="font-semibold text-primary">{r.experience_years}+</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(r.matched_skills || []).slice(0, 4).map(s => <Chip key={s} label={s} type="match" />)}
                      {(r.missing_skills || []).slice(0, 2).map(s => <Chip key={s} label={s} type="missing" />)}
                    </div>
                    <div className="text-xs text-tertiary">{r.created_at ? new Date(r.created_at).toLocaleString() : ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
