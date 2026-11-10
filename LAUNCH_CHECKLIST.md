# Clouds Sky relaunch — Go-live readiness

## Completed in website-relaunch-v1
- 28 localized static pages (DE and EN), 3 case studies, 2 engineering insights.
- Large WE DO. brand statement leads the homepage hero.
- Responsive header and hierarchical Selected Work / Insights menu with active-page states.
- Customer experience ticker, preliminary visual assets, technology landscape and selected work diagrams.
- Static HTML pre-rendering, localized SEO metadata and GitHub Actions link/route QA.
- Expanded two-language imprint and privacy **review drafts**; explicitly identify missing legal and operational facts.
- Contact form is intentionally removed until a secure backend is commissioned. Contact is currently through direct email or an external Calendly booking link.
- Protected production Pages workflow: `scripts/launch-gate.mjs` requires `LAUNCH_APPROVAL.json` with all seven verified sign-offs before deployment.
- Downloadable static preview artifact from the PR quality workflow.

## Mandatory sign-offs — all currently pending
1. **Legal:** The user supplied the old imprint with both managing directors (Stephan Hartmann and Arash Kaffamanesh), Amtsgericht Köln HRB 70999, VAT ID DE815247371, tax number 215/5808/2975 and Finance Office: Cologne Center. These details are now included, but current registry/tax data and the historical five-section disclaimer still require legal verification. The cited law was modernized from § 5 TMG to § 5 DDG. Confirm editorial responsibility and other mandatory notices.
2. **Privacy:** Confirm the actual live web host, access logging, retention, processor agreements, third-country transfers, controller details and internal handling of contact requests; finalize GDPR Art. 13 notice.
3. **Branding:** Approve customer logo usage and replace preliminary Simple Icons SVGs with approved marks when needed. Customer name permission is not the same as trademark asset approval.
4. **References:** Approve customer project narratives and contracting attributions, especially MAN / SYNAOS / Kubernauts and Volkswagen partner relationships. Validate Company roles and imagery.
5. **Contact:** Confirm `support@cloudssky.com` is the intended intake. See CONTACT_INTEGRATION.md for recommended server-side Turnstile verification, mail provider and optional external Calendly scheduling. The current website intentionally has **no form**; visitors can email directly or open the external Calendly page. If a form is later required, select a service/provider, configure secure server-side delivery/anti-spam and revise privacy text.
6. **Browser QA:** Complete hands-on Safari and Chromium mobile/desktop checks, keyboard, reduced motion, screen readers, focus and cross-device layouts. CI verifies static routes, not rendered pixels.
7. **Hosting and redirects:** Confirm Pages publication, preview URL, custom domain, legacy URL redirect plan, HTTPS, DNS records and rollback. Preserve email MX/SPF/DKIM/DMARC records.

## Release guard
Production deployment is **default-denied** by `LAUNCH_APPROVAL.json` (all fields false). Verify each category, set its flag to true with a review reference, and set `approved=true` only after completed sign-off. Keep this as a separate reviewed commit. Do not bypass the gate.

## Asset provenance
The preliminary third-party client marks under `public/clients/` and technology previews under `public/technology/` were retrieved from Simple Icons. Each trademark belongs to its owner and its permitted use must be verified.

## Unchanged
- Public cloudssky.com and DNS records are untouched.
- Draft PR has not been merged.
