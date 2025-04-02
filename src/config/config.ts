
// Configuration management for the application
// Centralizes all environment variable access

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api",
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === "true" || true, // Default to true for development
};

// Auth configuration
export const AUTH_CONFIG = {
  TOKEN_STORAGE_KEY: "auth_token",
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  TOKEN_REFRESH_THRESHOLD: 15 * 60 * 1000, // 15 minutes in milliseconds
};

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true" || false,
  ENABLE_FAVORITES: true,
  ENABLE_SHARING: true,
};

// App settings
export const APP_CONFIG = {
  APP_NAME: "DevHub",
  APP_VERSION: "1.0.0",
  SHARE_BASE_URL: window.location.origin,
};

// Timeouts
export const TIMEOUTS = {
  API_REQUEST: 10000, // 10 seconds
};
