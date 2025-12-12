/**
 * Vercel Web Analytics Integration
 * This file initializes Vercel Web Analytics on the client-side
 */

import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
// This must run on the client side and will track page views and events
if (typeof window !== 'undefined') {
  inject();
}
