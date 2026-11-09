# Clouds Sky relaunch — launch readiness

## Completed on website-relaunch-v1
- Responsive DE/EN page structure, original repository CSG logo.
- 28 localized pages including Volkswagen, Bayer and MAN / SYNAOS case studies plus two technical insights articles.
- Client ticker, pause control and language dropdown.
- Volkswagen architecture evolution + technical case narrative; Bayer enterprise applications and MAN industrial messaging with explicit attribution.
- Build-time static HTML pre-rendering, localized SEO metadata, CI link checks and downloadable review artifact.
- Four PROVISIONAL monochrome SVG customer icons from Simple Icons: Volkswagen, MAN, SAP and Deutsche Telekom; the remaining names are text.
- Vaillant Kafka/Azure is included in the client strip and work overview.
- Kubernautic invitation on the homepage (currently links to kubernautic.com, not directly to an authenticated trial).

## Must resolve before production
1. Replace provisional third-party brand icons with the officially approved logo versions, or verify their use and brand-asset guidelines. **Customer names may be approved while specific marks/artwork remain restricted.**
2. Confirm all published project assertions, contractual attribution and project partner relationships, especially Volkswagen / SYNAOS / Kubernauts / MAN.
3. Verify the Company team roster and role labels. Obtain optional real photographs, or retain text-only team profiles.
4. Complete legal imprint (registry, VAT, managing directors as applicable) and full privacy notice with hosting-specific disclosures; seek legal review.
5. Decide on contact process. Current inquiry form opens a mail client via `mailto:support@cloudssky.com`; it does not submit on its own.
6. Verify canonical URLs and link redirects for the old cloudssky.com content; preserve SEO equity.
7. Do a real browser QA pass: desktop, narrow mobile, Safari, Chromium, keyboard controls, screen readers, visual spacing and reduced motion.
8. Enable Pages → GitHub Actions, review the new site preview and confirm its actual URL.
9. Confirm target hosting and custom domain. Change only website A/AAAA/CNAME records; preserve MX, SPF, DKIM, DMARC and other records.
10. After domain cutover, enable HTTPS and validate www, old URLs, search metadata, links, forms and certificates.

## Asset provenance
The preliminary client marks under `public/clients/` were copied from the public Simple Icons open-source collection (https://github.com/simple-icons/simple-icons) on 2026-11-09. Their brand/trademark usage is governed by each trademark owner. They are review assets, not proof of approval.

The actual live domain and production DNS are untouched. The PR is a draft; it has not been merged.
