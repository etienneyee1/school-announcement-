<template>
  <div class="landing">
    <!-- HERO -->
    <div class="landing-bg">
      <div class="bg-grid"></div>
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-orb bg-orb-3"></div>
    </div>

    <!-- NAV -->
    <nav class="landing-nav">
      <div class="ln-logo">
        <div class="ln-logo-icon">📢</div>
        <div class="ln-logo-text">Edu<span>Announce</span></div>
      </div>
      <ul class="ln-nav-links">
        <li><a>Features</a></li>
        <li><a>For Schools</a></li>
        <li><a>Roles</a></li>
        <li><a>Testimonials</a></li>
      </ul>
      <div class="ln-nav-actions">
        <button class="ln-btn-ghost" @click="$router.push('/auth')">Sign In</button>
        <button class="ln-btn-solid" @click="$router.push('/auth')">Get Started Free</button>
      </div>
    </nav>

    <!-- HERO CONTENT -->
    <div class="landing-hero">
      <div class="hero-left">
        <div class="hero-eyebrow">
          <div class="hero-eyebrow-dot"></div>
          Built for Rwandan Schools
        </div>
        <h1 class="hero-headline">
          <span class="line-break">Every Notice,</span>
          <em>Delivered</em>
          <span class="line-break">Instantly.</span>
        </h1>
        <p class="hero-sub">
          EduAnnounce brings together students, teachers, and parents under one seamless communication hub — so no important announcement ever gets missed.
        </p>
        <div class="hero-cta-row">
          <button class="hero-cta-primary" @click="$router.push('/auth')">Start for Free →</button>
          <button class="hero-cta-secondary">
            <div class="cta-play-icon">▶</div>
            Watch Demo
          </button>
        </div>
        <div class="hero-social-proof">
          <div class="proof-avatars">
            <div class="proof-avatar" style="background:#1e2d50">MU</div>
            <div class="proof-avatar" style="background:#2d3f6b">JB</div>
            <div class="proof-avatar" style="background:#162040">AK</div>
            <div class="proof-avatar" style="background:#0d1a35">PH</div>
            <div class="proof-avatar" style="background:#1e3050">AM</div>
          </div>
          <div>
            <div class="proof-stars">★★★★★</div>
            <div class="proof-text">Trusted by <strong>50+ schools</strong> across Rwanda</div>
          </div>
        </div>
      </div>

      <!-- APP PREVIEW MOCKUP -->
      <div class="hero-right">
        <div class="app-preview">
          <div class="app-preview-topbar">
            <div class="preview-dots">
              <div class="preview-dot r"></div>
              <div class="preview-dot y"></div>
              <div class="preview-dot g"></div>
            </div>
            <div class="preview-topbar-title">eduannounce.rw — Dashboard</div>
          </div>
          <div class="app-preview-body">
            <div class="preview-sidebar">
              <div style="width:36px;height:36px;background:rgba(232,184,75,0.15);border-radius:8px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:14px;">📢</div>
              <div class="preview-nav-dot active"></div>
              <div class="preview-nav-dot w80"></div>
              <div class="preview-nav-dot w60"></div>
              <div class="preview-nav-dot w80"></div>
              <div style="flex:1"></div>
              <div class="preview-nav-dot w40"></div>
            </div>
            <div class="preview-main-content">
              <div style="font-size:10px;font-weight:600;color:rgba(255,255,255,0.4);margin-bottom:10px;letter-spacing:0.5px;">DASHBOARD OVERVIEW</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <div class="ps-label">TOTAL</div>
                  <div class="ps-val">6</div>
                  <div class="ps-bar gold"></div>
                </div>
                <div class="preview-stat">
                  <div class="ps-label">VIEWS</div>
                  <div class="ps-val">4.2k</div>
                  <div class="ps-bar blue"></div>
                </div>
                <div class="preview-stat">
                  <div class="ps-label">URGENT</div>
                  <div class="ps-val">1</div>
                  <div class="ps-bar green"></div>
                </div>
              </div>
              <div style="font-size:9px;color:rgba(255,255,255,0.3);margin-bottom:8px;letter-spacing:0.5px;">RECENT ANNOUNCEMENTS</div>
              <div class="preview-ann-list">
                <div class="preview-ann">
                  <div class="preview-ann-stripe" style="background:#b83232"></div>
                  <div class="preview-ann-info">
                    <div class="preview-ann-title">School Closure — Rainfall Warning</div>
                    <div class="preview-ann-meta">Dr. M. Uwimana · Jun 4</div>
                  </div>
                  <div class="preview-ann-badge" style="background:rgba(184,50,50,0.2);color:#f08080">URGENT</div>
                </div>
                <div class="preview-ann">
                  <div class="preview-ann-stripe" style="background:#2d7a4f"></div>
                  <div class="preview-ann-info">
                    <div class="preview-ann-title">Exam Schedule — Term 2</div>
                    <div class="preview-ann-meta">Mr. P. Habimana · May 28</div>
                  </div>
                  <div class="preview-ann-badge" style="background:rgba(45,122,79,0.2);color:#4aba7a">ACADEMIC</div>
                </div>
                <div class="preview-ann">
                  <div class="preview-ann-stripe" style="background:#1a5fa0"></div>
                  <div class="preview-ann-info">
                    <div class="preview-ann-title">Annual Cultural Day — June 21</div>
                    <div class="preview-ann-meta">Ms. A. Mukandayisenga · May 20</div>
                  </div>
                  <div class="preview-ann-badge" style="background:rgba(26,95,160,0.2);color:#4a9fd4">EVENT</div>
                </div>
                <div class="preview-ann">
                  <div class="preview-ann-stripe" style="background:#b87c15"></div>
                  <div class="preview-ann-info">
                    <div class="preview-ann-title">Library Hours Extended</div>
                    <div class="preview-ann-meta">Mrs. J. Uwera · Jun 2</div>
                  </div>
                  <div class="preview-ann-badge" style="background:rgba(184,124,21,0.2);color:#e8a030">GENERAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating badges -->
        <div class="preview-float float-1">
          <div class="float-icon">⚡</div>
          <div class="float-text">
            <strong>Urgent Alert Sent</strong>
            <span>1,240 students notified</span>
          </div>
        </div>
        <div class="preview-float float-2">
          <div class="float-icon">✅</div>
          <div class="float-text">
            <strong>Published</strong>
            <span>Exam timetable live</span>
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURES -->
    <section class="landing-features">
      <div class="section-label">Why EduAnnounce</div>
      <h2 class="section-title">Everything your school<br><em>needs to communicate</em></h2>
      <p class="section-sub">From urgent alerts to cultural events — one platform keeps everyone informed, always.</p>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-wrap fi-gold">📢</div>
          <div class="feature-title">Multi-Type Announcements</div>
          <div class="feature-desc">Categorize notices as Urgent, Academic, Events, Holidays, or General — with color-coded visual indicators for instant recognition.</div>
          <div class="feature-tag">→ 5 announcement types</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap fi-blue">🛡</div>
          <div class="feature-title">Role-Based Access</div>
          <div class="feature-desc">Admins publish and manage, teachers interact with academic content, students receive and comment. Every role sees exactly what they need.</div>
          <div class="feature-tag">→ 3 distinct roles</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap fi-green">💬</div>
          <div class="feature-title">Community Comments</div>
          <div class="feature-desc">Foster dialogue — parents ask questions, teachers clarify, students respond. Real conversation around every announcement.</div>
          <div class="feature-tag">→ Live interaction</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap fi-red">⚡</div>
          <div class="feature-title">Instant Urgent Alerts</div>
          <div class="feature-desc">When it matters most — weather closures, safety notices — urgent announcements are pinned and highlighted across all views.</div>
          <div class="feature-tag">→ Priority broadcasting</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap fi-purple">📊</div>
          <div class="feature-title">Analytics Dashboard</div>
          <div class="feature-desc">Track views, engagement, and reach per announcement. Understand what resonates with your school community.</div>
          <div class="feature-tag">→ View & engagement metrics</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap fi-teal">🔔</div>
          <div class="feature-title">Smart Notifications</div>
          <div class="feature-desc">Email, SMS, and push notification preferences — each user controls how they stay informed on their own terms.</div>
          <div class="feature-tag">→ Email · SMS · Push</div>
        </div>
      </div>
    </section>

    <!-- ROLES -->
    <section class="landing-roles">
      <div class="section-label" style="color:rgba(232,184,75,0.7)">Built for Everyone</div>
      <h2 class="section-title" style="color:var(--white)">One system, <em style="color:var(--gold)">three perspectives</em></h2>
      <p class="section-sub" style="color:rgba(255,255,255,0.5)">Whether you run the school, teach in it, or learn in it — EduAnnounce is designed with your workflow in mind.</p>
      <div class="roles-grid">
        <div class="role-card admin-card">
          <div class="role-avatar-big ra-gold">🛡</div>
          <div class="role-name">Administrators</div>
          <div class="role-desc">Full control over the school's communication. Publish, edit, pin, and delete announcements. Manage users and track engagement metrics.</div>
          <ul class="role-perks">
            <li class="role-perk"><span class="perk-check">✦</span>Create & publish all announcement types</li>
            <li class="role-perk"><span class="perk-check">✦</span>Pin urgent notices to top</li>
            <li class="role-perk"><span class="perk-check">✦</span>Full user management panel</li>
            <li class="role-perk"><span class="perk-check">✦</span>Analytics & engagement insights</li>
            <li class="role-perk"><span class="perk-check">✦</span>Draft, schedule, or publish instantly</li>
          </ul>
        </div>
        <div class="role-card teacher-card">
          <div class="role-avatar-big ra-blue">👩🏫</div>
          <div class="role-name">Teachers</div>
          <div class="role-desc">Stay on top of academic schedules, events, and school news. Engage with your students through comments on relevant notices.</div>
          <ul class="role-perks">
            <li class="role-perk"><span class="perk-check" style="color:#4a9fd4">✦</span>View all published announcements</li>
            <li class="role-perk"><span class="perk-check" style="color:#4a9fd4">✦</span>Comment and respond on posts</li>
            <li class="role-perk"><span class="perk-check" style="color:#4a9fd4">✦</span>Filter by academic or event type</li>
            <li class="role-perk"><span class="perk-check" style="color:#4a9fd4">✦</span>Customize notification preferences</li>
            <li class="role-perk"><span class="perk-check" style="color:#4a9fd4">✦</span>Personal profile management</li>
          </ul>
        </div>
        <div class="role-card student-card">
          <div class="role-avatar-big ra-green">🎓</div>
          <div class="role-name">Students</div>
          <div class="role-desc">Never miss an exam schedule, school event, or urgent notice again. Your school's complete communication, always in one place.</div>
          <ul class="role-perks">
            <li class="role-perk"><span class="perk-check" style="color:#4aba7a">✦</span>Real-time access to all notices</li>
            <li class="role-perk"><span class="perk-check" style="color:#4aba7a">✦</span>Search and filter announcements</li>
            <li class="role-perk"><span class="perk-check" style="color:#4aba7a">✦</span>Ask questions via comments</li>
            <li class="role-perk"><span class="perk-check" style="color:#4aba7a">✦</span>Get SMS/email/push alerts</li>
            <li class="role-perk"><span class="perk-check" style="color:#4aba7a">✦</span>Multi-language support (EN/RW/FR)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="landing-stats">
      <div class="stats-inner">
        <div>
          <div class="lstat-val">50+</div>
          <div class="lstat-label">Schools Using EduAnnounce</div>
        </div>
        <div class="lstat-divider"></div>
        <div>
          <div class="lstat-val">12k</div>
          <div class="lstat-label">Students & Parents Reached</div>
        </div>
        <div class="lstat-divider"></div>
        <div>
          <div class="lstat-val">98%</div>
          <div class="lstat-label">Message Open Rate</div>
        </div>
        <div class="lstat-divider"></div>
        <div>
          <div class="lstat-val">3min</div>
          <div class="lstat-label">Average Time to First Notice</div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="landing-testimonials">
      <div class="section-label">What Schools Say</div>
      <h2 class="section-title">Loved by the <em>whole school community</em></h2>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="tcard-stars">★★★★★</div>
          <div class="tcard-quote">Before EduAnnounce, parents were calling the front desk constantly for updates. Now everyone knows exactly what's happening the moment we publish a notice.</div>
          <div class="tcard-author">
            <div class="tcard-avatar">MU</div>
            <div>
              <div class="tcard-name">Dr. Marie Uwimana</div>
              <div class="tcard-role">Headmistress, EduBright Academy, Kigali</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="tcard-stars">★★★★★</div>
          <div class="tcard-quote">The exam schedule feature is a game-changer. My students always know exactly what's coming, and the urgent alert system gives us peace of mind during closures.</div>
          <div class="tcard-author">
            <div class="tcard-avatar">PH</div>
            <div>
              <div class="tcard-name">Mr. Patrick Habimana</div>
              <div class="tcard-role">Academic Registrar, Kigali Day School</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="tcard-stars">★★★★★</div>
          <div class="tcard-quote">I used to miss important events because of poor communication. Now I get a notification the moment anything is posted. The cultural day announcement even had photos!</div>
          <div class="tcard-author">
            <div class="tcard-avatar">TI</div>
            <div>
              <div class="tcard-name">Thierry Iradukunda</div>
              <div class="tcard-role">S6 Student, EduBright Academy</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="landing-cta">
      <div class="cta-eyebrow">Get started today</div>
      <h2 class="cta-title">Ready to transform how<br>your school <em>communicates?</em></h2>
      <p class="cta-sub">Join over 50 Rwandan schools already using EduAnnounce to keep their communities informed and connected.</p>
      <div class="cta-buttons">
        <button class="hero-cta-primary" @click="$router.push('/auth')">Launch EduAnnounce →</button>
        <button class="ln-btn-ghost" @click="$router.push('/auth')">Sign In to Existing School</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="landing-footer">
      <div class="footer-logo">EduAnnounce</div>
      <div class="footer-copy">© 2025 EduAnnounce · Built for EduBright Academy, Kigali, Rwanda</div>
      <div class="footer-links">
        <div class="footer-link">Privacy</div>
        <div class="footer-link">Terms</div>
        <div class="footer-link">Support</div>
        <div class="footer-link">Contact</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
