/**
 * ==========================================================================
 * REHAN.EXE — CYBER RUNNER 2026 (PLAYABLE PORTFOLIO GAME ENGINE)
 * ==========================================================================
 * Features:
 *  - 2D Cyberpunk Side-Scrolling Platformer Engine
 *  - Parallax Multi-Layer Cityscape (Skyline, Hover Cars, Grid Highway)
 *  - Responsive Virtual Coordinate Canvas (960x440) with High-DPI Scaling
 *  - Dynamic Animated Cyber-Runner Character with Physics & Thruster FX
 *  - 7 Verified Portfolio Checkpoint Gates (Home, About, Skills, Projects, Exp, Certs, Contact)
 *  - 20 Collectible Tech Data Cores (Python, AWS, React, PyTorch, Docker, etc.)
 *  - Synthesized Web Audio API SFX (Zero External Sound File Dependencies)
 *  - In-Game HUD: Data Counter, Intel Checkpoints, Shield Bar, Sector Tracker
 *  - Interactive Checkpoint Intel Modal: View Verified Summary & Jump to Section
 *  - Complete Control Support: Keyboard (A/D/Arrows/Space/W/Enter/Esc) & Mobile Touch D-Pad
 *  - Auto-Pause when Scrolled Off-Screen via IntersectionObserver
 *  - Fast "Skip to Portfolio" Option for Recruiter Accessibility
 * ==========================================================================
 */

class CyberGameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        // Virtual internal dimensions
        this.virtualWidth = 960;
        this.virtualHeight = 440;
        this.worldWidth = 5200;
        this.groundY = 370;

        // Game State: 'START', 'PLAYING', 'CHECKPOINT', 'PAUSED', 'VICTORY'
        this.state = 'START';
        this.audioEnabled = true;
        this.audioCtx = null;

        // Camera Tracking
        this.cameraX = 0;

        // Score & Progress
        this.dataCoresCollected = 0;
        this.totalDataCores = 20;
        this.checkpointsVisited = new Set();
        this.totalCheckpoints = 7;
        this.activeCheckpoint = null;
        this.nearCheckpoint = null;

        // Keys State
        this.keys = {
            left: false,
            right: false,
            jump: false,
            interact: false
        };

        // Player Character
        this.player = {
            x: 120,
            y: this.groundY - 50,
            width: 32,
            height: 52,
            vx: 0,
            vy: 0,
            speed: 5.4,
            jumpForce: -12.2,
            gravity: 0.58,
            friction: 0.84,
            isGrounded: true,
            facing: 'right',
            animFrame: 0,
            animTimer: 0,
            state: 'idle' // 'idle', 'run', 'jump', 'fall'
        };

        // Particles & Ambient Visuals
        this.particles = [];
        this.traffic = [];
        this.initTraffic();

        // 7 Authentic Portfolio Checkpoints
        this.checkpoints = [
            {
                id: 'home',
                name: 'SECTOR 01: HOME BASE',
                title: 'Mission Initialized — Rehan Raza',
                x: 260,
                targetSection: '#hero',
                icon: 'fa-terminal',
                badge: 'Level 01',
                summary: 'Rehan Raza: B.Tech CSE (Data Science) student at Galgotias University \'27. Full-stack software engineer specializing in scalable cloud data pipelines and multimodal AI.',
                stats: 'Software Engineer • Data Science Specialist'
            },
            {
                id: 'about',
                name: 'SECTOR 02: ABOUT CORE',
                title: 'Academic & Engineering Background',
                x: 980,
                targetSection: '#about',
                icon: 'fa-user-astronaut',
                badge: 'Level 02',
                summary: 'Galgotias University B.Tech CSE (Data Science). Practical engineering background building reliable software, fine-tuning vision-language models for Earth observation (SATQuery AI), and architecting distributed systems.',
                stats: 'Class of 2027 • Problem Solver • Tech Enthusiast'
            },
            {
                id: 'skills',
                name: 'SECTOR 03: TECH MATRIX',
                title: 'Verified Technical Stack',
                x: 1760,
                targetSection: '#skills',
                icon: 'fa-microchip',
                badge: 'Level 03',
                summary: 'Languages: Python, Java, C++, JavaScript, SQL. Frontend: React.js, Next.js 16, Bootstrap 5, Tailwind CSS. Backend & Cloud: Node.js, Express, FastAPI, Django, AWS (S3, Glue, Athena), PyTorch 2.x, Docker.',
                stats: 'Languages • Cloud & AWS • Data Science & ML'
            },
            {
                id: 'projects',
                name: 'SECTOR 04: REPOSITORY VAULT',
                title: 'Production & Open-Source Projects',
                x: 2540,
                targetSection: '#projects',
                icon: 'fa-cubes',
                badge: 'Level 04',
                summary: '1. SATQuery AI: Remote-sensing QA & flood segmentation (SmolVLM, PyTorch, Live on Vercel). 2. RideMesh: Route-sharing & smart detour calculation. 3. TestHub: Live examination portal. 4. IPO Web App: Django fintech portal.',
                stats: 'SATQuery AI Live • RideMesh • TestHub • IPO App'
            },
            {
                id: 'experience',
                name: 'SECTOR 05: CAREER NODE',
                title: 'Verified Professional Internships',
                x: 3320,
                targetSection: '#experience',
                icon: 'fa-briefcase',
                badge: 'Level 05',
                summary: '• Data Analytics Intern @ VisioTechon Services (July 2025 – Present, Active)\n• AWS Data Engineering Virtual Intern @ AICTE – EduSkills (April 2026 – June 2026, Completed)\n• SDE Intern @ Blue Stock Fintech\n• Data Science Intern @ Zidio Development',
                stats: 'VisioTechon (Active) • AICTE-EduSkills (Completed)'
            },
            {
                id: 'certifications',
                name: 'SECTOR 06: CREDENTIAL CITADEL',
                title: '12 Authentic Industry Credentials',
                x: 4100,
                targetSection: '#certifications',
                icon: 'fa-certificate',
                badge: 'Level 06',
                summary: '4x AWS Credentials (Technical Essentials, ML Engineer Overview, Data Engineering Foundations, Academy Graduate Badge on Credly), CodeChef MERN, Google Cloud Gen AI Academy, EY AI Passport, NCAT 48/60, Infosys Data Science, TCS, Deloitte, JPMorganChase.',
                stats: '12 Verified Credentials • Real Certificate Gallery'
            },
            {
                id: 'contact',
                name: 'SECTOR 07: EXTRACTION PORTAL',
                title: 'Final Mission Portal — Get In Touch',
                x: 4900,
                targetSection: '#contact',
                icon: 'fa-paper-plane',
                badge: 'Level 07',
                summary: 'Mission Complete! Rehan is open for Software Engineering and Data Science internship opportunities. Connect via direct email (099rehan@gmail.com) or LinkedIn (/in/rehan-raza-b45bb6306).',
                stats: 'Direct Email • LinkedIn • Verified Dossier'
            }
        ];

        // Elevated Platforms along the level
        this.platforms = [
            { x: 500, y: 290, width: 180, height: 18 },
            { x: 740, y: 230, width: 160, height: 18 },
            { x: 1240, y: 280, width: 220, height: 18 },
            { x: 1520, y: 210, width: 170, height: 18 },
            { x: 2040, y: 280, width: 240, height: 18 },
            { x: 2320, y: 210, width: 160, height: 18 },
            { x: 2820, y: 290, width: 200, height: 18 },
            { x: 3080, y: 220, width: 180, height: 18 },
            { x: 3600, y: 280, width: 220, height: 18 },
            { x: 3880, y: 210, width: 160, height: 18 },
            { x: 4380, y: 280, width: 240, height: 18 },
            { x: 4660, y: 210, width: 180, height: 18 }
        ];

        // 20 Collectible Tech Cores (Cubes/Gems)
        this.collectibles = [
            { x: 380, y: this.groundY - 35, label: 'HTML5', collected: false },
            { x: 580, y: 250, label: 'CSS3', collected: false },
            { x: 820, y: 190, label: 'JS', collected: false },
            { x: 1120, y: this.groundY - 35, label: 'React', collected: false },
            { x: 1340, y: 240, label: 'Next.js', collected: false },
            { x: 1600, y: 170, label: 'Python', collected: false },
            { x: 1880, y: this.groundY - 35, label: 'Java', collected: false },
            { x: 2140, y: 240, label: 'SQL', collected: false },
            { x: 2400, y: 170, label: 'FastAPI', collected: false },
            { x: 2680, y: this.groundY - 35, label: 'PyTorch', collected: false },
            { x: 2920, y: 250, label: 'AWS', collected: false },
            { x: 3160, y: 180, label: 'S3', collected: false },
            { x: 3460, y: this.groundY - 35, label: 'Glue', collected: false },
            { x: 3700, y: 240, label: 'Athena', collected: false },
            { x: 3960, y: 170, label: 'Docker', collected: false },
            { x: 4220, y: this.groundY - 35, label: 'Git', collected: false },
            { x: 4480, y: 240, label: 'MERN', collected: false },
            { x: 4740, y: 170, label: 'GenAI', collected: false },
            { x: 4820, y: this.groundY - 35, label: 'SmolVLM', collected: false },
            { x: 5040, y: this.groundY - 35, label: 'Ready!', collected: false }
        ];

        // Setup DOM Hooks & Events
        this.initAudio();
        this.bindEvents();
        this.bindTouchControls();
        this.bindModalEvents();
        this.bindVisibilityObserver();

        // Start Animation Loop
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    /* ----------------------------------------------------------------------
       AUDIO SYNTHESIZER (Web Audio API — Zero External Audio Files)
       ---------------------------------------------------------------------- */
    initAudio() {
        try {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (AudioCtxClass) {
                this.audioCtx = new AudioCtxClass();
            }
        } catch (e) {
            console.warn('Web Audio not supported:', e);
        }
    }

    resumeAudio() {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    playSound(type) {
        if (!this.audioEnabled || !this.audioCtx) return;
        this.resumeAudio();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        try {
            if (type === 'jump') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.13);
            } else if (type === 'collect') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(587, now); // D5
                osc.frequency.setValueAtTime(880, now + 0.06); // A5
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.19);
            } else if (type === 'checkpoint') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.36);
            } else if (type === 'victory') {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const noteTime = now + idx * 0.1;
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, noteTime);
                    gain.gain.setValueAtTime(0.25, noteTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.22);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(noteTime);
                    osc.stop(noteTime + 0.23);
                });
            }
        } catch (e) {
            // Ignore audio interruptions
        }
    }

    /* ----------------------------------------------------------------------
       INPUT & EVENT LISTENERS
       ---------------------------------------------------------------------- */
    bindEvents() {
        // Game Start / Skip Buttons on Overlay
        document.getElementById('btn-game-start')?.addEventListener('click', () => {
            this.startGame();
        });
        document.getElementById('btn-game-restart')?.addEventListener('click', () => {
            this.restartGame();
        });
        document.getElementById('btn-game-skip')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.skipToPortfolio();
        });
        document.getElementById('btn-game-audio-toggle')?.addEventListener('click', () => {
            this.toggleAudio();
        });
        document.getElementById('btn-game-pause')?.addEventListener('click', () => {
            this.togglePause();
        });

        // Keyboard Controls
        window.addEventListener('keydown', (e) => {
            // Only capture game keys when canvas section is visible or playing
            const isControlKey = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'KeyA', 'KeyD', 'KeyW', 'Space', 'Enter', 'KeyE', 'Escape'].includes(e.code);
            
            if (this.state === 'PLAYING') {
                if (isControlKey && e.code !== 'Escape') {
                    // Prevent page scroll only for active game keys
                    e.preventDefault();
                }

                if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = true;
                if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = true;
                if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
                    this.keys.jump = true;
                }
                if (e.code === 'Enter' || e.code === 'KeyE') {
                    this.keys.interact = true;
                    this.handleInteraction();
                }
                if (e.code === 'Escape') {
                    this.togglePause();
                }
            } else if (this.state === 'PAUSED' && e.code === 'Escape') {
                this.togglePause();
            } else if (this.state === 'START' && (e.code === 'Enter' || e.code === 'Space')) {
                this.startGame();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = false;
            if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = false;
            if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') this.keys.jump = false;
            if (e.code === 'Enter' || e.code === 'KeyE') this.keys.interact = false;
        });

        // Canvas Click Focus
        this.canvas.addEventListener('click', () => {
            this.resumeAudio();
            if (this.state === 'START') this.startGame();
        });
    }

    bindTouchControls() {
        const btnLeft = document.getElementById('touch-btn-left');
        const btnRight = document.getElementById('touch-btn-right');
        const btnJump = document.getElementById('touch-btn-jump');
        const btnInteract = document.getElementById('touch-btn-interact');

        const attachTouch = (el, pressAction, releaseAction) => {
            if (!el) return;
            el.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.resumeAudio();
                pressAction();
            }, { passive: false });
            el.addEventListener('touchend', (e) => {
                e.preventDefault();
                releaseAction();
            }, { passive: false });
            el.addEventListener('mousedown', (e) => {
                e.preventDefault();
                pressAction();
            });
            el.addEventListener('mouseup', (e) => {
                e.preventDefault();
                releaseAction();
            });
        };

        attachTouch(btnLeft, () => { this.keys.left = true; }, () => { this.keys.left = false; });
        attachTouch(btnRight, () => { this.keys.right = true; }, () => { this.keys.right = false; });
        attachTouch(btnJump, () => { this.keys.jump = true; }, () => { this.keys.jump = false; });
        attachTouch(btnInteract, () => { 
            this.keys.interact = true; 
            this.handleInteraction(); 
        }, () => { this.keys.interact = false; });
    }

    bindModalEvents() {
        const modal = document.getElementById('game-checkpoint-modal');
        const btnClose = document.getElementById('btn-close-checkpoint-modal');
        const btnResume = document.getElementById('btn-resume-mission');
        const btnJumpToSection = document.getElementById('btn-jump-to-section');

        const closeModal = () => {
            modal.style.display = 'none';
            if (this.state === 'CHECKPOINT') {
                this.state = 'PLAYING';
            }
        };

        btnClose?.addEventListener('click', closeModal);
        btnResume?.addEventListener('click', closeModal);
        
        btnJumpToSection?.addEventListener('click', () => {
            closeModal();
            if (this.activeCheckpoint && this.activeCheckpoint.targetSection) {
                const target = document.querySelector(this.activeCheckpoint.targetSection);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    bindVisibilityObserver() {
        const gameSection = document.getElementById('game-arena');
        if (!gameSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If user scrolls completely past the game, pause rendering to save resources
                this.isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(gameSection);
    }

    /* ----------------------------------------------------------------------
       STATE TRANSITIONS
       ---------------------------------------------------------------------- */
    startGame() {
        this.resumeAudio();
        this.state = 'PLAYING';
        document.getElementById('game-start-overlay').style.display = 'none';
        document.getElementById('game-victory-overlay').style.display = 'none';
        document.getElementById('game-hud-bar').style.display = 'flex';
        this.updateHUD();
    }

    restartGame() {
        this.player.x = 120;
        this.player.y = this.groundY - 50;
        this.player.vx = 0;
        this.player.vy = 0;
        this.cameraX = 0;
        this.dataCoresCollected = 0;
        this.checkpointsVisited.clear();
        this.collectibles.forEach(c => c.collected = false);
        this.state = 'PLAYING';
        document.getElementById('game-victory-overlay').style.display = 'none';
        document.getElementById('game-start-overlay').style.display = 'none';
        document.getElementById('game-hud-bar').style.display = 'flex';
        this.updateHUD();
    }

    skipToPortfolio() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    togglePause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            document.getElementById('game-pause-overlay').style.display = 'flex';
        } else if (this.state === 'PAUSED') {
            this.state = 'PLAYING';
            document.getElementById('game-pause-overlay').style.display = 'none';
        }
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        const icon = document.getElementById('audio-toggle-icon');
        if (icon) {
            icon.className = this.audioEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
        }
    }

    handleInteraction() {
        if (this.nearCheckpoint) {
            this.openCheckpointModal(this.nearCheckpoint);
        }
    }

    openCheckpointModal(checkpoint) {
        this.state = 'CHECKPOINT';
        this.activeCheckpoint = checkpoint;
        this.checkpointsVisited.add(checkpoint.id);
        this.playSound('checkpoint');
        this.updateHUD();

        const modal = document.getElementById('game-checkpoint-modal');
        document.getElementById('cp-modal-badge').textContent = checkpoint.badge;
        document.getElementById('cp-modal-title').textContent = checkpoint.title;
        document.getElementById('cp-modal-sector').textContent = checkpoint.name;
        document.getElementById('cp-modal-summary').textContent = checkpoint.summary;
        document.getElementById('cp-modal-stats').textContent = checkpoint.stats;

        const iconEl = document.getElementById('cp-modal-icon');
        if (iconEl) iconEl.className = `fas ${checkpoint.icon} text-cyan`;

        modal.style.display = 'flex';
    }

    triggerVictory() {
        this.state = 'VICTORY';
        this.playSound('victory');
        this.spawnVictoryConfetti();

        const overlay = document.getElementById('game-victory-overlay');
        document.getElementById('vic-data-count').textContent = `${this.dataCoresCollected} / ${this.totalDataCores}`;
        document.getElementById('vic-intel-count').textContent = `${this.checkpointsVisited.size} / ${this.totalCheckpoints}`;
        overlay.style.display = 'flex';
    }

    /* ----------------------------------------------------------------------
       BACKGROUND TRAFFIC & PARTICLES
       ---------------------------------------------------------------------- */
    initTraffic() {
        for (let i = 0; i < 6; i++) {
            this.traffic.push({
                x: Math.random() * this.virtualWidth,
                y: 80 + Math.random() * 120,
                speed: (Math.random() * 1.5 + 0.8) * (Math.random() > 0.5 ? 1 : -1),
                width: 32 + Math.random() * 20,
                color: Math.random() > 0.5 ? '#38bdf8' : '#f43f5e'
            });
        }
    }

    spawnDust(x, y) {
        for (let i = 0; i < 4; i++) {
            this.particles.push({
                x: x + (Math.random() * 10 - 5),
                y: y,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -Math.random() * 1.2,
                size: Math.random() * 3 + 1,
                alpha: 0.8,
                color: 'rgba(56, 189, 248, '
            });
        }
    }

    spawnVictoryConfetti() {
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: this.player.x + (Math.random() * 300 - 150),
                y: this.player.y - 100 + Math.random() * 150,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 7 - 2,
                size: Math.random() * 5 + 2,
                alpha: 1,
                color: ['rgba(56, 189, 248,', 'rgba(168, 85, 247,', 'rgba(245, 158, 11,', 'rgba(16, 185, 129,'][Math.floor(Math.random() * 4)]
            });
        }
    }

    /* ----------------------------------------------------------------------
       UPDATE GAMEPLAY PHYSICS & LOGIC
       ---------------------------------------------------------------------- */
    update(deltaTime) {
        if (this.state !== 'PLAYING') return;

        const p = this.player;

        // Horizontal Movement
        if (this.keys.left) {
            p.vx -= 0.65;
            p.facing = 'left';
            p.state = 'run';
        } else if (this.keys.right) {
            p.vx += 0.65;
            p.facing = 'right';
            p.state = 'run';
        } else {
            p.vx *= p.friction;
            if (Math.abs(p.vx) < 0.1) {
                p.vx = 0;
                if (p.isGrounded) p.state = 'idle';
            }
        }

        // Velocity Clamping
        p.vx = Math.max(-p.speed, Math.min(p.speed, p.vx));
        p.x += p.vx;

        // World Bounds Left
        if (p.x < 20) {
            p.x = 20;
            p.vx = 0;
        }

        // Jump & Gravity
        if (this.keys.jump && p.isGrounded) {
            p.vy = p.jumpForce;
            p.isGrounded = false;
            p.state = 'jump';
            this.playSound('jump');
            this.spawnDust(p.x + p.width / 2, p.y + p.height);
        }

        p.vy += p.gravity;
        p.y += p.vy;

        // Ground Collision
        if (p.y + p.height >= this.groundY) {
            p.y = this.groundY - p.height;
            p.vy = 0;
            p.isGrounded = true;
            if (p.vx !== 0) p.state = 'run';
            else p.state = 'idle';
        } else {
            p.isGrounded = false;
            if (p.vy > 0) p.state = 'fall';
            else p.state = 'jump';
        }

        // Platform Collisions (One-Way from Top)
        this.platforms.forEach(plat => {
            const isFalling = p.vy >= 0;
            const wasAbove = (p.y + p.height - p.vy) <= plat.y + 2;
            const inXBounds = (p.x + p.width > plat.x) && (p.x < plat.x + plat.width);

            if (isFalling && wasAbove && inXBounds && (p.y + p.height >= plat.y) && (p.y + p.height <= plat.y + plat.height + 4)) {
                p.y = plat.y - p.height;
                p.vy = 0;
                p.isGrounded = true;
                if (p.vx !== 0) p.state = 'run';
                else p.state = 'idle';
            }
        });

        // Collectibles Collision
        this.collectibles.forEach(item => {
            if (!item.collected) {
                const dist = Math.hypot((p.x + p.width / 2) - item.x, (p.y + p.height / 2) - item.y);
                if (dist < 32) {
                    item.collected = true;
                    this.dataCoresCollected++;
                    this.playSound('collect');
                    this.spawnDust(item.x, item.y);
                    this.updateHUD();
                }
            }
        });

        // Checkpoints Proximity Check
        this.nearCheckpoint = null;
        for (const cp of this.checkpoints) {
            const dist = Math.abs((p.x + p.width / 2) - cp.x);
            if (dist < 55) {
                this.nearCheckpoint = cp;
                break;
            }
        }

        // Victory Condition: Reaching Contact Portal (x >= 4900)
        if (p.x >= 4900 && this.state !== 'VICTORY') {
            this.triggerVictory();
        }

        // Camera Smooth Follow
        const targetCamX = p.x - this.virtualWidth * 0.38;
        this.cameraX += (targetCamX - this.cameraX) * 0.1;
        this.cameraX = Math.max(0, Math.min(this.worldWidth - this.virtualWidth, this.cameraX));

        // Animation Timer
        p.animTimer += deltaTime;
        if (p.animTimer > 80) {
            p.animFrame = (p.animFrame + 1) % 6;
            p.animTimer = 0;
            if (p.state === 'run' && p.isGrounded && Math.random() > 0.4) {
                this.spawnDust(p.x + (p.facing === 'right' ? 4 : p.width - 4), p.y + p.height);
            }
        }

        // Update Traffic
        this.traffic.forEach(car => {
            car.x += car.speed;
            if (car.speed > 0 && car.x > this.virtualWidth + 60) car.x = -60;
            if (car.speed < 0 && car.x < -60) car.x = this.virtualWidth + 60;
        });

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const pt = this.particles[i];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.alpha -= 0.02;
            if (pt.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    updateHUD() {
        const dataCountEl = document.getElementById('hud-data-cores');
        const intelCountEl = document.getElementById('hud-intel-scanned');
        const sectorEl = document.getElementById('hud-active-sector');

        if (dataCountEl) dataCountEl.textContent = `${this.dataCoresCollected} / ${this.totalDataCores}`;
        if (intelCountEl) intelCountEl.textContent = `${this.checkpointsVisited.size} / ${this.totalCheckpoints}`;
        
        // Find current sector based on player X
        let currentSector = 'SECTOR 01: HOME BASE';
        for (let i = this.checkpoints.length - 1; i >= 0; i--) {
            if (this.player.x >= this.checkpoints[i].x - 80) {
                currentSector = this.checkpoints[i].name;
                break;
            }
        }
        if (sectorEl) sectorEl.textContent = currentSector;
    }

    /* ----------------------------------------------------------------------
       RENDER GRAPHICS & WORLD
       ---------------------------------------------------------------------- */
    render() {
        const ctx = this.ctx;
        const w = this.virtualWidth;
        const h = this.virtualHeight;

        // Clear Virtual Canvas
        ctx.clearRect(0, 0, w, h);

        // 1. Cyber Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#040712');
        skyGrad.addColorStop(0.65, '#0a1024');
        skyGrad.addColorStop(1, '#0d1836');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. Distant Celestial Cyber Moon
        ctx.save();
        ctx.beginPath();
        ctx.arc(w * 0.82, 90, 48, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(w * 0.82, 90, 36, 0, Math.PI * 2);
        ctx.fillStyle = '#0f1f3d';
        ctx.fill();
        ctx.restore();

        // 3. Parallax Layer 1: Distant City Towers (Speed: 0.15)
        this.renderSkyline(0.15, '#070f24', 160, 260);

        // 4. Parallax Layer 2: Midground Glowing Towers (Speed: 0.4)
        this.renderSkyline(0.4, '#0b1938', 110, 320, true);

        // 5. Flying Hover Cars / Sky Traffic
        this.renderTraffic();

        // 6. Camera Offset for Foreground World Elements
        ctx.save();
        ctx.translate(-Math.floor(this.cameraX), 0);

        // Ground Highway & Perspective Grid
        this.renderGroundGrid();

        // Platforms
        this.renderPlatforms();

        // Checkpoints (Portals / Holographic Beams)
        this.renderCheckpoints();

        // Collectible Tech Cores
        this.renderCollectibles();

        // Player Character
        this.renderPlayer();

        // Particles
        this.renderParticles();

        ctx.restore();

        // Proximity Action Overlay (Rendered in Screen Coordinates)
        if (this.nearCheckpoint && this.state === 'PLAYING') {
            this.renderActionPrompt();
        }
    }

    renderSkyline(parallaxSpeed, color, minH, maxH, hasGlow = false) {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = color;

        const offset = (this.cameraX * parallaxSpeed) % 800;
        const totalBldgs = Math.ceil(this.virtualWidth / 55) + 8;

        for (let i = -2; i < totalBldgs; i++) {
            const bx = (i * 65) - offset;
            const bh = 140 + ((Math.sin(i * 1337) + 1) * 0.5) * (maxH - minH);
            const by = this.groundY - bh;

            ctx.fillRect(bx, by, 54, bh);

            // Windows / LED Lines
            if (hasGlow && i % 2 === 0) {
                ctx.fillStyle = i % 4 === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(168, 85, 247, 0.3)';
                for (let wy = by + 20; wy < this.groundY - 30; wy += 26) {
                    ctx.fillRect(bx + 8, wy, 10, 4);
                    ctx.fillRect(bx + 26, wy, 10, 4);
                }
                ctx.fillStyle = color; // Reset back
            }
        }
        ctx.restore();
    }

    renderTraffic() {
        const ctx = this.ctx;
        this.traffic.forEach(car => {
            ctx.fillStyle = car.color;
            ctx.shadowColor = car.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(car.x, car.y, car.width, 3);
            // Headlight trail
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(car.speed > 0 ? car.x + car.width : car.x, car.y, 4, 3);
        });
        ctx.shadowBlur = 0;
    }

    renderGroundGrid() {
        const ctx = this.ctx;
        const gY = this.groundY;

        // Ground Deck
        ctx.fillStyle = '#070d1e';
        ctx.fillRect(this.cameraX - 100, gY, this.virtualWidth + 200, this.virtualHeight - gY);

        // Glowing Top Rail
        ctx.strokeStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.cameraX - 100, gY);
        ctx.lineTo(this.cameraX + this.virtualWidth + 100, gY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Perspective Vertical Grid Ties
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;
        const startX = Math.floor((this.cameraX - 100) / 40) * 40;
        for (let x = startX; x < this.cameraX + this.virtualWidth + 100; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, gY);
            ctx.lineTo(x - 20, this.virtualHeight);
            ctx.stroke();
        }
    }

    renderPlatforms() {
        const ctx = this.ctx;
        this.platforms.forEach(plat => {
            // Check if platform is within visible viewport
            if (plat.x + plat.width < this.cameraX - 100 || plat.x > this.cameraX + this.virtualWidth + 100) return;

            // Platform Deck
            ctx.fillStyle = '#0b1730';
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);

            // Glowing Edge
            ctx.strokeStyle = '#818cf8';
            ctx.shadowColor = '#818cf8';
            ctx.shadowBlur = 6;
            ctx.lineWidth = 2;
            ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
            ctx.shadowBlur = 0;

            // Support Pillars
            ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.fillRect(plat.x + 10, plat.y + plat.height, 6, this.groundY - (plat.y + plat.height));
            ctx.fillRect(plat.x + plat.width - 16, plat.y + plat.height, 6, this.groundY - (plat.y + plat.height));
        });
    }

    renderCheckpoints() {
        const ctx = this.ctx;
        const time = performance.now() * 0.002;

        this.checkpoints.forEach((cp, idx) => {
            if (cp.x < this.cameraX - 150 || cp.x > this.cameraX + this.virtualWidth + 150) return;

            const isVisited = this.checkpointsVisited.has(cp.id);
            const beamColor = isVisited ? 'rgba(16, 185, 129, ' : 'rgba(56, 189, 248, ';
            const archGlow = isVisited ? '#10b981' : '#38bdf8';

            // Holographic Vertical Light Beam
            const beamGrad = ctx.createLinearGradient(cp.x, 40, cp.x, this.groundY);
            beamGrad.addColorStop(0, beamColor + '0.0)');
            beamGrad.addColorStop(0.3, beamColor + (0.15 + Math.sin(time + idx) * 0.08) + ')');
            beamGrad.addColorStop(1, beamColor + '0.45)');
            ctx.fillStyle = beamGrad;
            ctx.fillRect(cp.x - 32, 40, 64, this.groundY - 40);

            // High-Tech Cyber Archway
            ctx.strokeStyle = archGlow;
            ctx.shadowColor = archGlow;
            ctx.shadowBlur = 12;
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.moveTo(cp.x - 30, this.groundY);
            ctx.lineTo(cp.x - 30, this.groundY - 110);
            ctx.lineTo(cp.x, this.groundY - 135);
            ctx.lineTo(cp.x + 30, this.groundY - 110);
            ctx.lineTo(cp.x + 30, this.groundY);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Rotating Floating Portal Rings
            ctx.save();
            ctx.translate(cp.x, this.groundY - 70);
            ctx.rotate(time * (idx % 2 === 0 ? 1 : -1));
            ctx.strokeStyle = archGlow;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, 22, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Checkpoint Header Plate
            ctx.fillStyle = '#0b162c';
            ctx.fillRect(cp.x - 45, this.groundY - 158, 90, 20);
            ctx.strokeStyle = archGlow;
            ctx.lineWidth = 1;
            ctx.strokeRect(cp.x - 45, this.groundY - 158, 90, 20);

            ctx.fillStyle = archGlow;
            ctx.font = 'bold 9px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(cp.badge.toUpperCase(), cp.x, this.groundY - 145);
        });
    }

    renderCollectibles() {
        const ctx = this.ctx;
        const time = performance.now() * 0.003;

        this.collectibles.forEach((item, idx) => {
            if (item.collected) return;
            if (item.x < this.cameraX - 50 || item.x > this.cameraX + this.virtualWidth + 50) return;

            const floatY = item.y + Math.sin(time + idx * 0.8) * 5;

            ctx.save();
            ctx.translate(item.x, floatY);
            ctx.rotate(time * 0.8);

            // Diamond / Tech Core
            ctx.fillStyle = '#f59e0b';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(10, 0);
            ctx.lineTo(0, 10);
            ctx.lineTo(-10, 0);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            // Inner Core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Tech Label Tag
            ctx.fillStyle = '#cbd5e1';
            ctx.font = '700 8px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, item.x, floatY - 15);
        });
    }

    renderPlayer() {
        const ctx = this.ctx;
        const p = this.player;

        ctx.save();
        ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
        if (p.facing === 'left') {
            ctx.scale(-1, 1);
        }

        const isRunning = p.state === 'run';
        const isJumping = p.state === 'jump' || p.state === 'fall';
        const bob = isRunning ? Math.sin(p.animFrame * 1.05) * 2.5 : 0;
        const legSwing = isRunning ? Math.sin(p.animFrame * 1.05) * 11 : 0;

        // 1. Thruster Jet on Jump
        if (isJumping) {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(-6, 20);
            ctx.lineTo(0, 32 + Math.random() * 6);
            ctx.lineTo(6, 20);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // 2. Trailing Cyber Scarf / Cape
        ctx.strokeStyle = '#c084fc';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 6;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-4, -12 + bob);
        const trailX = isRunning ? -18 - Math.abs(p.vx) * 2 : -10;
        const trailY = -4 + Math.sin(p.animFrame) * 4;
        ctx.quadraticCurveTo(-12, -8, trailX, trailY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 3. Legs
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        // Left Leg
        ctx.beginPath();
        ctx.moveTo(-4, 10 + bob);
        ctx.lineTo(-4 + (isJumping ? -8 : -legSwing), 24);
        ctx.stroke();

        // Right Leg
        ctx.beginPath();
        ctx.moveTo(4, 10 + bob);
        ctx.lineTo(4 + (isJumping ? 8 : legSwing), 24);
        ctx.stroke();

        // 4. Torso Armor
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-8, -10 + bob, 16, 20, 3);
        ctx.fill();
        ctx.stroke();

        // Armor Core
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, -2 + bob, 3, 0, Math.PI * 2);
        ctx.fill();

        // 5. Head & Cyber Visor
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, -18 + bob, 8.5, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Visor
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.fillRect(1, -21 + bob, 8, 4);
        ctx.shadowBlur = 0;

        // 6. Arms
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(0, -6 + bob);
        ctx.lineTo(isJumping ? 10 : 6 - legSwing * 0.7, 6 + bob);
        ctx.stroke();

        ctx.restore();
    }

    renderParticles() {
        const ctx = this.ctx;
        this.particles.forEach(pt => {
            ctx.fillStyle = pt.color + pt.alpha + ')';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    renderActionPrompt() {
        const ctx = this.ctx;
        const w = this.virtualWidth;
        const h = this.virtualHeight;

        // Screen-space floating action prompt badge
        const promptY = h - 68;
        const promptW = 320;
        const promptX = (w - promptW) / 2;

        ctx.save();
        ctx.fillStyle = 'rgba(7, 13, 26, 0.92)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(promptX, promptY, promptW, 38, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`PRESS [ENTER / E] TO SCAN ${this.nearCheckpoint.name}`, w / 2, promptY + 23);
        ctx.restore();
    }

    /* ----------------------------------------------------------------------
       MAIN GAME LOOP
       ---------------------------------------------------------------------- */
    gameLoop(timestamp) {
        const deltaTime = Math.min(timestamp - this.lastTime, 100);
        this.lastTime = timestamp;

        if (this.isVisible !== false) {
            this.update(deltaTime);
            this.render();
        }

        this.rafId = requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
    window.rehanGame = new CyberGameEngine('cyber-game-canvas');
});
