const portfolioData = {
    developerName: "Your Name",
    socials: [
        { label: "GitHub", href: "https://github.com/", icon: "🐙" },
        { label: "LinkedIn", href: "https://linkedin.com/in/", icon: "🔗" },
        { label: "Twitter", href: "https://twitter.com/", icon: "🐦" }
    ],
    about: {
        text: "Passionate frontend developer focused on accessibility, design systems, and performance.",
        highlights: [
            "5+ years building web apps",
            "React, TypeScript, Next.js",
            "Design systems & accessibility (WCAG)",
            "Performance: Core Web Vitals"
        ]
    },
    skills: [
        { name: "HTML", level: 95, kind: "language" },
        { name: "CSS", level: 92, kind: "language" },
        { name: "JavaScript", level: 90, kind: "language" },
        { name: "TypeScript", level: 85, kind: "language" },
        { name: "React", level: 88, kind: "framework" },
        { name: "Next.js", level: 82, kind: "framework" },
        { name: "Redux Toolkit", level: 78, kind: "framework" },
        { name: "Tailwind CSS", level: 80, kind: "tool" },
        { name: "Vite", level: 75, kind: "tool" },
        { name: "Testing Library", level: 72, kind: "tool" }
    ],
    projects: [
        {
            id: "design-system",
            title: "Design System",
            description: "A scalable component library with tokens, themes, and documentation.",
            tags: ["React", "TypeScript", "Storybook"],
            kind: "design",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
            links: { demo: "#", code: "#" }
        },
        {
            id: "react-dashboard",
            title: "Analytics Dashboard",
            description: "Interactive dashboards with charts, filters, and real-time updates.",
            tags: ["React", "Charts", "API"],
            kind: "react",
            image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
            links: { demo: "#", code: "#" }
        },
        {
            id: "vanilla-effects",
            title: "Scroll Effects",
            description: "Vanilla JS parallax and intersection-based animations.",
            tags: ["Vanilla JS", "IntersectionObserver"],
            kind: "vanilla",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
            links: { demo: "#", code: "#" }
        }
    ]
};

function initializeTheme() {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const saved = localStorage.getItem('theme');
    const themeRoot = document.documentElement;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    if (theme === 'light') themeRoot.classList.add('light');
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            themeRoot.classList.toggle('light');
            localStorage.setItem('theme', themeRoot.classList.contains('light') ? 'light' : 'dark');
        });
    }
}

function setupNavToggle() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        if (!expanded) nav.setAttribute('aria-expanded', 'true');
        else nav.removeAttribute('aria-expanded');
    });
}

function renderHeaderData() {
    document.getElementById('devName').textContent = portfolioData.developerName;
    document.getElementById('footerName').textContent = portfolioData.developerName;
    document.getElementById('year').textContent = String(new Date().getFullYear());
    const socials = document.getElementById('socialLinks');
    socials.innerHTML = portfolioData.socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener">${s.icon} ${s.label}</a>`).join('');
}

function renderAbout() {
    const aboutText = document.getElementById('aboutText');
    aboutText.textContent = portfolioData.about.text;
    const list = document.getElementById('aboutHighlights');
    list.innerHTML = portfolioData.about.highlights.map(item => `<li>${item}</li>`).join('');
}

function renderSkills(filter = 'all') {
    const list = document.getElementById('skillList');
    const items = portfolioData.skills.filter(s => filter === 'all' ? true : s.kind === filter);
    list.innerHTML = items.map(s => `
        <li>
            <span>${s.name}</span>
            <span class="level"><span style="width:${s.level}%"></span></span>
        </li>
    `).join('');
}

function setupSkillFilters() {
    const buttons = Array.from(document.querySelectorAll('[data-skill-filter]'));
    buttons.forEach(btn => btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        renderSkills(btn.getAttribute('data-skill-filter'));
    }));
}

function projectCard(project) {
    return `
    <article class="project-card" data-kind="${project.kind}">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
        <div class="content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div class="actions">
                <button class="btn" data-modal="${project.id}">Details</button>
                <a class="btn ghost" href="${project.links.demo}" target="_blank" rel="noopener">Live</a>
                <a class="btn ghost" href="${project.links.code}" target="_blank" rel="noopener">Code</a>
            </div>
        </div>
    </article>`;
}

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectGrid');
    const items = portfolioData.projects.filter(p => filter === 'all' ? true : p.kind === filter);
    grid.innerHTML = items.map(projectCard).join('');
}

function setupProjectFilters() {
    const buttons = Array.from(document.querySelectorAll('[data-project-filter]'));
    buttons.forEach(btn => btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        renderProjects(btn.getAttribute('data-project-filter'));
        attachModalButtons();
    }));
}

function attachModalButtons() {
    const dialog = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const close = document.getElementById('modalClose');
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-modal');
            const project = portfolioData.projects.find(p => p.id === id);
            if (!project) return;
            modalContent.innerHTML = `
                <header style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                    <h3 style="margin:0">${project.title}</h3>
                </header>
                <img src="${project.image}" alt="${project.title}" style="width:100%; height:260px; object-fit:cover; border-radius:12px;" />
                <p>${project.description}</p>
                <div class="tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <div class="actions" style="display:flex; gap:8px; margin-top:8px;">
                    <a class="btn primary" href="${project.links.demo}" target="_blank" rel="noopener">Open Live</a>
                    <a class="btn" href="${project.links.code}" target="_blank" rel="noopener">View Code</a>
                </div>
            `;
            dialog.showModal();
        });
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        if (!data.name || !data.email || !data.message) {
            status.textContent = 'Please fill all required fields.';
            return;
        }
        try {
            await new Promise(res => setTimeout(res, 600));
            status.textContent = 'Thanks! Your message has been sent.';
            form.reset();
        } catch (err) {
            status.textContent = 'Something went wrong. Please try again later.';
        }
    });
}

function boot() {
    initializeTheme();
    setupNavToggle();
    renderHeaderData();
    renderAbout();
    renderSkills();
    setupSkillFilters();
    renderProjects();
    setupProjectFilters();
    attachModalButtons();
    setupSmoothScroll();
    setupContactForm();
}

document.addEventListener('DOMContentLoaded', boot);

