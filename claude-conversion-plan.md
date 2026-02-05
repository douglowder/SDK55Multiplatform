# Plan: Add react-native-css with Media Queries

## Overview

Replace the JS-based responsive system (`useScreenDimensions` + dynamic `StyleSheet.create`) with CSS classes and `@media` queries using `react-native-css@3.0.1`. The app currently uses a continuous scale factor (`max(w,h)/1000`) and a `landscape` boolean to adapt layouts. CSS media queries will handle orientation and screen-size breakpoints instead.

## Step 1: Install react-native-css

```bash
npm install react-native-css@3.0.1
```

## Step 2: Create `metro.config.js`

Create at project root. Use `withReactNativeCSS` with `globalClassNamePolyfill: true` so standard RN components (`View`, `Text`, `ScrollView`, etc.) accept `className`.

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withReactNativeCSS } = require("react-native-css/metro");

const defaultConfig = getDefaultConfig(__dirname);
module.exports = withReactNativeCSS(defaultConfig, {
  globalClassNamePolyfill: true,
});
```

**File:** `/Users/dlowder/projects/SDK55Multiplatform/metro.config.js` (new)

## Step 3: Extend `src/global.css`

Add CSS custom properties for spacing, theme colors, typography, and layout classes. Use media queries for responsive behavior.

**Key CSS features to use:**
- `:root` variables for spacing (`--spacing-half` through `--spacing-six`)
- `@media (prefers-color-scheme: dark)` for theme colors
- `@media (orientation: landscape)` for landscape layout overrides
- `@media (min-height: ...)` breakpoints for scaling font sizes on larger screens (tablets, TVs)
- Layout utility classes for each screen/component

**CSS classes to define (examples):**
- `.home-container`, `.home-safe-area`, `.home-hero`, `.home-title-container`, `.home-step-container`
- `.explore-scroll`, `.explore-content`, `.explore-sections-wrapper`, `.explore-sections-column`
- `.text-title`, `.text-subtitle`, `.text-default`, `.text-small`, `.text-code`, `.text-link`
- `.themed-view`, `.themed-view-element`, `.themed-view-selected`
- `.hint-row`, `.hint-code-snippet`
- `.collapsible-heading`, `.collapsible-content`, `.collapsible-button`
- `.tab-list-container`, `.tab-inner-container`, `.tab-button`
- `.about-container`, `.about-dismiss-button`
- `.focus-demo-container`, `.focus-demo-inner`
- `.badge-container`, `.badge-image`

**Media query structure:**
```css
/* Base (portrait, phone) */
.home-safe-area { margin-top: 0; margin-bottom: 64px; gap: 16px; }

@media (orientation: landscape) {
  .home-safe-area { margin-top: 64px; margin-bottom: 8px; }
  .explore-sections-wrapper { flex-direction: row; }
  .explore-sections-column { width: 50%; }
}

/* Larger screens (tablets) */
@media (min-height: 900px) {
  .text-title { font-size: 56px; }
  /* scale spacing up */
}

/* TV / very large screens */
@media (min-height: 1200px) {
  .text-title { font-size: 72px; }
}
```

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/global.css` (modify)

## Step 4: Update `ThemedView` to forward `className`

Add `className?: string` to `ThemedViewProps` and pass it through to the underlying `View`.

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/components/themed-view.tsx`

## Step 5: Update `ThemedText` to forward `className`

Add `className?: string` to `ThemedTextProps` and pass it through. Replace the dynamic `useTextStyles()` hook with CSS classes for typography (`.text-title`, `.text-subtitle`, etc.). The component will apply the appropriate className based on the `type` prop.

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/components/themed-text.tsx`

## Step 6: Convert Home Screen (`index.tsx`)

Replace `useHomeStyles()` with CSS classes. Remove `useScreenDimensions` import. Use `className` on `ThemedView` and `ThemedText` components. The landscape/portrait differences will be handled by `@media (orientation: landscape)` in CSS.

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/app/(tabs)/index.tsx`

## Step 7: Convert Explore Screen (`explore.tsx`)

Replace `useExploreStyles()` with CSS classes. The two-column landscape layout becomes a CSS media query. Keep platform-specific padding logic in JS (Platform.select for Android safe area insets).

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/app/(tabs)/explore.tsx`

## Step 8: Convert TV Focus Demo Screen (`tv_focus.tsx`)

Replace `useFocusDemoScreenStyles()` with CSS classes. The layout is simpler here - mostly spacing.

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/app/(tabs)/tv_focus.tsx`

## Step 9: Convert About Screen (`about.tsx`)

Replace `useAboutStyles()` with CSS classes.

**File:** `/Users/dlowder/projects/SDK55Multiplatform/src/app/about.tsx`

## Step 10: Convert Components

### HintRow (`hint-row.tsx`)
Replace `useHintStyles()` with CSS classes.

### WebBadge (`web-badge.tsx`)
Replace `useBadgeStyles()` with CSS classes. Keep focused/pressed state logic in JS (inline style merging).

### Collapsible (`ui/collapsible.tsx`)
Replace `useCollapsibleStyles()` with CSS classes.

### AppTabs Web (`app-tabs.web.tsx`)
Replace `useTabStyles()` with CSS classes.

## Step 11: Keep JS styles for complex/animation components

These files will NOT be converted (or only partially):
- `animated-icon.tsx` / `animated-icon.native.tsx` - Reanimated keyframes need JS styles
- `use-animated-styles.ts` - Dynamic height-based calculations for animations
- `tv-event-demo.tsx` - Heavily dynamic styles (theme colors for pressed states, width/height calculations)
- `app-tabs.tsx` (native) - Uses NativeTabs component, not style-based
- `_layout.tsx` files - Navigation config styles (contentStyle on Stack.Screen)

## Files Summary

| File | Action |
|------|--------|
| `metro.config.js` | Create |
| `src/global.css` | Extend with CSS classes + media queries |
| `src/components/themed-view.tsx` | Add className forwarding |
| `src/components/themed-text.tsx` | Add className forwarding, use CSS for typography |
| `src/app/(tabs)/index.tsx` | Replace JS styles with CSS classes |
| `src/app/(tabs)/explore.tsx` | Replace JS styles with CSS classes |
| `src/app/(tabs)/tv_focus.tsx` | Replace JS styles with CSS classes |
| `src/app/about.tsx` | Replace JS styles with CSS classes |
| `src/components/hint-row.tsx` | Replace JS styles with CSS classes |
| `src/components/web-badge.tsx` | Replace JS styles with CSS classes |
| `src/components/ui/collapsible.tsx` | Replace JS styles with CSS classes |
| `src/components/app-tabs.web.tsx` | Replace JS styles with CSS classes |

## Verification

1. Run `npx expo start` and test on web - verify layouts respond to browser resize (orientation, width breakpoints)
2. Run on iOS simulator (phone + tablet) - verify portrait/landscape switching
3. Run on Android emulator - verify same
4. Verify dark mode toggle works (colors respond to `prefers-color-scheme`)
5. Verify the explore screen shows two columns in landscape, one in portrait
6. Verify the home screen spacing adjusts between orientations
7. Verify animations still work (they remain in JS)
