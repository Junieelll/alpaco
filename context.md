# ALPACO Diversified Development OPC: Corporate Website

Read this file fully before writing any code. It is the source of truth for this project.

## 1. Project

A corporate website for **ALPACO Diversified Development OPC**, a Philippine contractor, supplier and trucking/hauling company. Real client project. It must look like a legitimate, established Philippine construction and development company, not a template, a startup landing page, or a flashy construction site.

- Client contact: Amanda Liza (communicates in Taglish; site copy is in English).
- The business recently changed its name but has supplied materials for a long time. **Never state a number of years.**
- Primary goal: build trust, explain what ALPACO does, show real work (photos and videos), and get visitors to **Request a Quote**.

## 2. Content rules (strict)

**Never invent:** company history, years of experience, number of projects or employees, certifications, accreditations, clients, project names or locations, awards, testimonials, statistics, ratings, contact details, fleet size.

If content is missing, show `[CONTENT NEEDED]` (styled so it is visibly a placeholder). Do not publish fictional projects. Placeholder projects exist for development only and must be labeled as placeholders.

Do **not** build: a stats row, client logo strip, testimonials, or star ratings, until the client supplies real data.

No exaggerated claims ("No. 1 contractor", etc.).

## 3. Services (use exactly these, in the client's terms)

Do not add other services or technical specifications.

| Service | Notes from client |
|---|---|
| Roofing Supply & Installation | Supplier and installer. No photos yet. |
| Gravel & Sand Supply | Photos and a video exist. |
| Embankment Materials | Lastillas, adobe, broken kalsada (road debris), broken debris. |
| Demolition | Accepts demolition projects. Aerial demolition-site photo exists. |
| Excavation | Accepts excavation projects. |
| Hauling & Trucking | Dump trucks (white Foton). Truck photos and video. |

Also mentioned by client: **boulders supply** (a photo of a boulder pile exists). Treat it as part of the supply materials for now and flag it for the client to confirm.

Keep descriptions short and plain. Source them in `src/data/services.js` only.

## 4. Pages and routes

| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Services | `/services` |
| Projects | `/projects` |
| Gallery | `/gallery` |
| Request a Quote | `/request-a-quote` |
| Contact | `/contact` |

**Current phase: Home page only.** Do not build the inner pages until the Home design is approved by the client.

## 5. Tech stack and structure

React, Vite, Tailwind CSS, React Router, Lucide React, **Framer Motion** (for animation). No other dependencies without a reason. No backend.

```
src/
├── assets/            (images/{hero,services,projects,gallery,trucks}, optimized WebP)
├── components/        Navbar, Footer, Button, SectionHeading, ServiceCard,
│                      ProjectCard, GalleryGrid, MediaImage, VideoCard, Reveal
├── pages/             Home, About, Services, Projects, Gallery, RequestQuote, Contact
├── data/              services.js, projects.js, gallery.js, site.js (contact info, nav)
├── App.jsx  main.jsx  index.css
public/videos/         (mp4 + webm + poster per video)
```

Code rules:
- Reusable components and data files. Never hardcode the same content in multiple places.
- Do not put a whole page in one component. Do not repeat large blocks of JSX.
- Keep it simple and maintainable. No unnecessary architecture or dependencies.
- Contact details and nav links live in `data/site.js`.
- Every image goes through a `MediaImage` component (WebP, width/height set, `loading="lazy"` except the hero, a visible placeholder when the file is missing) so photos can be swapped easily.

## 6. Design system

**Feel:** professional, reliable, strong, established, modern, practical, growth. Layout reference: a lawn-care landing page (floating pill nav over a rounded full-bleed hero, tag chips, video preview card, tall photo service carousel, bento "how we work" steps, large footer wordmark). Adapt the structure, not the content.

**Avoid:** generic construction templates, cartoon construction icons, neon, cheap gradients, glassmorphism, futuristic or SaaS look, every section being "heading + paragraph + 3 cards". Vary layouts while staying consistent.

