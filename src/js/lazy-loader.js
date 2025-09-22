/**
 * Lazy Loading System for Performance Optimization
 * Defers heavy animations and non-critical features until after initial load
 */

class LazyLoader {
    constructor() {
        this.loadedModules = new Set();
        this.pendingModules = new Map();
        this.isInitialized = false;

        // Performance thresholds
        this.performanceThresholds = {
            lowEnd: 2048, // 2GB RAM
            mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        };

        this.init();
    }

    init() {
        // Wait for DOM and initial critical resources
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startLazyLoading());
        } else {
            this.startLazyLoading();
        }
    }

    startLazyLoading() {
        // Defer non-critical animations
        requestIdleCallback(() => {
            this.loadCriticalAnimations();
        }, { timeout: 2000 });

        // Load heavy animations after initial paint
        setTimeout(() => {
            this.loadHeavyAnimations();
        }, 1000);

        // Load non-essential features last
        setTimeout(() => {
            this.loadNonEssentialFeatures();
        }, 3000);
    }

    async loadCriticalAnimations() {
        console.log('🎨 Loading critical animations...');

        // Load lightweight hover effects first
        await this.loadModule('hoverEffects', () => {
            // Initialize hover effects for cards and buttons
            this.initializeHoverEffects();
        });

        // Load smooth scrolling
        await this.loadModule('smoothScrolling', () => {
            this.initializeSmoothScrolling();
        });
    }

    async loadHeavyAnimations() {
        // Check device performance before loading heavy animations
        const deviceMemory = navigator.deviceMemory || 4;
        const isLowEnd = deviceMemory < this.performanceThresholds.lowEnd / 1024;

        if (isLowEnd || this.performanceThresholds.mobile) {
            console.log('📱 Low-end device detected, skipping heavy animations');
            return;
        }

        console.log('✨ Loading heavy animations...');

        // Load starfield background
        await this.loadModule('starfield', () => {
            if (window.StarfieldBackground) {
                window.StarfieldBackground.init();
            }
        });

        // Load particle effects
        await this.loadModule('particles', () => {
            if (window.ParticleSystem) {
                window.ParticleSystem.init();
            }
        });

        // Load cursor trails (desktop only)
        if (!this.performanceThresholds.mobile) {
            await this.loadModule('cursorTrails', () => {
                if (window.CursorTrails) {
                    window.CursorTrails.init();
                }
            });
        }
    }

    async loadNonEssentialFeatures() {
        console.log('🔧 Loading non-essential features...');

        // Load analytics trackers
        await this.loadModule('analytics', () => {
            if (window.AnalyticsTracker) {
                window.analyticsTracker = new window.AnalyticsTracker({
                    debug: false,
                    endpoint: '/api/analytics'
                });
            }
        });

        // Load progressive enhancements
        await this.loadModule('progressiveEnhancement', () => {
            if (window.ProgressiveEnhancement) {
                window.ProgressiveEnhancement.init();
            }
        });
    }

    async loadModule(moduleName, callback) {
        if (this.loadedModules.has(moduleName)) {
            return Promise.resolve();
        }

        if (this.pendingModules.has(moduleName)) {
            return this.pendingModules.get(moduleName);
        }

        const loadPromise = new Promise((resolve) => {
            // Use requestIdleCallback for better performance
            requestIdleCallback(() => {
                try {
                    callback();
                    this.loadedModules.add(moduleName);
                    console.log(`✅ Loaded module: ${moduleName}`);
                    resolve();
                } catch (error) {
                    console.error(`❌ Failed to load module ${moduleName}:`, error);
                    resolve(); // Don't block other modules
                }
            });
        });

        this.pendingModules.set(moduleName, loadPromise);
        return loadPromise;
    }

    initializeHoverEffects() {
        // Lightweight hover effects for cards
        const cards = document.querySelectorAll('.skill-card, .project-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.2s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    initializeSmoothScrolling() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance monitoring
    getPerformanceMetrics() {
        return {
            loadedModules: Array.from(this.loadedModules),
            deviceMemory: navigator.deviceMemory || 'unknown',
            isMobile: this.performanceThresholds.mobile,
            connectionType: navigator.connection?.effectiveType || 'unknown'
        };
    }
}

// Initialize lazy loader
const lazyLoader = new LazyLoader();

// Export for external access
window.LazyLoader = lazyLoader;