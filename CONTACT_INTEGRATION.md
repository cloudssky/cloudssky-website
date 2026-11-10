# Clouds Sky — Contact and scheduling integration

## Chosen user experience

Keep two distinct visitor choices:
1. **Project inquiry** — a genuine server-side form submission, once a vetted mail provider and secret management have been configured.
2. **Book a conversation** — an external Calendly booking link (not an iframe) with explicit user click. This does not load Calendly scripts when someone merely visits the Clouds Sky website.

The current site deliberately retains a transparent `mailto:` fallback until a production API can actually send mail. **No successful delivery is claimed.**

## Recommended server-side contact flow

1. Browser validates mandatory fields and sensible length limits.
2. The form requests a Cloudflare Turnstile token using a public *site key*. Turnstile may involve additional privacy disclosures, depending on the final configuration.
3. Browser submits to `POST /api/contact` over HTTPS. The backend verifies the token through Turnstile's **Siteverify** endpoint using its secret key. Token verification is mandatory on the server.
4. Server validates all fields again, rejects oversized input, enforces request-rate limits and optional honeypot, and sends a transactional email to the approved inquiry inbox through a chosen provider.
5. Send no credentials in the static website bundle. Store secret/API keys as backend environment secrets. Use an appropriate sender domain and verified SPF/DKIM/DMARC configuration.
6. Return a generic success response only after the mail provider accepts the request; if anything fails, show an error and the direct-email fallback.
7. Minimize logs of personal information, establish retention periods and update privacy disclosures with the actual processor, location and transfers.
8. Test abuse, invalid and expired Turnstile tokens, replay, empty fields, email delivery, and mail-service downtime.

Cloudflare documentation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

## Calendly

The user provided the official Clouds Sky scheduling link: **https://calendly.com/cloudssky**. It is now configured in `assets/site.js` as `bookingUrl`. The website opens it only after a visitor clicks the booking CTA:
- The CTA appears on the contact page and opens Calendly in another tab only after a click.
- Verify its branding, notifications, video-meeting provider, timezone defaults, privacy wording and Calendly agreement.
- Consider an embedded Calendly widget only if there is a clear UX benefit; load it behind appropriate third-party-content consent and update the privacy notice accordingly.

## Privacy notice / cookie acknowledgement

The current website has **no optional tracking scripts**. A small privacy notice is shown and its dismissal is stored as `localStorage["csg-privacy-notice-v1"] = "acknowledged"`. This is not presented as consent for analytics or marketing.

Do not replace this with fake consent toggles. If optional cookie or third-party content processing is later introduced, assess it and implement real purpose-specific consent before loading the related resources.

## Go-live criteria

Backend email delivery is not active today. The website links to the Calendly booking page, but its external availability and booking configuration must be verified before production. Set the contact release approval to true only after confirming that the intended live behavior is functional and the associated privacy terms are complete.