### Colors

The logo's bright green is too harsh and low contrast on white (about 2.5:1). Use calmer greens in the UI. The bright logo greens appear **only inside the logo**.

```css
@theme {
  --color-forest: #12402C;   /* main green; white text on it is 11.7:1 */
  --color-deep:   #0A2A1D;   /* dark sections */
  --color-mid:    #2E6B45;   /* links, secondary (5.8:1 on off-white) */
  --color-sage:   #E7EEE6;   /* soft backgrounds */
  --color-gold:   #EDAA1C;   /* CTAs and accents; 5.8:1 on forest */
  --color-paper:  #F6F5F0;   /* page background */
  --color-ink:    #1C2321;   /* body text */
  --color-muted:  #56615B;   /* secondary text (5.9:1 on paper) */
}
```

(If the project uses Tailwind v3, put these in `tailwind.config.js` under `theme.extend.colors`.)

Gold is for the main CTA and small accents. Do not overuse it. Keep all text at a minimum 4.5:1 contrast.

### Typography

**Archivo** for everything, weights 400 to 800, with a system sans fallback. Strong tight headings (700, slight negative tracking), 16 to 17px body, line length under 80 characters. One accent: **Instrument Serif italic** (Google Fonts) on 2 to 4 words of a heading (for example "from one company"), set about 1.1em so it matches the sans. Use the accent only in headings, never in body text or buttons. Sentence case. Small section labels use a green dot plus a short sentence-case label, not loud all-caps eyebrows.

### Components

- Consistent radius: large rounded containers for the hero and image cards (about 24px), 8px for buttons and inputs.
- Buttons: pill style. Primary = gold with dark green text, secondary = outlined white on dark. A circle-arrow icon is allowed on primary CTAs.
- **"Request a Quote" is always the most prominent CTA.** Exact labels: "Request a Quote" (primary) and "View Our Services" (secondary).
- Visible keyboard focus on everything. Minimum 44px touch targets.
- Header: floating white pill nav on the Home hero, sticky while scrolling, hamburger menu on mobile. Logo stays on white so it is readable.

The logo is supplied as `alpacoTd.png` (transparent PNG, green and gold). Use it as provided. Do not recolor or redraw it.

## 7. Home page plan

Follows the lawn-care reference, adapted to ALPACO. A working HTML + Tailwind layout (`alpaco-home-v2.html`) exists as the visual target.

1. **Floating pill nav** over the hero: logo, links (active link as a sage pill), a "Call now" chip with the phone number (`[CONTENT NEEDED]`), and a forest-green "Request a Quote" button with a gold circle-arrow.
2. **Hero:** rounded full-width image or muted looping video (backhoe or gravel clip, poster image) with a dark green gradient. Three small tag chips (Materials supply, Demolition & excavation, Hauling & trucking). Headline with a serif italic accent. Primary CTA "Request a Quote", text link "View Our Services". Bottom-right video card with play button for the truck clip. Draft headline: "Materials, site works and hauling, *from one company*" (needs client approval). No rating, license or "happy customers" claims.
3. **Materials strip:** a slim row naming what is supplied (Gravel, Sand, Boulders, Lastillas, Adobe, Broken kalsada, Broken debris, Roofing). Takes the place of the reference's client-logo row, which we must not fake.
4. **About:** small photo with a green-dot label, one large statement paragraph, CTA plus text link.
5. **Services carousel:** tall rounded photo cards with a category chip, a numbered circle badge, title, one-line description and a "Request a quote" pill. Prev/next arrow buttons plus drag and snap scroll. Data comes from `data/services.js`.
6. **Trucks section:** dark green panel with the gold and green road curve from the logo, copy on the left and the Foton truck cutout on the right. The truck slides in on scroll once a real cutout exists.
7. **Process bento ("How a quote works"):** Step 01 tall card with photo, Step 02 and Step 03 cards, and a wide forest-green CTA card ("Have a project in mind? Get in touch with us."). Three steps only: send your project details, we review your requirements, we get in touch. No timelines, no fourth invented step.
8. **Projects:** one large and two small cards, clearly marked placeholders until real projects arrive.
9. **Gallery strip:** mosaic of photos with one video tile that opens a lightbox.
10. **Footer:** services links, `[CONTENT NEEDED]` contact details, giant faint ALPACO wordmark.

