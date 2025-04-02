
// Configuration management for the application
// Centralizes all environment variable access

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api",
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === "true" || false,
};

// Auth configuration
export const AUTH_CONFIG = {
  TOKEN_STORAGE_KEY: "auth_token",
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true" || false,
};

// App settings
export const APP_CONFIG = {
  APP_NAME: "DevHub",
  APP_VERSION: "1.0.0",
};

// Timeouts
export const TIMEOUTS = {
  API_REQUEST: 10000, // 10 seconds
};
