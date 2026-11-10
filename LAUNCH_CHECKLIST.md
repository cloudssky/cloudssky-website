# Clouds Sky relaunch — Go-live readiness

## Completed in website-relaunch-v1
- 28 localized static pages (DE and EN), 3 case studies, 2 engineering insights.
- Large WE DO. brand statement leads the homepage hero.
- V3 visual design: multi-layer CSS light/shadow architectural arcs in the hero, an original generated vector mesh-wave behind the Volkswagen project panel, and harmonized blue editorial Insights cards. No remote image fetches or third-party assets are needed for these backgrounds.
- Responsive header and hierarchical Selected Work / Insights menu with active-page states.
- Customer experience ticker, preliminary visual assets, technology landscape and selected work diagrams.
- AWS navy/orange and Google Cloud four-color brand SVGs added to the Volkswagen timeline and Enterprise Technology Landscape. Assets are sourced from gilbarbara/logos and remain subject to AWS/Google trademark guidelines; provenance is not official brand approval.
- Static HTML pre-rendering, localized SEO metadata and GitHub Actions link/route QA.
- Revised concise DE/EN factual imprint without obsolete five-part blanket disclaimer; owner-supplied company details still need formal verification. DE/EN privacy notice remains a **review draft** until processing details are confirmed.
- Contact form is intentionally removed until a secure backend is commissioned. Contact is currently through direct email or an external Calendly booking link.
- Protected production Pages workflow: `scripts/launch-gate.mjs` requires `LAUNCH_APPROVAL.json` with all seven verified sign-offs before deployment.
- Downloadable static preview artifact from the PR quality workflow.

## Mandatory sign-offs — contact verified; remaining checks pending
1. **Legal:** The website owner approves the supplied corporate data for the imprint (2026-11-10); this does not replace independent legal verification of the historical disclaimer. The user supplied the old imprint with both managing directors (Stephan Hartmann and Arash Kaffamanesh), Amtsgericht Köln HRB 70999, VAT ID DE815247371, tax number 215/5808/2975 and Finance Office: Cologne Center. These details are now included, but current registry/tax data and the historical five-section disclaimer still require legal verification. The cited law was modernized from § 5 TMG to § 5 DDG. Confirm editorial responsibility and other mandatory notices.
2. **Privacy:** Owner requests publication. GitHub Pages has been identified as planned host and its documented visitor IP logging is now disclosed in both language versions. Verify actual hosting, logs, retention, processor agreements, third-country transfers and contact data processing before GDPR Art. 13 sign-off.
3. **Branding:** Approve customer logo usage and replace preliminary Simple Icons SVGs with approved marks when needed. Customer name permission is not the same as trademark asset approval.
4. **References:** Approve customer project narratives and contracting attributions, especially MAN / SYNAOS / Kubernauts and Volkswagen partner relationships. Validate Company roles and imagery.
5. **Contact (approved for current no-form scope, 2026-11-10):** `support@cloudssky.com` is the intended intake. See CONTACT_INTEGRATION.md for recommended server-side Turnstile verification, mail provider and optional external Calendly scheduling. The current website intentionally has **no form**; visitors can email directly or open the external Calendly page. If a form is later required, select a service/provider, configure secure server-side delivery/anti-spam and revise privacy text.
6. **Browser QA:** Complete hands-on Safari and Chromium mobile/desktop checks, keyboard, reduced motion, screen readers, focus and cross-device layouts. CI verifies static routes, not rendered pixels.
7. **Hosting and redirects:** Confirm Pages publication, preview URL, custom domain, legacy URL redirect plan, HTTPS, DNS records and rollback. Preserve email MX/SPF/DKIM/DMARC records.

## Release guard
Production deployment is **default-denied** by `LAUNCH_APPROVAL.json` (all fields false). Verify each category, set its flag to true with a review reference, and set `approved=true` only after completed sign-off. Keep this as a separate reviewed commit. Do not bypass the gate.

## Asset provenance
The preliminary third-party client marks under `public/clients/` and technology previews under `public/technology/` were retrieved from Simple Icons. Each trademark belongs to its owner and its permitted use must be verified.

## Unchanged
- Public cloudssky.com and DNS records are untouched.
- Draft PR has not been merged.

## Cloud logo provenance
- `public/technology/aws.svg`: `gilbarbara/logos/logos/aws.svg`, SVG shapes in AWS navy `#252F3E` and orange `#FF9900`.
- `public/technology/googlecloud.svg`: `gilbarbara/logos/logos/google-cloud.svg`, original four-color Google Cloud motif.
- Both are community-hosted copies of branded artwork. Verify permitted use and approved asset versions before public deployment.

## Release review — 2026-11-10
- Website owner explicitly authorized publication to cloudssky.com; this records intent, not independent legal, brand, or technical validation.
- **Contact = approved** for the current mailto/telephone/outbound Calendly design; CI covers presence of links and absence of a form, but does not prove email delivery.
- **Browser QA = partial:** Owner visually checked Chrome desktop DE/EN and tested draggable clouds. Mobile, Safari, focus, accessibility and reduced-motion checks remain open.
- **Hosting = partial:** Screenshot confirms GitHub Pages Source changed to GitHub Actions. Cloudflare screenshot indicates apex and www still point to 46.16.74.96; Google Workspace mail records exist. Domain, HTTPS and redirect checks remain open. Do not alter unrelated DNS or mail records.
- **Legal/privacy = pending:** Visible preview/legal warnings and data processing uncertainties must be resolved before approving a production release; the historical boilerplate should not be presumed enforceable.
- **Branding/references = pending:** Customer and provider marks and project attributions require sign-off; otherwise remove unapproved elements before launch.
- `LAUNCH_APPROVAL.json` retains `approved=false` and the deployment gate must not be bypassed.

## Imprint cleanup — 2026-11-10
- Removed old five-part blanket liability disclaimer and visible pre-publication warning from both imprint languages. Replaced with concise operator, register, tax, copyright, external-link and privacy cross-reference sections.
- Retained owner-supplied legal identifiers without representing them as independently certified. The named managing directors, register and tax details, editorial responsibility and applicable legal requirements still require formal review.
- Latest website QA passed after imprint cleanup.
- The **privacy pages still contain REVIEW DRAFT** and MUST be completed before the public release gate is approved.
