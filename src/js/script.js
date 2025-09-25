// Core bootstrap for portfolio application
// Coordinates initialization of modules, advanced animations, and progressive enhancements

import './modules/theme-manager.js';
import './modules/navigation.js';
import './modules/form-validator.js';
import {
  BrowserCompatibilityDetector
} from './modules/utilities.js';
import {
  StarfieldManager,
  ScrollSaturationController,
  WebGLParticleSystem,
  AdvancedCursorTrail,
  MagneticFieldController,
  EnhancedScrollAnimations,
  EnhancedHoverEffects,
  LoadingAnimations,
  AnimationPresetManager,
  AdvancedAnimationController,
  CursorTrailManager,
  EnhancedTiltManager
} from './modules/animations.js';
import {
  GlobalScrollManager,
  ChatSystemManager,
  MapManager
} from './modules/features.js';

function initializeMapManager() {
  try {
    new MapManager();
  } catch (error) {
    if (window.CONFIG?.DEBUG) {
      console.error('MapManager initialization failed', error);
    }
  }
}

function initializeAnimationSystems(compatibilityDetector) {
  const advancedAnimationController = new AdvancedAnimationController();

  const starfieldManager = new StarfieldManager();
  starfieldManager.enableRainbowMode = false;
  if (compatibilityDetector.performance.level === 'low' || compatibilityDetector.browser === 'ie') {
    starfieldManager.totalIcons = Math.min(100, starfieldManager.totalIcons);
  }
  advancedAnimationController.registerAnimation('starfield', starfieldManager);

  let webglParticleSystem = null;
  if (compatibilityDetector.features.webgl || compatibilityDetector.features.requestAnimationFrame) {
    const particleCanvas = createParticleCanvas();
    document.body.appendChild(particleCanvas);
    webglParticleSystem = new WebGLParticleSystem(particleCanvas);
  }

  let advancedCursorTrail = null;
  if (!compatibilityDetector.features.touchEvents && compatibilityDetector.features.addEventListener) {
    advancedCursorTrail = new AdvancedCursorTrail();
  }

  const magneticFieldController = new MagneticFieldController();
  if (compatibilityDetector.features.touchEvents || compatibilityDetector.performance.level === 'low') {
    magneticFieldController.strength = 25;
    magneticFieldController.maxDistance = 100;
  }

  const enhancedScrollAnimations = new EnhancedScrollAnimations();
  enhancedScrollAnimations.init();

  const enhancedHoverEffects = new EnhancedHoverEffects();
  enhancedHoverEffects.init();

  const loadingAnimations = new LoadingAnimations();
  loadingAnimations.init();

  const scrollSaturationController = new ScrollSaturationController();
  const cursorTrailManager = new CursorTrailManager();
  const enhancedTiltManager = new EnhancedTiltManager();

  advancedAnimationController.registerAnimation('particles', webglParticleSystem);
  advancedAnimationController.registerAnimation('cursorTrail', advancedCursorTrail);
  advancedAnimationController.registerAnimation('magneticField', magneticFieldController);
  advancedAnimationController.registerAnimation('legacyCursorTrail', cursorTrailManager);
  advancedAnimationController.registerAnimation('tiltEffects', enhancedTiltManager);

  return {
    advancedAnimationController,
    starfieldManager,
    webglParticleSystem,
    advancedCursorTrail,
    magneticFieldController,
    scrollSaturationController,
    cursorTrailManager,
    enhancedTiltManager
  };
}