## 8. Media rules

Photos and videos are the heart of this site. Prefer the client's real media over stock. Never depend on stock.

- **Photos:** convert to WebP, provide responsive sizes, set width and height, lazy-load below the fold. Crop out camera watermarks (one truck photo has a phone-brand watermark at the bottom). Ask the client about the visible license plate (blur if she prefers).
- **Hero video:** 6 to 8 second muted loop, about 2 to 4 MB, `autoPlay muted loop playsInline`, MP4 (H.264) plus WebM, with a poster. Client footage may be vertical: crop it, or place it in the video card and not the full-width hero. Do not stretch vertical video.
- **Long videos** (for example the 3-minute clip): do not self-host. Use a YouTube (unlisted) or similar embed behind a click-to-play thumbnail.
- **Truck cutout:** needs a clean background-removed PNG/WebP from an original (not a Messenger screenshot). Until then, use a labeled placeholder.
- Future upgrade, not now: a 360-degree spin made from 24 to 36 photos of a truck. A real 3D model is out of scope.
- Messenger compresses media. Original files should be requested from the client (Google Drive or sent as documents).

## 9. Animation (Framer Motion)

Subtle and purposeful. The site must still look professional with animations off. Respect `prefers-reduced-motion` (disable all non-essential motion).

Allowed:
- One orchestrated hero load reveal (text lines and video card).
- Truck drive-in, scroll-driven, in the trucks section.
- Image reveal (clip-path or fade) on project and gallery images.
- Drag/scroll carousel for services.
- Slow rotating badge (CSS).
- Hover and button transitions, smooth scrolling.

Not allowed: parallax on everything, bouncing elements, animation on every element, fade-up on every section.

## 10. Request a Quote form (Phase 3)

Short intro above the form: "Tell us about your project and our team will review your requirements and get in touch with you."

Fields: Full Name, Company Name, Contact Number, Email, Project Location, Service Needed (select, from `services.js`), Material / Service Details, Estimated Quantity, Project Description, Preferred Contact Method. Submit button: "Request a Quote".

Do not claim quotes are automatic. No backend yet: build it so it can later connect to an email service or form provider (isolate the submit handler in one function). Include validation, clear error messages, and a confirmation state.

## 11. SEO and performance

- Unique `<title>` and meta description per page, Open Graph tags, semantic HTML, correct heading hierarchy, descriptive alt text, the routes in section 4.
- Fast load, minimal JavaScript, lazy-load images below the fold, no oversized images.
- Mobile first. Test at 360px, 768px, 1024px and 1440px. Do not just shrink the desktop layout. Check the nav, hero, image crops, gallery, forms and spacing.

## 12. Workflow

1. **Phase 1 Foundation:** Vite, Tailwind, router, global styles and color tokens, Navbar, Footer.
2. **Phase 2 Home page** (current): build and polish it fully, responsive, and stop for client approval.
3. **Phase 3 Inner pages:** About, Services, Projects, Gallery, Request a Quote, Contact.
4. **Phase 4 Polish:** accessibility, animation, image optimization, SEO, spacing and typography.

Do not proceed to the next phase without confirmation.

## 13. Open items (placeholders to keep until the client replies)

- Business address, phone, email, Facebook page, business hours.
- Company background, mission and vision for About.
- Real project names, locations and descriptions.
- Roofing photos.
- Original photo and video files (landscape video preferred), including the backhoe and truck footage.
- Confirmation on boulders as a separate service, plate blurring, and the final hero headline.