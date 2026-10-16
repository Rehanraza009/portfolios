/**
 * ==========================================================================
 * REHAN RAZA -- MASTER CINEMATIC MOTION ENGINE & INTERACTION ARCHITECTURE
 * Interactive 3D Portrait, Developer Workspace Parallax, Animated About
 * & Polished Segmented Technical Expertise System
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------------------------------------------------------
       1. AMBIENT MOUSE-FOLLOWING LIGHT GLOW (Lerp Eased, 60fps)
       -------------------------------------------------------------------------- */
    const ambientGlow = document.getElementById('ambient-mouse-glow');

    if (ambientGlow && !isTouchDevice && !prefersReducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function updateGlowPosition() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            ambientGlow.style.left = `${glowX}px`;
            ambientGlow.style.top = `${glowY}px`;
            requestAnimationFrame(updateGlowPosition);
        }
        requestAnimationFrame(updateGlowPosition);
    } else if (ambientGlow) {
        ambientGlow.style.display = 'none';
    }

    /* --------------------------------------------------------------------------
       2. INTERACTIVE 3D PORTRAIT CARD TILT & MULTI-LAYER PARALLAX (HERO)
       -------------------------------------------------------------------------- */
    const hero3dCard = document.getElementById('hero-3d-card');
    const portraitGlare = document.getElementById('portrait-glare');
    const portraitSubject = hero3dCard ? hero3dCard.querySelector('.portrait-subject-layer') : null;
    const portraitBackdrop = hero3dCard ? hero3dCard.querySelector('.portrait-backdrop-layer') : null;

    if (hero3dCard && !isTouchDevice && !prefersReducedMotion) {
        let isHovered = false;

        hero3dCard.addEventListener('mouseenter', () => {
            isHovered = true;
            hero3dCard.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease-out';
        });

        hero3dCard.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = hero3dCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const normX = (x / rect.width) * 2 - 1; // -1 to +1
            const normY = (y / rect.height) * 2 - 1; // -1 to +1

            const maxTilt = 8; // subtle, natural, professional angle
            const tiltX = -normY * maxTilt;
            const tiltY = normX * maxTilt;

            hero3dCard.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;

            // Multi-layer parallax depth
            if (portraitSubject) {
                portraitSubject.style.transform = `translateZ(28px) translate(${(normX * 5).toFixed(1)}px, ${(normY * 4).toFixed(1)}px)`;
            }
            if (portraitBackdrop) {
                portraitBackdrop.style.transform = `translateZ(0px) translate(${(-normX * 3).toFixed(1)}px, ${(-normY * 3).toFixed(1)}px)`;
            }

            // Dynamic specular glare highlight
            if (portraitGlare) {
                const glareX = ((normX + 1) / 2) * 100;
                const glareY = ((normY + 1) / 2) * 100;
                portraitGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`;
            }
        });

        hero3dCard.addEventListener('mouseleave', () => {
            isHovered = false;
            hero3dCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
            hero3dCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';

            if (portraitSubject) {
                portraitSubject.style.transform = 'translateZ(28px) translate(0px, 0px)';
            }
            if (portraitBackdrop) {
                portraitBackdrop.style.transform = 'translateZ(0px) translate(0px, 0px)';
            }
        });
    }

    /* General subtle tilt for content cards */
    if (!isTouchDevice && !prefersReducedMotion) {
        const tiltCards = document.querySelectorAll(
            '.reference-project-card, .ref-cert-card, .data-to-impact-card, .what-drives-me-card, .technical-telemetry-card'
        );

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    /* --------------------------------------------------------------------------
       3. MAGNETIC BUTTONS (Desktop CTA Attraction)
       -------------------------------------------------------------------------- */
    if (!isTouchDevice && !prefersReducedMotion) {
        const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-ref-primary, .btn-nav-connect');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'none';
            });
        });
    }

    /* --------------------------------------------------------------------------
       4. DAY / NIGHT THEME ENGINE
       -------------------------------------------------------------------------- */
    const themeSwitch = document.getElementById('theme-pill-switch');
    const STORAGE_KEY = 'rehan_portfolio_theme';

    function getInitialTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        if (themeSwitch) {
            themeSwitch.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
    }

    applyTheme(getInitialTheme());

    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    /* --------------------------------------------------------------------------
       5. SCROLL PROGRESS & ACTIVE NAVIGATION
       -------------------------------------------------------------------------- */
    const progressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('.studio-header');
    const navLinks = document.querySelectorAll('.nav-menu-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        if (header) {
            if (winScroll > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, { passive: true });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-20% 0px -65% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu-list');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', open);
            mobileToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    /* Reliable Header-Offset Anchor Scrolling for All Section Links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile navigation drawer if open
                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    if (mobileToggle) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    /* --------------------------------------------------------------------------
       6. SECONDARY ROLE ROTATOR ENGINE (Hero Headline)
       -------------------------------------------------------------------------- */
    const roleRotatorText = document.getElementById('role-rotator-text');
    if (roleRotatorText) {
        const phrases = [
            "Building Full-Stack Applications",
            "Exploring Data Science & Analytics",
            "Developing Cloud-Based Solutions",
            "Exploring AI & Machine Learning"
        ];
        let roleIndex = 0;
        let rotatorTimer = null;

        function cycleRole() {
            if (prefersReducedMotion) {
                roleIndex = (roleIndex + 1) % phrases.length;
                roleRotatorText.textContent = phrases[roleIndex];
                return;
            }

            roleRotatorText.classList.remove('fade-in');
            roleRotatorText.classList.add('fade-out');

            setTimeout(() => {
                roleIndex = (roleIndex + 1) % phrases.length;
                roleRotatorText.textContent = phrases[roleIndex];
                roleRotatorText.classList.remove('fade-out');
                roleRotatorText.classList.add('fade-in');
            }, 450);
        }

        function startRotation() {
            if (!rotatorTimer) {
                rotatorTimer = setInterval(cycleRole, 3200);
            }
        }

        function stopRotation() {
            if (rotatorTimer) {
                clearInterval(rotatorTimer);
                rotatorTimer = null;
            }
        }

        startRotation();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopRotation();
            } else {
                startRotation();
            }
        });
    }

    /* --------------------------------------------------------------------------
       7. ABOUT SECTION PORTRAIT ENTRANCE ANIMATION (Dual-Trigger: Scroll & Nav Click)
       -------------------------------------------------------------------------- */
    const aboutSection = document.getElementById('about');
    const aboutPortraitStage = document.getElementById('about-portrait-stage');
    const aboutCard = document.getElementById('about-card');
    const aboutFeatures = document.querySelectorAll('.about-feat-card');
    let aboutHasRevealed = false;

    function triggerAboutEntranceAnimation(isManualNav = false) {
        if (!aboutCard) return;
        if (aboutHasRevealed && !isManualNav) return;

        aboutHasRevealed = true;

        if (isManualNav) {
            aboutCard.classList.remove('is-revealed');
            if (aboutPortraitStage) aboutPortraitStage.classList.remove('is-revealed');
            // Trigger reflow for clean re-trigger
            void aboutCard.offsetWidth;
        }

        if (aboutPortraitStage) aboutPortraitStage.classList.add('is-revealed');
        aboutCard.classList.add('is-revealed');

        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
            gsap.fromTo(aboutFeatures,
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out', overwrite: 'auto' }
            );
        }
    }

    if (prefersReducedMotion) {
        if (aboutPortraitStage) aboutPortraitStage.classList.add('is-revealed');
        if (aboutCard) aboutCard.classList.add('is-revealed');
    } else {
        if (aboutSection) {
            const aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        triggerAboutEntranceAnimation(false);
                    }
                });
            }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
            aboutObserver.observe(aboutSection);
        }

        // Direct navigation clicks to About (navbar & hero links)
        document.querySelectorAll('a[href="#about"]').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    triggerAboutEntranceAnimation(true);
                }, 150);
            });
        });
    }

    /* --------------------------------------------------------------------------
       8. INTERACTIVE SKILLS FILTERING (Redesigned Segmented Control)
       -------------------------------------------------------------------------- */
    const skillFilters = document.querySelectorAll('.skill-filter-btn');
    const skillTiles = document.querySelectorAll('.skill-tile');

    skillFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilters.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.getAttribute('data-skill-filter');

            skillTiles.forEach((tile, index) => {
                const category = tile.getAttribute('data-skill-cat');
                const shouldShow = (filter === 'all' || filter === category);

                if (shouldShow) {
                    tile.style.display = 'flex';
                    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
                        gsap.fromTo(tile,
                            { opacity: 0, y: 8, scale: 0.96 },
                            { opacity: 1, y: 0, scale: 1, duration: 0.35, delay: (index % 6) * 0.03, ease: 'power2.out', overwrite: 'auto' }
                        );
                    } else {
                        tile.style.opacity = '1';
                    }
                } else {
                    tile.style.display = 'none';
                    tile.style.opacity = '0';
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       9. COMPLETE PROJECTS CATALOGUE (Filter Tabs + Grid/Carousel Toggle + Arrows)
       -------------------------------------------------------------------------- */
    const projectFilterBtns = document.querySelectorAll('.project-filter-tab-btn');
    const projectCards = document.querySelectorAll('#projects-carousel-row .carousel-item-col');
    const projectsTrack = document.getElementById('projects-carousel-row');
    const btnProjectPrev = document.getElementById('btn-proj-prev');
    const btnProjectNext = document.getElementById('btn-proj-next');
    const toggleProjViewBtn = document.getElementById('toggle-proj-view');
    const projViewText = document.getElementById('proj-view-text');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-proj-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-project-cat');
                if (filter === 'all' || filter === category) {
                    card.style.display = '';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    if (toggleProjViewBtn && projectsTrack) {
        toggleProjViewBtn.addEventListener('click', () => {
            const isGrid = projectsTrack.classList.toggle('grid-mode');
            if (projViewText) {
                projViewText.textContent = isGrid ? 'Carousel View' : 'Grid View';
            }
            toggleProjViewBtn.innerHTML = isGrid 
                ? '<i class="fas fa-sliders-h me-1"></i> <span id="proj-view-text">Carousel View</span>'
                : '<i class="fas fa-th-large me-1"></i> <span id="proj-view-text">Grid View</span>';
        });
    }

    if (projectsTrack && btnProjectPrev && btnProjectNext) {
        btnProjectNext.addEventListener('click', () => {
            projectsTrack.scrollBy({ left: 400, behavior: 'smooth' });
        });
        btnProjectPrev.addEventListener('click', () => {
            projectsTrack.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       10. COMPLETE CERTIFICATIONS GALLERY (Filter Tabs + Grid/Carousel Toggle + Arrows)
       -------------------------------------------------------------------------- */
    const certFilterBtns = document.querySelectorAll('.cert-filter-tab-btn');
    const certCards = document.querySelectorAll('#certs-carousel-row .cert-item-col');
    const certsTrack = document.getElementById('certs-carousel-row');
    const btnCertPrev = document.getElementById('btn-cert-prev');
    const btnCertNext = document.getElementById('btn-cert-next');
    const toggleCertViewBtn = document.getElementById('toggle-cert-view');
    const certViewText = document.getElementById('cert-view-text');

    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            certFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-cert-filter');

            certCards.forEach(card => {
                const category = card.getAttribute('data-cert-cat');
                if (filter === 'all' || filter === category) {
                    card.style.display = '';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    if (toggleCertViewBtn && certsTrack) {
        toggleCertViewBtn.addEventListener('click', () => {
            const isGrid = certsTrack.classList.toggle('grid-mode');
            if (certViewText) {
                certViewText.textContent = isGrid ? 'Carousel View' : 'Grid View';
            }
            toggleCertViewBtn.innerHTML = isGrid
                ? '<i class="fas fa-sliders-h me-1"></i> <span id="cert-view-text">Carousel View</span>'
                : '<i class="fas fa-th-large me-1"></i> <span id="cert-view-text">Grid View</span>';
        });
    }

    if (certsTrack && btnCertPrev && btnCertNext) {
        btnCertNext.addEventListener('click', () => {
            certsTrack.scrollBy({ left: 340, behavior: 'smooth' });
        });
        btnCertPrev.addEventListener('click', () => {
            certsTrack.scrollBy({ left: -340, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       11. RESUME SELECTION MODAL SYSTEM (Interactive Multi-PDF Viewer & Download)
       -------------------------------------------------------------------------- */
    const resumeModal = document.getElementById('resume-modal');
    const btnHeroResumes = document.getElementById('btn-hero-resumes');
    const btnAboutResumes = document.getElementById('btn-about-resumes');
    const resumeModalClose = document.getElementById('resume-modal-close');
    const resumeModalDone = document.getElementById('resume-modal-done');

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('active');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (btnHeroResumes) btnHeroResumes.addEventListener('click', openResumeModal);
    if (btnAboutResumes) btnAboutResumes.addEventListener('click', openResumeModal);
    if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
    if (resumeModalDone) resumeModalDone.addEventListener('click', closeResumeModal);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    /* --------------------------------------------------------------------------
       12. CERTIFICATE LIGHTBOX MODAL (Full Resolution View)
       -------------------------------------------------------------------------- */
    const lightboxModal = document.getElementById('studio-lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxIssuer = document.getElementById('lightbox-issuer');
    const lightboxDate = document.getElementById('lightbox-date');
    const lightboxVerifyBtn = document.getElementById('lightbox-verify-btn');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    document.querySelectorAll('.btn-trigger-lightbox').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const src = el.getAttribute('data-cert-img');
            const title = el.getAttribute('data-cert-title');
            const issuer = el.getAttribute('data-cert-issuer');
            const date = el.getAttribute('data-cert-date');
            const verify = el.getAttribute('data-cert-verify');

            if (lightboxImg) lightboxImg.src = src || '';
            if (lightboxTitle) lightboxTitle.textContent = title || 'Verified Credential';
            if (lightboxIssuer) lightboxIssuer.textContent = issuer || 'Issuing Authority';
            if (lightboxDate) lightboxDate.textContent = date || '';

            if (lightboxVerifyBtn) {
                if (verify && verify.trim() !== '') {
                    lightboxVerifyBtn.href = verify.startsWith('http') ? verify : '#';
                    lightboxVerifyBtn.style.display = 'inline-flex';
                    lightboxVerifyBtn.textContent = verify.startsWith('http') ? 'Verify Credential' : `ID: ${verify}`;
                } else {
                    lightboxVerifyBtn.style.display = 'none';
                }
            }

            if (lightboxModal) {
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeResumeModal();
        }
    });

    /* --------------------------------------------------------------------------
       13. 1-CLICK CLIPBOARD EMAIL COPY & TOAST NOTIFICATION
       -------------------------------------------------------------------------- */
    const copyEmailBtns = document.querySelectorAll('.btn-copy-email-action');
    const toast = document.getElementById('copy-toast');
    const toastText = document.getElementById('toast-text');

    function showToast(msg) {
        if (!toast) return;
        if (toastText) toastText.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = 'rehanraza000@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email address copied to clipboard!');
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    });

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    /* --------------------------------------------------------------------------
       14. GSAP & SCROLLTRIGGER CINEMATIC CHOREOGRAPHY
       -------------------------------------------------------------------------- */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Hero Left Narrative Staggered Reveal
        gsap.from('.hero-category-label, .hero-name-title, .hero-headline-block, .hero-bio-paragraph, .hero-cta-buttons, .hero-social-icons', {
            y: 22,
            opacity: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: 'power3.out'
        });

        // 2. Hero 3D Portrait Entrance
        gsap.from('.hero-3d-portrait-card, .hero-passport-card, .hero-circular-portrait-frame', {
            scale: 0.92,
            opacity: 0,
            duration: 1.1,
            delay: 0.15,
            ease: 'power3.out'
        });

        // 3. Hero Outer Orbit Badges
        gsap.from('.orbit-badge', {
            y: 15,
            opacity: 0,
            stagger: 0.08,
            duration: 0.65,
            delay: 0.45,
            ease: 'power3.out'
        });

        // 4. Hero Metrics Mini Tiles
        gsap.from('.metric-mini-tile', {
            y: 15,
            opacity: 0,
            stagger: 0.08,
            duration: 0.65,
            delay: 0.65,
            ease: 'power3.out'
        });

        // 5. Section Kickers & Headings Reveal
        gsap.utils.toArray('.section-tag-kicker, .section-title-bold, .about-main-heading').forEach(headerEl => {
            gsap.from(headerEl, {
                scrollTrigger: {
                    trigger: headerEl,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 20,
                opacity: 0,
                duration: 0.75,
                ease: 'power3.out'
            });
        });

        // 6. Project Cards Stagger
        gsap.utils.toArray('.reference-project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.65,
                delay: (index % 4) * 0.08,
                ease: 'power3.out'
            });
        });

        // 7. Certifications Cards Stagger
        gsap.utils.toArray('.ref-cert-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.65,
                delay: (index % 4) * 0.08,
                ease: 'power3.out'
            });
        });

        // 8. Timeline Items Entrance
        gsap.utils.toArray('.timeline-item-entry').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                x: -25,
                opacity: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }

});
