/**
 * Estas rutas no requieren autentificación
 */
export const publicRoutes = [
    ""
];

/**
 * Estas rutas son usadas para autentificar al usuario
 */
export const authRoutes = [
    "/login",
];

/**
 * El prefijo para la Api de autentificación
 * Las rutas que empiezan con este prefijo son usadas para API Autentificacion propositos
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path for redirect after success auth
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
