import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/webhooks/clerk(.*)',
  '/api/(.*)',
]);
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect(); // Protect private routes
  }

  const { sessionClaims } = await auth(); // Use this safely
  const role = sessionClaims?.metadata?.role;

  console.log('User role:', role); // Log the role

  // Check if user is trying to access admin route
  if (isAdminRoute(request) && role !== 'Admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

}, {
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
});

export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:jpg|png|svg|css|js|ico)).*)', // everything except static files
    '/(api|trpc)(.*)',
  ],
};
