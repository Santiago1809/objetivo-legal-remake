# Proposal: Corregir Diseño Stitch

## Intent

Las páginas actuales (Landing Page, Derecho de Daños, Insolvencia) fueron implementadas sin aplicar las especificaciones visuales exactas del diseño Stitch generado. Existen desalineaciones en:
- Uso inconsistente de colores (Deep Plum, Gold, Cream)
- Tipografías no aplicadas correctamente (Noto Serif para headlines, Manrope para body)
- Estructura visual que no respeta la arquitectura de secciones sin borders
- Componentes faltantes o mal organizados (navbar, hero, cards, formulario)

## Scope

### In Scope
- Corregir Landing Page (`index.astro`): navbar, hero, secciones, cards, formulario, footer
- Alinear paleta de colores a Deep Plum (#401C34), Gold (#9A8C5B), Cream (#fff8f9)
- Aplicar tipografías: Noto Serif (headlines), Manrope (body)
- Implementar card-based layouts sin borders (color shifts)
- Validar componentes: Navbar, Hero, ServiceCard, ContactForm, Footer
- Sincronizar página Derecho de Daños e Insolvencia con mismo diseño

### Out of Scope
- Agregar nuevas secciones o funcionalidad
- Cambios en contenido o copytexts
- Migrations de datos
- Testing E2E (pero verificar visualmente)

## Capabilities

### Modified Capabilities
- `landing-page-design`: Alineación visual a Stitch (colores, tipografías, layout)
- `navbar-component`: Aplicar logo gavel, botón Contactar, colores exactos
- `hero-section`: Imagen skyline Medellín, gradient, badge, tipografía
- `service-cards`: Cards sin borders, color shifts, layout responsive
- `contact-form`: Campos ajustados, colores, validación visual
- `footer-links`: Links alineados, colores, tipografía

## Approach

1. **Auditar componentes actuales** vs. especificación Stitch
2. **Actualizar Tailwind config** si es necesario para colores exactos
3. **Refactor componentes UI**: aplicar colores y tipografía consistentemente
4. **Validar layouts**: sin borders, color shifts entre secciones
5. **Testing visual**: revisar en desktop y mobile

## Affected Areas

| Área | Impacto | Descripción |
|------|---------|------------|
| `src/components/ui/Navbar.astro` | Modificado | Logo + botón Contactar, colores exactos |
| `src/components/ui/Hero.astro` | Modificado | Badge, título, subtítulo, imagen, gradient |
| `src/components/ui/ServiceCard.astro` | Modificado | Layout sin borders, color shifts |
| `src/components/ui/Footer.astro` | Modificado | Links, colores, tipografía |
| `src/components/islands/ContactForm.astro` | Modificado | Campos, validación visual |
| `src/pages/index.astro` | Modificado | Secciones, uso de componentes |
| `src/styles/global.css` | Modificado | Variables de color, tipografía |
| `astro.config.mjs` | Verificado | Tailwind config con colores exactos |

## Risks

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|-----------|
| Desviación visual vs. Stitch | Media | Captura de diseño Stitch como referencia de verdad |
| Inconsistencia cross-browser | Baja | Testing en Firefox, Chrome, Safari |
| Performance (imágenes hero) | Media | Optimizar imagen skyline, lazy load |

## Rollback Plan

```bash
git revert <commit-hash>
```

Todos los cambios están en componentes aislados. No hay cambios a db/api, por lo que revert es seguro.

## Success Criteria

- [ ] Colores exactos: Deep Plum, Gold, Cream en toda la página
- [ ] Tipografías: Noto Serif headlines, Manrope body
- [ ] Navbar: logo + botón "Contactar" alineados
- [ ] Hero: imagen, gradient, badge, CTA visible
- [ ] Secciones: sin borders, color shifts claros
- [ ] Cards: layout responsive, sin borders
- [ ] Formulario: campos visibles, colores exactos
- [ ] Footer: links y tipografía alineados
- [ ] Mobile: responsive a breakpoints (md: 768px)