function createParticleCanvas() {
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  particleCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2;
    opacity: 0.3;
  `;
  return particleCanvas;
}

function setupAnimationPresets(compatibilityDetector, animationSystems) {
  const animationPresetManager = new AnimationPresetManager();
  const systemsForPresets = {
    starfield: animationSystems.starfieldManager,
    cursorTrail: animationSystems.advancedCursorTrail,
    magneticField: animationSystems.magneticFieldController,
    particleSystem: animationSystems.webglParticleSystem
  };

  let defaultPreset = 'balanced';
  if (compatibilityDetector.performance.level === 'low' || compatibilityDetector.browser === 'ie') {
    defaultPreset = 'minimal';
  } else if (compatibilityDetector.performance.level === 'high' && !compatibilityDetector.features.touchEvents) {
    defaultPreset = 'enhanced';
  }

  animationPresetManager.currentPreset = defaultPreset;
  animationPresetManager.init(systemsForPresets);
  return animationPresetManager;
}

function setupKeyboardShortcuts(animationSystems) {
  document.addEventListener('keydown', (event) => {
    if (!(event.ctrlKey || event.metaKey)) {
      return;
    }

    switch (event.key) {
      case 'r':
        event.preventDefault();
        animationSystems.starfieldManager.toggleRainbowMode();
        break;
      case 't':
        event.preventDefault();
        if (animationSystems.advancedCursorTrail) {
          animationSystems.advancedCursorTrail.setActive(!animationSystems.advancedCursorTrail.isActive);
        }
        break;
      case 'm':
        event.preventDefault();
        animationSystems.magneticFieldController.setActive(!animationSystems.magneticFieldController.isActive);
        break;
      default:
        break;
    }
  });
}

function exposeDebugInterface(animationSystems, animationPresetManager) {
  window.getAnimationMetrics = () => ({
    starfield: animationSystems.starfieldManager.getPerformanceMetrics(),
    global: animationSystems.advancedAnimationController.getGlobalMetrics(),
    scrollSaturation: animationSystems.scrollSaturationController.getState(),
    systems: {
      webglSupported: animationSystems.webglParticleSystem?.isWebGLSupported,
      activeAnimations: animationSystems.advancedAnimationController.animations.size,
      currentPreset: animationPresetManager.currentPreset
    }
  });

  window.animationControls = {
    toggleRainbow: () => animationSystems.starfieldManager.toggleRainbowMode(),
    toggleCursorTrail: () => animationSystems.advancedCursorTrail?.setActive(!animationSystems.advancedCursorTrail.isActive),
    toggleMagnetic: () => animationSystems.magneticFieldController.setActive(!animationSystems.magneticFieldController.isActive),
    toggleScrollSaturation: (enabled) => animationSystems.scrollSaturationController.setEnabled(enabled !== false),
    refreshScrollSaturation: () => {
      animationSystems.scrollSaturationController.refreshBaseValues();
      animationSystems.scrollSaturationController.update(window.scrollY);
    },
    getScrollSaturationState: () => animationSystems.scrollSaturationController.getState(),
    setPreset: (preset) => animationPresetManager.setPreset(preset),
    getPresets: () => Object.keys(animationPresetManager.presets)
  };
}

function trackPageView() {
  if (window.analytics) {
    window.analytics.track('page_view', {
      event_category: 'engagement',
      event_label: 'home_page'
    });
  }
}

function applyReducedMotionPreference() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .project-card[data-tilt]:hover,
    .skill-card:hover,
    .hero-cta:hover,
    .contact-link-item:hover {
      transition-duration: 0.1ms !important;
      transform: none !important;
    }
    .cursor-trail {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function initializeGlobalScrollManager() {
  window.globalScrollManager = new GlobalScrollManager();
  window.globalScrollManager.addHandler('header', (scrollY) => {
    const header = document.querySelector('.header');
    if (!header) {
      return;
    }
    if (scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function bootstrapChatSystem() {
  window.chatSystemManager = new ChatSystemManager();
}

function debounce(func, wait) {
  let timeout;
  return function debounced(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle = false;
  return function throttled(...args) {
    if (inThrottle) {
      return;
    }
    func.apply(this, args);
    inThrottle = true;
    setTimeout(() => {
      inThrottle = false;
    }, limit);
  };
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeGlobalScrollManager();
    bootstrapChatSystem();
    initializeMapManager();
    applyReducedMotionPreference();

    const compatibilityDetector = new BrowserCompatibilityDetector();
    const animationSystems = initializeAnimationSystems(compatibilityDetector);
    const animationPresetManager = setupAnimationPresets(compatibilityDetector, animationSystems);

    setupKeyboardShortcuts(animationSystems);
    exposeDebugInterface(animationSystems, animationPresetManager);
    trackPageView();
  } catch (error) {
    if (window.CONFIG?.DEBUG) {
      console.error('Initialization error', error);
    }
  }
});

if (typeof window !== 'undefined') {
  window.debounce = debounce;
  window.throttle = throttle;
  window.isInViewport = isInViewport;
}
