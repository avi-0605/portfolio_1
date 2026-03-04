import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    navbar?.classList.add('scrolled');
                } else {
                    navbar?.classList.remove('scrolled');
                }
            };
            window.addEventListener('scroll', handleScroll);

            // Hero Section Load Animations
            const tl = gsap.timeline();

            tl.fromTo('.section-label',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
                .fromTo('.hero-title',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
                    '-=0.4'
                )
                .fromTo('.hero-subtitle',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo('.early-access-status',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo('.hero-terminal',
                    { y: 60, opacity: 0, rotateY: 10, rotateX: 10 },
                    { y: 0, opacity: 1, rotateY: -5, rotateX: 2, duration: 1.2, ease: 'power4.out' },
                    '-=1'
                );

            // Terminal Typing Animation inside the timeline
            const terminalLines = document.querySelectorAll('.term-line');
            terminalLines.forEach((line, index) => {
                if (index === 0) return;

                let delay = 0.5;
                if (index === 1) delay = 1;
                if (index === 2) delay = 1.5;
                if (index === 3) delay = 0.3;
                if (index === 4) delay = 1.2;
                if (index === 5) delay = 1;
                if (index === 6) delay = 0.5;

                tl.to(line, {
                    opacity: 1,
                    duration: 0.1,
                    onStart: () => {
                        line.classList.remove('hidden');
                    },
                }, `+=${delay}`);
            });

            gsap.fromTo('.capabilities .section-title, .capabilities .section-label, .about-me .section-title, .about-me .section-label',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.about-me',
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo('.about-image',
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-content',
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo('.about-text > *',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-text',
                        start: 'top 85%',
                    }
                }
            );

            // Capabilities Cards Scroll Reveal
            gsap.fromTo('.capabilities .section-title, .capabilities .section-label',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.capabilities',
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo('.card',
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.cards-grid',
                        start: 'top 85%',
                    }
                }
            );

            // Progress Bar Animations
            gsap.utils.toArray('.progress-bar-fill').forEach((bar: any) => {
                const width = bar.style.width;
                gsap.fromTo(bar,
                    { width: '0%' },
                    {
                        width: width,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: bar,
                            start: 'top 95%',
                        }
                    }
                );
            });

            // Simple Skills Section Scroll Reveal
            gsap.fromTo('.the-why .section-title, .the-why .section-label',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.the-why',
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo('.absolute-item',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.absolutes-grid',
                        start: 'top 80%',
                    }
                }
            );

            // CTA Section
            gsap.fromTo('.cta .section-title, .cta .section-label, .cta-subtitle',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.cta',
                        start: 'top 80%',
                    }
                }
            );

            return () => {
                window.removeEventListener('scroll', handleScroll);
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }
    }, [loading]);

    return (
        <>
            <AnimatePresence>
                {loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
            </AnimatePresence>

            <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
                {/* Navbar */}
                <nav className="navbar">
                    <div className="nav-content">
                        <div className="logo">
                            <span className="logo-icon"></span>
                            <span className="logo-text">AAVANI</span>
                        </div>
                        <div className="nav-links">
                            <a href="#about-me">About</a>
                            <a href="#projects">Projects</a>
                            <a href="#about">Education</a>
                        </div>
                        <a href="mailto:aavanirp@gmail.com" className="btn btn-outline">Contact Me &rarr;</a>
                    </div>
                </nav>

                {/* Main Content */}
                <main>
                    {/* Hero Section */}
                    <section className="hero" id="hero">
                        <div className="hero-content">
                            <p className="section-label">01 / WELCOME</p>
                            <h1 className="hero-title">Aavani<br /><i>Perumbessi</i></h1>
                            <p className="hero-subtitle">
                                BTech CS student passionate about building<br />
                                meaningful digital experiences with a foundation<br />
                                in full-stack delivery and problem-solving.
                            </p>
                            <div className="early-access-status">
                                <span className="status-dot"></span> ITM Skills University '28
                            </div>
                        </div>

                        <div className="hero-terminal">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                                <div className="terminal-title">aavani.sh — bash</div>
                            </div>
                            <div className="terminal-body">
                                <div className="term-line"><span className="term-prompt">&gt;</span> <span className="term-text type-1">whoami</span></div>
                                <div className="term-line type-2 hidden"><span className="term-prompt">&gt;</span> <span className="term-text dim">fetching details...</span></div>
                                <div className="term-line type-3 hidden"><span className="term-prompt">&gt;</span> <span className="term-text">role: Full Stack Developer</span></div>
                                <div className="term-line type-4 hidden"><span className="term-prompt success">✓</span> <span className="term-text dim">BTech Computer Science</span></div>
                                <div className="term-line type-5 hidden"><span className="term-prompt">&gt;</span> <span className="term-text dim">loading skills... 90%</span></div>
                                <div className="term-line type-6 hidden"><span className="term-prompt">&gt;</span> <span className="term-text dim">initializing maxman logistics exp</span></div>
                                <div className="term-line type-7 hidden"><span className="term-prompt success">✓</span> <span className="term-text type-final">ready.</span></div>
                            </div>
                        </div>

                        <div className="scroll-indicator">
                            <span>SCROLL</span>
                            <div className="scroll-line"></div>
                        </div>
                    </section>

                    {/* About Me Section */}
                    <section className="about-me" id="about-me">
                        <div className="section-header center">
                            <p className="section-label">02 / ABOUT ME</p>
                            <h2 className="section-title"><i>About Me</i></h2>
                        </div>

                        <div className="about-content">
                            <div className="about-image-container">
                                <img src="/pic.jpeg" alt="Aavani Perumbessi" className="about-image" />
                            </div>
                            <div className="about-text">
                                <p className="about-item-number">01</p>
                                <h3 className="about-name">Aavani Perumbessi</h3>
                                <p className="about-desc">
                                    I’m a second-year BTech CSE student and MERN Stack Developer focused on frontend development and UI/UX design. I enjoy building clean, responsive interfaces and scalable web applications that deliver smooth user experiences.
                                    <br /><br />
                                    Beyond code, I love reading books and dancing — hobbies that keep me creative, curious, and balanced. I’m continuously learning and working toward building fast, reliable, and user-focused products.
                                </p>
                                <p className="about-cta">Currently open to internships, freelance work, and full-time opportunities.</p>
                            </div>
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section className="capabilities" id="projects">
                        <div className="section-header center">
                            <p className="section-label">03 / PROJECTS</p>
                            <h2 className="section-title"><i>Recent Work</i></h2>
                        </div>

                        <div className="projects-container">
                            <div className="projects-marquee">
                                <div className="project-card" onClick={() => window.open('https://park-ease-cfa.vercel.app/', '_blank')}>
                                    <div className="project-image" style={{ backgroundImage: "url('/parkease.png')" }}></div>
                                    <div className="project-info">
                                        <h3 className="project-title">PARKEASE</h3>
                                        <p className="project-description">A real-time parking solution that helps drivers find, book, and manage parking effortlessly.</p>
                                        <div className="project-tech">
                                            <span className="tech-pill">MongoDB</span>
                                            <span className="tech-pill">Express.js</span>
                                            <span className="tech-pill">React</span>
                                            <span className="tech-pill">Node.js</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card" onClick={() => window.open('https://avi-0605.github.io/Trade_X/', '_blank')}>
                                    <div className="project-image" style={{ backgroundImage: "url('/tradex.png')" }}></div>
                                    <div className="project-info">
                                        <h3 className="project-title">TRADEX</h3>
                                        <p className="project-description">A risk-free crypto trading simulator with real-time portfolio tracking and analytics.</p>
                                        <div className="project-tech">
                                            <span className="tech-pill">HTML5</span>
                                            <span className="tech-pill">CSS3</span>
                                            <span className="tech-pill">JavaScript</span>
                                            <span className="tech-pill">Firebase</span>
                                            <span className="tech-pill">CoinGecko API</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card" onClick={() => window.open('https://avi-0605.github.io/Make_My-Trip-_Clone/', '_blank')}>
                                    <div className="project-image" style={{ backgroundImage: "url('/makemytrip.png')" }}></div>
                                    <div className="project-info">
                                        <h3 className="project-title">MAKEMYTRIP CLONE</h3>
                                        <p className="project-description">A MakeMyTrip-style flight booking system with advanced search, filters, and booking flow.</p>
                                        <div className="project-tech">
                                            <span className="tech-pill">HTML5</span>
                                            <span className="tech-pill">CSS3</span>
                                            <span className="tech-pill">JavaScript</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card" onClick={() => window.open('https://github.com/avi-0605?tab=repositories', '_blank')}>
                                    <div className="project-image" style={{ backgroundImage: "url('/banquetpro.png')" }}></div>
                                    <div className="project-info">
                                        <h3 className="project-title">BANQUETPRO</h3>
                                        <p className="project-description">An end-to-end banquet management system streamlining event planning, venue bookings, and financial tracking.</p>
                                        <div className="project-tech">
                                            <span className="tech-pill">Next.js</span>
                                            <span className="tech-pill">React</span>
                                            <span className="tech-pill">MongoDB</span>
                                            <span className="tech-pill">Tailwind CSS</span>
                                            <span className="tech-pill">TypeScript</span>
                                            <span className="tech-pill">JWT</span>
                                            <span className="tech-pill">Mongoose</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="the-why" id="about">
                        <div className="section-header center mb-large">
                            <p className="section-label">04 / SKILLS & EDUCATION</p>
                            <h2 className="section-title"><i>Core Competencies.</i></h2>
                        </div>
                        <div className="absolutes-grid">

                            <div className="absolute-item item-left">
                                <p className="item-number">01</p>
                                <h3 className="item-title">Languages</h3>
                                <div className="marquee-container" style={{ margin: "10px 0" }}>
                                    {[1, 2].map((group) => (
                                        <div key={group} className="marquee-content" aria-hidden={group === 2 ? "true" : "false"}>
                                            {Array(6).fill([
                                                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                                                { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
                                                { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                                                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }
                                            ]).flat().map((item, index) => (
                                                <div key={`${group}-${index}`} className="marquee-item">
                                                    <img src={item.icon} alt={item.name} className="marquee-icon" />
                                                    <span className="marquee-label">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <p className="item-desc">Solid foundation in multiple programming paradigms.</p>
                            </div>
                            <div className="absolute-item item-right">
                                <p className="item-number">02</p>
                                <h3 className="item-title">Frameworks</h3>
                                <div className="marquee-container" style={{ margin: "10px 0" }}>
                                    {[1, 2].map((group) => (
                                        <div key={group} className="marquee-content" aria-hidden={group === 2 ? "true" : "false"}>
                                            {Array(5).fill([
                                                { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                                                { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
                                                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                                                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
                                                { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" }
                                            ]).flat().map((item, index) => (
                                                <div key={`${group}-${index}`} className="marquee-item">
                                                    <img src={item.icon} alt={item.name} className="marquee-icon" style={{ filter: item.icon.includes('express') ? 'invert(1)' : 'none' }} />
                                                    <span className="marquee-label">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <p className="item-desc">Experience building responsive full-stack applications.</p>
                            </div>
                            <div className="absolute-item item-left item-last">
                                <p className="item-number">03</p>
                                <h3 className="item-title">Education</h3>
                                <p className="item-desc"><strong>BTech Computer Science</strong> - ITM Skills University (2024-2028)<br />CGPA: 8.9 (First Year)</p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="cta" id="cta">
                        <div className="section-header center">
                            <p className="section-label">05 / CONNECT</p>
                            <h2 className="section-title"><i>Get in touch.</i></h2>
                            <p className="cta-subtitle">Currently seeking new opportunities and collaborations.</p>
                        </div>
                        <div className="download-buttons">
                            <a href="mailto:aavanirp@gmail.com" className="btn btn-outline btn-large">Email Me</a>
                            <a href="https://github.com/avi-0605" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-large">GitHub</a>
                            <a href="https://in.linkedin.com/in/aavani-perumbessi-18380a31a" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-large">LinkedIn</a>
                        </div>
                        <div className="features-list">
                            <span><span className="status-dot green-dot"></span> Based in Mumbai</span>
                            <span><span className="status-dot green-dot"></span> Open to Relocate</span>
                            <span><span className="status-dot green-dot"></span> +91 8452056470</span>
                        </div>
                    </section>
                </main>

                <footer>
                    <p>&copy; 2026 Aavani Perumbessi</p>
                    <p className="footer-dim">Building thoughtful digital experiences.</p>
                </footer>
            </div>
        </>
    );
}

export default App;
