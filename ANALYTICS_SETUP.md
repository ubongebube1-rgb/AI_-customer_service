# Vercel Web Analytics Setup Guide

## Overview
This project has been configured with Vercel Web Analytics to track user interactions and page performance metrics.

## Installation & Configuration

### 1. Dependencies Installed
- `@vercel/analytics` - Official Vercel Web Analytics package

Install dependencies using:
```bash
npm install
```

### 2. Integration Methods

#### Method 1: Plain HTML (Current Implementation)
For plain HTML sites, the analytics script is injected directly into the HTML template:

**Location**: `app/templates/index.html`

The analytics code:
- Tracks page views on load
- Monitors user voice interactions (microphone button clicks)
- Uses `navigator.sendBeacon()` for reliable event delivery
- Captures page URL and timestamp for each event

**Key Features**:
- No build step required
- Works with server-side rendered templates
- Automatically sends events to Vercel Analytics endpoint

#### Method 2: Module-based (For Future Node.js Integration)
For Node.js/JavaScript frameworks, use the `@vercel/analytics` package:

```javascript
import { inject } from '@vercel/analytics';

// Initialize analytics on client-side only
if (typeof window !== 'undefined') {
  inject();
}
```

This approach is provided in `app/static/analytics.js` for reference and future use.

### 3. How It Works

The analytics integration:

1. **Page View Tracking**: Automatically sends a pageview event when the HTML loads
2. **Event Tracking**: Monitors user interactions (like the microphone button)
3. **Data Transmission**: Uses the Beacon API for reliable, non-blocking delivery to Vercel's endpoint
4. **Web Vitals**: When used with the npm package, also captures Core Web Vitals (LCP, FID, CLS)

### 4. Tracked Events

- **pageview**: Sent on page load
  - Includes: page pathname, full href, timestamp
  
- **voice_interaction**: Sent when user clicks the microphone button
  - Indicates user engagement with the voice feature

### 5. Environment Setup

For full analytics features on Vercel:

1. Deploy to Vercel (supports Python via `@vercel/python` builder)
2. Vercel will automatically enable analytics dashboard
3. View analytics at: https://vercel.com/dashboard/[project]/analytics

### 6. Configuration Files

- `package.json` - Node.js dependencies (Vercel Analytics SDK)
- `requirements.txt` - Python dependencies (Flask, etc.)
- `vercel.json` - Deployment configuration for Vercel
- `ANALYTICS_SETUP.md` - This setup guide

### 7. Privacy & Data

- Vercel Web Analytics respects user privacy
- No personally identifiable information (PII) is collected
- Follows GDPR compliance standards
- Events are sent via HTTPS to Vercel's secure endpoint

### 8. Testing Analytics

To verify analytics are working:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click the microphone button
4. Look for requests to `vitals.vercel-analytics.com`
5. Each user interaction should trigger a beacon request

### 9. Customization

To track additional events, use the global function available after page load:

```javascript
// Anywhere in your JavaScript after the analytics script loads
if (typeof window.trackAnalyticsEvent === 'function') {
  window.trackAnalyticsEvent('custom_event', { customData: 'value' });
}
```

## Next Steps

1. Deploy to Vercel using Git
2. Enable analytics in Vercel dashboard
3. Monitor user engagement and performance metrics
4. Adjust tracking as needed based on business requirements

## Resources

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Beacon API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)
