```markdown
# Design System Specification

## 1. Overview & Creative North Star: "The Sonic Canvas"

This design system is built to move beyond the functional and into the emotional. The "Creative North Star" is **The Sonic Canvas**—a philosophy where the interface acts as a high-end editorial stage for Caribbean culture. Unlike standard SaaS platforms that prioritize flat, rigid grids, this system embraces **Rhythmic Immersion**. 

We achieve this through:
*   **Intentional Asymmetry:** Breaking the vertical axis with overlapping elements and "heroic" imagery that bleeds off-canvas.
*   **Cinematic Depth:** Using layers of transparency and light rather than lines to define space.
*   **Culture-Driven Typography:** Utilizing massive scale shifts to mirror the booming bass and sharp highs of a premium audio experience.

The goal is a "Music-First" atmosphere where every interaction feels like a tactile, professional studio environment—deep, rhythmic, and undeniably premium.

---

## 2. Colors & Tonal Depth

The palette is rooted in the deep shadows of a late-night recording studio, punctuated by high-vibrancy cultural accents.

### The Palette
*   **Base:** `surface` (#131313) provides the charcoal foundation.
*   **Accents:** `primary` (#6add84) serves as the vibrant Reggae Green, `secondary_fixed_dim` (#e9c400) acts as the Gold, and `tertiary_container` (#ff5543) provides the Red heat.
*   **Hierarchy:** Use `on_surface` (#e5e2e1) for high-contrast reading and `on_surface_variant` (#bdcabb) for secondary metadata.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Boundaries must be defined through background color shifts. 
*   Place a `surface_container_low` section against a `surface` background to create a subtle break.
*   Use `surface_container_highest` for interactive elements to "lift" them out of the dark base.

### Surface Hierarchy & Nesting
Treat the UI as stacked physical layers of smoked glass.
1.  **Bottom Layer:** `surface_container_lowest` (#0e0e0e) for the deep background.
2.  **Content Layer:** `surface_container` (#201f1f) for main content blocks.
3.  **Elevation Layer:** `surface_container_highest` (#353534) for cards or highlighted items.

### The "Glass & Gradient" Rule
To escape the "template" look, all floating overlays (modals, player controls, dropdowns) must use **Glassmorphism**.
*   **Background:** `surface_variant` (#353534) at 60% opacity.
*   **Effect:** `backdrop-filter: blur(20px)`.
*   **Signature Textures:** Use a subtle linear gradient on primary CTAs, transitioning from `primary` (#6add84) to `primary_container` (#2da553) at a 135-degree angle.

---

## 3. Typography

The typography strategy is a dialogue between the "Rhythm" (Display) and the "Narrative" (Body).

*   **Display & Headlines (Epilogue):** This is your lead instrument. Use `display-lg` and `headline-lg` in uppercase for main headings to evoke the bold, unapologetic nature of Reggae posters. The heavy weight of Epilogue creates a "cinematic" weight that grounds the vibrant colors.
*   **Body & Titles (Inter):** Inter provides a clean, technical counterpoint. Use `body-lg` for readability and `label-sm` for technical metadata (BPM, Key, Duration).
*   **Scale as Contrast:** Don't be afraid of the gap. A `display-lg` header paired immediately with a `body-md` description creates a high-end, editorial feel that standard layouts lack.

---

## 4. Elevation & Depth

We eschew traditional drop shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" the surface tiers. A `surface_container_low` card sitting on a `surface` background provides a soft, natural lift.
*   **Ambient Shadows:** If an element must float (e.g., a music player bar), use a large, ultra-diffused shadow.
    *   **Blur:** 40px–60px.
    *   **Opacity:** 6% of the `on_background` color. This mimics natural light dissipation in a dark room.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a "Ghost Border." Apply the `outline_variant` token at 15% opacity. Never use 100% opaque lines.
*   **Glassmorphism Integration:** Use `surface_variant` with a backdrop blur to ensure content doesn't feel "pasted on" but rather integrated into the atmospheric depth of the site.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. `md` (0.75rem) roundedness. No border. Text is `on_primary` (Bold).
*   **Secondary:** `surface_container_highest` fill with a `primary` "Ghost Border" (20% opacity).
*   **Tertiary:** Ghost button using `on_surface` text with no background.

### Cards & Lists
*   **The Rule:** Forbid divider lines.
*   **Layout:** Use vertical whitespace (32px–48px) and `surface_container_low` backgrounds to group related items.
*   **Imagery:** Use `xl` (1.5rem) rounded corners for album art and large hero images to soften the high-impact typography.

### Chips
*   **Selection:** `primary_container` background with `on_primary_container` text.
*   **Filter:** `surface_container_high` with a subtle hover transition to `primary`.

### Specialized Components: The "Vibe Player"
*   **Visuals:** A full-width glassmorphic bar at the bottom of the viewport.
*   **Background:** `surface_variant` @ 70% opacity + 30px backdrop blur.
*   **Control Accents:** Use `secondary_fixed` (Gold) for the progress bar to signify the "Gold Standard" of the audio being played.

---

## 6. Do's and Don'ts

### Do:
*   **Use Massive Imagery:** Treat photography as a background layer, often behind typography, using `surface_dim` overlays to maintain readability.
*   **Embrace Space:** Allow elements to breathe. Large margins emphasize the "premium" nature of the content.
*   **Animate Transitions:** Use "rhythmic" easing (gentle cubic-beziers) when hovering over cards to mimic a physical bounce.

### Don't:
*   **Don't Use Pure White Borders:** It breaks the cinematic immersion and looks "cheap."
*   **Don't Overuse the Accent Colors:** Use Red (`tertiary`) and Gold (`secondary`) sparingly for "micro-moments" (like a 'Live' tag or a 'Premium' badge).
*   **Don't Use Default Grids:** Try offsetting images by 10-20px from the text alignment to create a sophisticated, editorial flow.
*   **Don't Use Hard Shadows:** Shadows should be felt, not seen. If you can see the edge of a shadow, it’s too dark.

---
**Director's Final Note:** This design system is about the "dub" of digital design—stripping away the unnecessary noise (lines, boxes, flat colors) and leaving only the rhythm, the light, and the soul of the culture. Keep it deep, keep it clean.```
