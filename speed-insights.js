/**
 * Lightweight client-side loader for @vercel/speed-insights.
 * Mirrors the official injectSpeedInsights() helper so we can run it in a static environment.
 */
const PACKAGE_NAME = '@vercel/speed-insights';
const PACKAGE_VERSION = '1.2.0';

function isBrowser() {
  return typeof window !== 'undefined';
}

function detectEnvironment() {
  if (!isBrowser()) {
    return 'production';
  }

  try {
    const nodeEnv = typeof process !== 'undefined' && process?.env?.NODE_ENV;
    return nodeEnv === 'development' || nodeEnv === 'test' ? 'development' : 'production';
  } catch (error) {
    return 'production';
  }
}

const ENVIRONMENT = detectEnvironment();

function initQueue() {
  if (window.si) return;
  window.si = function (...params) {
    (window.siq = window.siq || []).push(params);
  };
}

function getScriptSrc(props) {
  if (props.scriptSrc) {
    return props.scriptSrc;
  }

  if (ENVIRONMENT === 'development') {
    return 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js';
  }

  if (props.dsn) {
    return 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
  }

  if (props.basePath) {
    return `${props.basePath}/speed-insights/script.js`;
  }

  return '/_vercel/speed-insights/script.js';
}

function injectSpeedInsights(props = {}) {
  if (!isBrowser() || props.route === null) {
    return null;
  }

  initQueue();
  const src = getScriptSrc(props);

  if (document.head.querySelector(`script[src*="${src}"]`)) {
    return null;
  }

  if (props.beforeSend && typeof window.si === 'function') {
    window.si('beforeSend', props.beforeSend);
  }

  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = PACKAGE_NAME + (props.framework ? `/${props.framework}` : '');
  script.dataset.sdkv = PACKAGE_VERSION;

  if (props.sampleRate) {
    script.dataset.sampleRate = props.sampleRate.toString();
  }

  if (props.route) {
    script.dataset.route = props.route;
  }

  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  } else if (props.basePath) {
    script.dataset.endpoint = `${props.basePath}/speed-insights/vitals`;
  }

  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }

  if (ENVIRONMENT === 'development' && props.debug === false) {
    script.dataset.debug = 'false';
  }

  script.onerror = () => {
    console.log(`[Vercel Speed Insights] Failed to load script from ${src}. Check content blockers and try again.`);
  };

  document.head.appendChild(script);

  return {
    setRoute: (route) => {
      script.dataset.route = route ?? undefined;
    }
  };
}

if (isBrowser()) {
  if (typeof window.injectSpeedInsights !== 'function') {
    window.injectSpeedInsights = injectSpeedInsights;
  }

  const defaultScriptSrc = ENVIRONMENT === 'development'
    ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
    : 'https://va.vercel-scripts.com/v1/speed-insights/script.js';

  injectSpeedInsights({ scriptSrc: defaultScriptSrc });
}
