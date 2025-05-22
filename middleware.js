import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 🔓 Public routes (no auth required)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

// 🔐 Admin-only routes
const isAdminOnlyRoute = createRouteMatcher([
  '/api/revenue(.*)',
  '/api/users/create',
  '/api/users/update(.*)',
  '/api/users/(.*)',
  '/api/users/delete(.*)',
  '/api/admin(.*)',         
  '/api/webhooks/clerk(.*)',
]);

// 🧑‍💼 Manager and above routes (Admin, Manager)
const isManagerRoute = createRouteMatcher([
  '/api/reports(.*)',
  '/api/analytics(.*)',
]);

// 👥 General routes (Admin, Manager, Waiter, User)
const isGeneralApiRoute = createRouteMatcher([
  '/api/orders(.*)',
  '/api/menu(.*)',
  '/api/tables(.*)',       // Keep this if needed by all roles
  '/api/rooms(.*)',
  '/api/dashboard(.*)',
  '/api/reservation(.*)',
  '/api/reservation/add(.*)',
]);

// 🛠 Get role of user from your API
async function getUserRole(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return data.role?.toUpperCase(); // e.g., 'ADMIN'
    }

    return 'WAITER'; // Default fallback
  } catch (err) {
    console.error('Role fetch error:', err);
    return 'WAITER';
  }
}

// ⛔️ Deny access helper
function denyAccess(request, message) {
  if (request.url.includes('/api/')) {
    return NextResponse.json({ error: message }, { status: 403 });
  }
  return NextResponse.redirect(new URL('/', request.url));
}

// 🔐 Middleware Logic
export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return; // No auth needed
  }

  await auth.protect(); // Require auth for others

  const { userId } = await auth();

  // Skip role check for Clerk webhooks and internal user API reads
  if (
    request.nextUrl.pathname.includes('/api/webhooks/clerk') ||
    request.nextUrl.pathname.includes('/api/users/')
  ) {
    return;
  }

  if (userId) {
    const userRole = await getUserRole(userId);
    console.log(`User ${userId} has role: ${userRole}`);

    // 1. Admin-only check
    if (isAdminOnlyRoute(request) && userRole !== 'ADMIN') {
      return denyAccess(request, 'Access denied. Admin role required.');
    }

    // 2. Manager-only check
    if (isManagerRoute(request) && !['ADMIN', 'MANAGER'].includes(userRole)) {
      return denyAccess(request, 'Access denied. Manager role or higher required.');
    }

    // 3. General route check
    if (isGeneralApiRoute(request) && !['ADMIN', 'MANAGER', 'WAITER', 'USER'].includes(userRole)) {
      return denyAccess(request, 'Access denied. Authenticated user required.');
    }
  }
}, {
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
});

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:jpg|png|svg|css|js|ico|woff|ttf|otf)).*)',
    '/(api|trpc)(.*)',
  ],
};
