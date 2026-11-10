# Clouds Sky — production cutover runbook (2026-11-10)

## Release state
- Owner authorized public launch of `cloudssky.com` via chat on 2026-11-10.
- GitHub Pages **Source = GitHub Actions** was enabled by owner (screenshot).
- PR #1 from `website-relaunch-v1` to `main` remains open; current CI is green.
- `LAUNCH_APPROVAL.json` keeps a default-deny gate until each outstanding release check is verified.
- User prefers **direct production cutover**; no separate preview address.
- Legacy website is presently routed through Cloudflare A records to `46.16.74.96` (owner screenshot), and Google Workspace MX records must remain unchanged.

## Mandatory pre-merge verification
1. **Legal:** Review both /de/imprint/ and /en/imprint/. Compare company identifiers with a current official Handelsregister extract and confirm manager full names, address, editorial responsibility. Do not publish internal legal-review notices or outdated blanket disclaimer assertions as approved legal content.
2. **Privacy:** Replace DE/EN `STATUS: PRÜFENTWURF / REVIEW DRAFT` with a completed, factually correct Art. 13 notice. Confirm GitHub Pages hosting and Cloudflare DNS proxy mode, access logs, recipients/transfers, retention, processor agreements, external Calendly and contact mail. GitHub documents visitor IP logging for security.
3. **Brand / client attribution:** Obtain approvals for customer brand marks and project descriptions (particularly Volkswagen, MAN/SYNAOS and Bayer); if permissions cannot be established, replace client logos with neutral text and adjust case-study statements before sign-off.
4. **Contact:** mailto and outbound Calendly are configured (no server-side contact form); verify recipient mailbox accepts messages and booking link opens as intended.
5. **Browser/accessibility:** Test Chrome and Safari, desktop and mobile, no horizontal overflow, keyboard navigation, cloud pointer gestures, reduced-motion preference and external links.
6. **Deployment:** Validate URL redirects from the legacy site, HTTPS, a rollback method, and only then sign off `hostingAndRedirects`. DNS changes must be restricted to the web apex and `www`.

## GitHub Pages activation
1. Settings > Pages > Source: **GitHub Actions** (already done).
2. After all sign-offs, set `approved=true` and all seven `checks` to true in `LAUNCH_APPROVAL.json`, each with evidence, and review the separate release commit. Do not remove or bypass `scripts/launch-gate.mjs`.
3. Mark PR #1 ready and merge to `main` (or review/merge if already ready).
4. In GitHub Actions, inspect **Deploy Clouds Sky to GitHub Pages**: `Verify production release approval`, prerender, upload and deployment must all succeed.
5. Set custom domain `cloudssky.com` under Settings > Pages. GitHub might take some time to issue TLS. **Do not enable Enforce HTTPS until a valid certificate is issued.**

## Cloudflare DNS cutover (once approved and Pages is deployable)
Snapshot/export existing Cloudflare DNS zone and record original website values and proxy states first.

Apex: replace only website routing records for `@`:
- A @ -> `185.199.108.153`
- A @ -> `185.199.109.153`
- A @ -> `185.199.110.153`
- A @ -> `185.199.111.153`
- Set **DNS only (gray cloud)** while GitHub validates domain and TLS, to avoid ambiguous GitHub Pages verification/proxy behavior.

WWW: replace only existing web A record with:
- CNAME `www` -> `cloudssky.github.io` (**DNS only**) or use GitHub's exact custom-domain instructions at cutover.

Never change or delete:
- MX records for Google Workspace
- TXT records for SPF/Google site verification or other services
- DKIM/DMARC TXT records
- `mail`, `ftp`, `opencms` and unrelated subdomains
- NS, DNSSEC, Cloudflare email routing, or SSL modes

## Post-cutover smoke test
- `https://cloudssky.com/de/` and `/en/` load the new hero, interactive clouds, working navbar and ocean.
- `https://www.cloudssky.com/` redirects correctly according to GitHub's domain configuration.
- Routes: /de/company/, /de/contact/, /de/imprint/, /de/privacy/, /en/contact/ and case studies.
- Legal/privacy pages must show finalized public text without internal review-draft notices.
- Pages certificate status: valid; HTTPS works, no mixed-content errors.
- Test email `support@cloudssky.com` inbound and outbound independently of the website.
- Test Calendly outbound link and mobile/tablet navigation.
- Ensure any important legacy URLs redirect or have documented replacements.

## Rollback
If the website fails, restore original apex and www web DNS record values and Cloudflare proxy settings saved in the zone snapshot (currently the supplied screenshot shows `46.16.74.96`). Do not roll back or change mail records. Keep production PR commit available for debugging.

## Evidence considered
- Owner Cloudflare DNS screenshot, owner GitHub Pages screenshot, and reviewed Chrome desktop screenshots.
- GitHub Pages docs: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Public business directory cross-check (not official register): https://handelsregister.ai/de/organizations/koeln/datenverarbeitung-hosting-und-damit-verbundene-taetigkeiten-a-n-g/clouds-sky-gmbh-50f0e49044e578f29aa3751561cfb611
- Current official commercial register document still required for formal confirmation.
