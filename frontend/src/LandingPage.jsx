import React, { useState } from "react";

export default function LandingPage({ setView, theme, toggleTheme }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What is an AI Resume Analyzer?", a: "Our AI Resume Analyzer uses advanced natural language processing to compare your resume against a specific job description. It identifies missing skills, highlights your strengths, and provides a match score to help you tailor your application for maximum impact." },
    { q: "How do I get a good score?", a: "To get a good score, ensure your resume includes the key skills and keywords mentioned in the job description. Our tool will highlight exactly which skills are missing so you can add relevant experience to your resume." },
    { q: "Is my data secure?", a: "Yes, your privacy is our priority. We process your resume securely and do not share your personal information or resume content with third parties." },
    { q: "Can I use it for multiple jobs?", a: "Absolutely! We recommend tailoring your resume for every job application. You can upload different job descriptions and check your resume against each one to optimize your chances." }
  ];

  return (
    <div className="app-wrap">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            ResumeAI
          </div>
          
          <div className="nav-tabs hide-mobile">
            
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
            <button className="btn btn-ghost" onClick={() => setView("login")}>Log in</button>
            <button className="btn btn-primary" onClick={() => setView("register")}>Sign up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="grid grid-2 items-center gap-8">
            <div className="animate-in">
              <div className="hero-badge">
                <div className="hero-badge-dot"></div>
                AI-Powered Analysis
              </div>
              <h1 className="hero-title">
                Free Resume <br/>
                <span className="gradient-text">Checker</span>
              </h1>
              <p className="hero-desc">
                Is your resume good enough? Find out now. Our AI scans your resume against any job description to give you actionable feedback and help you land more interviews.
              </p>
              
              <div className="hero-actions">
                <button className="btn btn-primary large" onClick={() => setView("register")}>
                  Analyze My Resume
                </button>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Free to use
                </div>
              </div>

              <div className="hero-stats">
                <div>
                  <div className="hero-stat-num">50k+</div>
                  <div className="hero-stat-label">Resumes Analyzed</div>
                </div>
                <div>
                  <div className="hero-stat-num">98%</div>
                  <div className="hero-stat-label">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div className="hero-mockup fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="hero-mockup-bar">
                <div className="mockup-dot" style={{ background: '#ff5f56' }}></div>
                <div className="mockup-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="mockup-dot" style={{ background: '#27c93f' }}></div>
              </div>
              <div className="p-6 bg-surface" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-sm font-semibold mb-1">Resume Match Score</div>
                    <div className="text-xs text-secondary">Software Engineer vs Your Resume</div>
                  </div>
                  <div style={{ position: 'relative', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="60" height="60" viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0 }}>
                      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
                      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--success)" strokeWidth="8" strokeDasharray="254 84" strokeLinecap="round" />
                    </svg>
                    <span className="font-bold text-success text-sm">78%</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase text-secondary mb-2">Matched Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip match">React</span>
                    <span className="chip match">JavaScript</span>
                    <span className="chip match">Node.js</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-secondary mb-2">Missing Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="chip missing">TypeScript</span>
                    <span className="chip missing">AWS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-badge">How it works</div>
            <h2 className="section-title">Get actionable feedback in seconds</h2>
            <p className="section-desc mx-auto" style={{ margin: '0 auto' }}>Our AI engine analyzes your resume like a recruiter would, identifying key areas for improvement.</p>
          </div>

          <div className="grid grid-3">
            <div className="step-card">
              <div className="step-num">1</div>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
              </div>
              <h3 className="step-title">Upload your resume</h3>
              <p className="step-desc">Upload your current resume in PDF or plain text format to our secure platform.</p>
            </div>
            
            <div className="step-card">
              <div className="step-num">2</div>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              </div>
              <h3 className="step-title">Paste the Job Description</h3>
              <p className="step-desc">Copy and paste the job description for the role you want to apply for.</p>
            </div>

            <div className="step-card">
              <div className="step-num">3</div>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="step-title">Get your match score</h3>
              <p className="step-desc">Our AI instantly compares the two and highlights exactly what you need to change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 items-center gap-12">
            <div>
              <div className="section-badge">Features</div>
              <h2 className="section-title">Beat the ATS systems</h2>
              <p className="section-desc mb-6">Most companies use Applicant Tracking Systems (ATS) to filter resumes before a human ever sees them. Our tool helps you beat the bots.</p>
              
              <ul className="feature-list">
                <li>
                  <div className="feature-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <span><strong>Skill Gap Analysis:</strong> See exactly which skills you are missing from the job description.</span>
                </li>
                <li>
                  <div className="feature-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <span><strong>Instant Feedback:</strong> Get actionable insights in seconds, not days.</span>
                </li>
                <li>
                  <div className="feature-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                  <span><strong>History Tracking:</strong> Keep track of your past analyses and measure improvement.</span>
                </li>
              </ul>
              
              <button className="btn btn-outline mt-8" onClick={() => setView("register")}>Try it now</button>
            </div>
            
            <div className="feature-img">
              <div style={{ background: 'var(--surface)', padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
                <div className="text-sm font-semibold mb-4">Analysis Results</div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-secondary">Tech Skills Match</span>
                    <span className="text-xs font-bold">85%</span>
                  </div>
                  <div className="progress-bg"><div className="progress-bar" style={{ width: '85%' }}></div></div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-secondary">Soft Skills Match</span>
                    <span className="text-xs font-bold">60%</span>
                  </div>
                  <div className="progress-bg"><div className="progress-bar" style={{ width: '60%', background: 'var(--warning)' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-10">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFaq(idx)}>
                  {faq.q}
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className="faq-a">
                  <div className="pt-2">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Articles Placeholder */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Latest Articles</h2>
            <p className="text-secondary">Career advice, resume tips, and interview strategies.</p>
          </div>
          <div className="grid grid-3">
            {[
              { title: "How to tailor your resume for ATS", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80" },
              { title: "The top 10 skills employers want in 2026", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80" },
              { title: "Common resume mistakes to avoid", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" }
            ].map((article, i) => (
              <div key={i} className="card p-0 overflow-hidden" style={{ padding: 0 }}>
                <img src={article.img} alt={article.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                  <a href="#" className="text-accent text-sm font-semibold hover:underline">Read article →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="grid grid-4 gap-8">
            <div style={{ gridColumn: 'span 1' }}>
              <div className="footer-brand flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                ResumeAI
              </div>
              <p className="footer-tagline">AI-powered resume analysis for modern professionals.</p>
            </div>
            
            <div>
              <div className="footer-col-title">Product</div>
              <a href="#" className="footer-link">Resume Check</a>
              <a href="#" className="footer-link">Cover Letter Builder</a>
              <a href="#" className="footer-link">Pricing</a>
            </div>
            
            <div>
              <div className="footer-col-title">Resources</div>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Career Guides</a>
              <a href="#" className="footer-link">Resume Templates</a>
            </div>
            
            <div>
              <div className="footer-col-title">Company</div>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Contact</a>
              <a href="#" className="footer-link">Privacy Policy</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>© 2026 ResumeAI. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
