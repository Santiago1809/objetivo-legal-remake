# Proposal: Premium Redesign

## Intent

Rediseñar TODOS los estilos de la página landing de Objetivo Legal aplicando principios de diseño ultra-premium (design-taste-frontend + high-end-visual-design). El objetivo es reflejar la calidad profesional de un bufete de abogados de élite mediante tipografías premium, spacing perfecto, micro-interactions fluidas, y composiciones asimétricas con heroes de fondo fotográfico. Elevar la percepción de valor mediante diseño arquitectónico y cuidado obsesivo de cada detalle visual.

## Scope

### In Scope
- **Navbar**: Floating pill glass-morphism, navegación fluida con hamburger morph animation
- **Hero Landing**: Asymmetric split screen con foto Pexels #12127531 (Medellín), tipografía masiva (Noto Serif), CTA magnetic buttons
- **Practice Areas Section**: Bento grid asimétrico (3+2 layout), card double-bezel, spacing masivo
- **Tariffs Section**: Pricing cards con inner refraction borders, spacing generoso, highlight states smooth
- **Distillation Section**: Editorial asymmetric layout, tipografía variable serif, scroll-reveal animations
- **Process Section**: 5-step visual timeline con perpetual micro-animations (staggered reveals)
- **Contact Form**: Nested double-bezel architecture, input styling premium, error/success states
- **Footer**: Structured typography, color-coded link hierarchy, copyright refinement

### Out of Scope
- Backend API changes
- Database or data structure modifications
- Mobile app variants
- Multi-language support beyond existing copy
- Third-party integrations (Segment, analytics, etc.)

## Capabilities

### New Capabilities
None — this is a pure design refinement, no new functionality.

### Modified Capabilities
- `landing-page-ui`: Requirement for visual design changes significantly. All visual hierarchy, spacing, typography, and motion require redesign per premium principles.

## Approach

**Phase 1: Architecture & System**
1. Load design-taste-frontend + high-end-visual-design skills and understand all principles
2. Establish design tokens: Deep Plum (#401C34) primary, Gold (#9A8C5B) secondary, Noto Serif + Manrope typography stack
3. Apply Double-Bezel (Doppelrand) nested container architecture to all major sections
4. Use Tailwind v4 variables for spacing scale (pt-24, py-40 sections minimum)

**Phase 2: Component Redesign**
1. **Navbar**: Floating pill (`rounded-full`), glass effect (`backdrop-blur-2xl`), hamburger morph animation
2. **Hero**: Split asymmetric (text left, image right), Pexels photo with subtle fade, massive typography (`text-6xl tracking-tighter`)
3. **Feature Cards**: Bento masonry grid with varied col-spans, Double-Bezel styling, soft ambient shadows
4. **CTAs**: Magnetic button physics, nested icon circles, smooth spring transitions

**Phase 3: Motion & Micro-interactions**
1. Staggered scroll-reveal animations on all entry states
2. Perpetual micro-interactions (floating icons, breathing badges)
3. Smooth cubic-bezier transitions (no linear easing)
4. Hardware-accelerated animations (transform + opacity only)

**Phase 4: QA & Polish**
1. Verify all sections collapse gracefully to single-column on mobile (<768px)
2. Audit z-index discipline
3. Performance check: no blur on scrolling containers, GPU optimization
4. Accessibility: color contrast, keyboard navigation, semantic HTML

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/Navbar.astro` | Modified | Floating pill glass-morphism, hamburger morph animation, staggered menu reveal |
| `src/components/HeroLanding.astro` | Modified | Asymmetric split layout, Pexels photo, massive typography, magnetic CTA |
| `src/components/PracticeAreasSection.astro` | Modified | Bento grid, Double-Bezel cards, perpetual micro-animations |
| `src/components/TariffsSection.astro` | Modified | Premium pricing cards, inner refraction borders, smooth transitions |
| `src/components/DistillationSection.astro` | Modified | Editorial asymmetric layout, variable serif typography |
| `src/components/ProcessSection.astro` | Modified | 5-step timeline with staggered scroll-reveals |
| `src/components/ContactForm.astro` | Modified | Nested Double-Bezel inputs, error/success states, form flow animation |
| `src/components/Footer.astro` | Modified | Structured typography, link hierarchy, refined spacing |
| `src/styles/global.css` | Modified | Premium design tokens, custom cubic-bezier variables, typography utilities |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Performance degradation from blur/animations | Medium | Apply blur only to fixed elements, use transform + opacity, memoize animations, test mobile frame rates |
| Mobile layout breakage on asymmetric designs | Medium | Strict single-column fallback below 768px, test on real devices (iOS Safari) |
| Color contrast accessibility issues | Low | Verify all text/background pairs meet WCAG AA minimum (4.5:1 ratio) |
| Inconsistent spacing across components | Low | Use CSS custom properties for spacing scale, enforce via design system |

## Rollback Plan

1. **Git Revert**: Roll back all component changes with `git revert HEAD~N` or individual component files
2. **Backup Original Styles**: Preserve original `src/styles/` folder in a backup branch
3. **Phased Rollback**: If specific components fail, revert only those components while keeping approved ones
4. **Test Before Merging**: Use preview deployments to validate all changes before final merge to main

## Dependencies

- **Tailwind CSS v4.2.4** (already installed)
- **Astro 6.2.1** (already installed)
- **Pexels Photo #12127531** (already identified for hero background)
- **Logo File**: `/public/logo.png` (must exist)

## Success Criteria

- [ ] All page sections visually redesigned per premium principles (design-taste-frontend + high-end-visual-design)
- [ ] Navbar floats with glass effect and smooth hamburger morph animation
- [ ] Hero section is asymmetric split with Pexels photo background and magnetic CTA
- [ ] All cards use Double-Bezel nested architecture with soft ambient shadows
- [ ] Spacing is generous (`py-24` minimum per section), typography is premium (Noto Serif + Manrope)
- [ ] Motion animations use custom cubic-bezier (no linear), hardware-accelerated (transform + opacity only)
- [ ] Mobile layout collapses gracefully to single-column below 768px
- [ ] Color palette consistently applied (Deep Plum primary, Gold secondary, white text on secondary buttons)
- [ ] All interactive elements include loading/error/success states
- [ ] Accessibility verified: color contrast, keyboard navigation, semantic HTML
- [ ] Performance validated: no frame drops on mobile, blur only on fixed elements
- [ ] Lighthouse scores: Performance > 85, Accessibility > 95, Best Practices > 90
