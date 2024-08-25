/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * The prefix for Recruiter authentication routes
 * Routes that start with this prefix are used for Recruiter authentication purposes
 * @type {string}
 */
export const recruiterPrefix = "/recruiter";

/**
 * The prefix for Talent authentication routes
 * Routes that start with this prefix are used for Talent authentication purposes
 * @type {string}
 */
export const talentPrefix = "/talent";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * The default redirect path to confirm role after login
 * @type {string}
 */
export const UPDATE_ROLE_REDIRECT = "/role";
