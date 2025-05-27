import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { checkRole } from './utils/roles'

// Define public routes (no auth needed)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/api/menu/add(.*)',
  '/api/dashboard(.*)',
  '/api/orders/add(.*)',
  '/api/orders/update-status(.*)',
  '/api/expense/add(.*)',
  '/api/expense/category/add(.*)',
  '/api/expense/delete(.*)',
  '/api/expense/update(.*)',
  '/api/revesvation/add(.*)',
  '/api/reservation/delete(.*)',
  '/api/revesvation/update(.*)',
  '/api/revesvation/updateStatus(.*)',
  '/api/revenue/daily(.*)',
  '/api/revenue/monthly(.*)',
  '/api/revenue/monthly-bay-day(.*)',
  '/api/revenue/expenses(.*)',
  '/api/rooms/delete(.*)',
  '/api/table/delete(.*)',
  '/api/table/update(.*)',
  '/api/table/updateStatus(.*)',
  '/api/users/update(.*)',
  '/api/users/delete(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // ✅ If it’s a public route, no auth/role check needed
  if (isPublicRoute(req)) return

  // 🔐 Enforce authentication
  await auth.protect()

  // 🔒 Role-based check for protected routes
  if (isProtectedRoute(req)) {
    return await checkRole(auth, req, 'Admin')
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
