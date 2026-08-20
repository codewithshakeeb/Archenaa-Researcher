# Website Build Prompt — Archenaa J | Researcher Portfolio Website

## PROJECT OVERVIEW
Build a simple, clean, professional **multi-page** researcher/academic portfolio website for **Archenaa J**, an Industry Researcher specializing in Artificial Intelligence & Software Testing (with focus on healthcare applications). The site should feel credible, minimal, and academic — not flashy or commercial. The header nav (Home, About, Research, Publications, Projects, Contact) corresponds to 6 real separate pages, not anchor-scroll sections on one page.

Use the attached reference screenshots/PDF as the exact structural and visual reference (layout, section order, spacing rhythm, card grids). Recreate the same information architecture and visual hierarchy, but build it as clean, hand-written, dependency-free code (no frameworks, no build step).

## TECH STACK — STRICT REQUIREMENTS
- Plain **HTML5 + CSS3 + vanilla JavaScript** only. No React, no Tailwind compiler, no npm build process, no bundlers.
- Contact form backend in **plain PHP** using the native `mail()` function (this will run on Namecheap shared hosting, so it must work with a standard PHP/Apache stack, no Composer dependencies, no SMTP libraries).
- Fully self-contained: six HTML pages (`index.html`, `about.html`, `research.html`, `publications.html`, `projects.html`, `contact.html`), one shared `styles.css` (or a few clearly named CSS files), one shared `script.js`, and a `contact-handler.php` file for form submission.
- Must be deployable by direct FTP/File Manager upload to Namecheap shared hosting — no server config beyond a standard PHP-enabled Apache environment.
- Fully responsive (mobile, tablet, desktop breakpoints).
- Semantic HTML, accessible markup (proper labels, alt text, aria attributes on the modal).

## DESIGN SYSTEM
- **Overall tone:** minimal, academic, professional — generous whitespace, restrained color use, serif display headings paired with a clean sans-serif body font.
- **Typography:**
  - Headings: an elegant serif display typeface (e.g. Playfair Display or DM Serif Display via Google Fonts).
  - Body/UI text: a clean modern sans-serif (e.g. Inter or Poppins via Google Fonts).
- **Color palette:**
  - Deep navy/near-black for dark sections and footer (e.g. `#0F1B2D` range).
  - Teal/emerald as the primary accent color (used for eyebrow labels, icons, buttons, links, highlight section background) — sample tone around `#1A9C86` / `#0E7C6B`.
  - Soft off-white and very light blue-gray backgrounds alternating between sections (`#FFFFFF` and `#F4F6F9`-ish) to create visual rhythm without hard borders.
  - Neutral dark gray/navy for body text, muted gray for secondary text.
- **Buttons:** solid teal filled primary button with rounded corners; outlined/ghost secondary button with dark border.
- **Icons:** simple line icons (feather-icon style) for research areas, methodology steps, and profile links.
- **Section labels ("eyebrows"):** small uppercase tracked-out teal labels with a small square/dot bullet before each section heading (e.g. "RESEARCHER PROFILE", "AREAS OF INQUIRY", "METHODOLOGY").

## SITE ARCHITECTURE — MULTI-PAGE (UPDATED REQUIREMENT)
This is now a proper **multi-page site**, not a single scrolling page. Each nav item is a real separate HTML page:

- `index.html` → Home
- `about.html` → About
- `research.html` → Research
- `publications.html` → Publications
- `projects.html` → Projects
- `contact.html` → Contact

**Shared elements across all pages:**
- Same `<head>` setup (fonts, meta tags, `styles.css` link)
- Same header/nav markup and same footer markup on every page (copy-pasted identically across all HTML files since this is a plain-HTML multi-page site with no templating engine — no PHP includes needed, just duplicate the header/footer block in each file so it works reliably on shared hosting)
- Same `script.js` linked on every page (the script should safely no-op for elements that don't exist on a given page — e.g. don't error out on `publications.html` just because the hero diagram isn't present there)
- Same `contact-handler.php` used by both the popup modal (available sitewide) and the full contact page form

**Nav link behavior:**
- Nav links point to actual pages: `href="about.html"`, `href="research.html"`, etc. (`href="index.html"` for Home)
- The currently active page's nav link gets a visual "active" state (teal underline/color) — determine this by comparing the current filename, or simply hardcode the correct active class per page since each HTML file is separate
- Within a page, if a section needs an in-page jump (e.g. a "View Research →" button on Home that should land on the Research page), link directly to `research.html` (cross-page), not an anchor
- Mobile: nav collapses into a hamburger menu, same shared markup across pages

## PAGE-BY-PAGE CONTENT BREAKDOWN

### Page: Home (`index.html`)
Contains: Header/Nav → Hero Section → About Archenaa (short intro preview only, with a "Learn more →" link to `about.html`) → Research Interests (full grid, as before) → Current Direction Highlight (dark section, full) → CTA Band ("Research & Collaboration") → Footer

### Page: About (`about.html`)
Contains: Header/Nav → About Archenaa (full section, as originally detailed — photo placeholder, intro paragraphs, 6-item numbered focus list) → Footer
Optionally include the CTA Band above the footer for a consistent close on every content page.

### Page: Research (`research.html`)
Contains: Header/Nav → Research Interests (full 6-card grid) → Current Direction Highlight (dark section) → Research Approach / Methodology (6-step timeline) → Footer
This page consolidates all "research" related content from the original single-page layout.

### Page: Publications (`publications.html`)
Contains: Header/Nav → Publications Section (placeholder card, expandable abstract) → Footer

### Page: Projects (`projects.html`)
Contains: Header/Nav → Research Projects Section (featured project card + upcoming project placeholder) → Professional Profile Section (Google Scholar / ORCID / ResearchGate / LinkedIn cards) → Footer

### Page: Contact (`contact.html`)
Contains: Header/Nav → Contact Section (full inline form: Name, Email, Message, Send Message — posts to `contact-handler.php`) → Footer

## HEADER / NAVIGATION (shared across all pages)
- Left: circular monogram badge "AJ" + name "Archenaa J" (links to `index.html`)
- Right: nav links — Home, About, Research, Publications, Projects, Contact — each pointing to its respective HTML page
- Sticky, light background
- Mobile: collapse into a hamburger menu

## HOME PAGE SECTIONS IN DETAIL

### 1. Hero Section
- Light background with a subtle faint grid/dot pattern
- Eyebrow: "INDUSTRY RESEARCHER · DIGITAL ACADEMIC"
- Large serif heading: "Archenaa J"
- Subheading: "Industry Researcher | Artificial Intelligence & Software Testing"
- Paragraph: short intro about researching practical applications of AI, automated software testing, and technology-driven quality improvement, with particular interest in healthcare applications.
- Two buttons:
  - **"View Research →"** (solid teal) — links to `research.html` (cross-page link, since Research is now its own page)
  - **"Contact ✉"** (outlined) — **opens the Contact popup modal** (see Modal spec below) on top of the current page; does NOT navigate away to `contact.html`
- Right side: a decorative circular diagram — center dark circle labeled "RESEARCH", connected via thin dashed radial lines to 4 small floating cards with icons: "Artificial Intelligence", "Test Automation", "Quality", "Healthcare". Build this with absolutely-positioned divs inside a relatively-positioned container, or as inline SVG — keep it lightweight, no heavy animation, maybe a very subtle fade/float on load.

### 2. About Section Preview (short version, on Home only)
Home page shows a shortened teaser of the About section (eyebrow + heading + first paragraph only) with a "Learn more →" link to `about.html`. The full detailed version below lives on the About page.

## ABOUT PAGE SECTION IN DETAIL (`about.html`)

### About Section ("About Archenaa")
- Eyebrow: "RESEARCHER PROFILE"
- Heading: "About Archenaa"
- Left column: reserved space for a photo/portrait placeholder (rounded rectangle, soft border) — leave a clearly commented placeholder `<!-- PHOTO PLACEHOLDER -->` since no image is provided yet
- Right column: intro paragraph about her research intersection of intelligent systems, software testing, and healthcare technology, followed by a second paragraph on research interests
- Below paragraphs: a 2-column x 3-row numbered list of focus areas:
  01. Artificial Intelligence · 02. AI-driven software testing
  03. Automated testing frameworks · 04. Healthcare applications
  05. Software quality & reliability · 06. Emerging technology adoption
  (small teal square bullet before each number)

## RESEARCH PAGE SECTIONS IN DETAIL (`research.html`)

### Research Interests Section
- Light gray-blue background
- Eyebrow: "AREAS OF INQUIRY"
- Heading: "Research interests"
- Subtitle: "Cross-disciplinary areas connecting intelligent systems, software assurance, and technology-enabled healthcare."
- 3-column x 2-row card grid (stacks to 1 column on mobile), each card has: small number label (01–06), line icon, bold title, one-line description:
  1. Artificial Intelligence — Exploring applied AI methods that support dependable, human-centered technology systems.
  2. AI Testing & Automation — Investigating intelligent approaches to test design, execution, and quality feedback.
  3. Healthcare Technology — Examining responsible technology applications in quality-sensitive healthcare contexts.
  4. Automated Software Testing — Studying frameworks that improve the consistency and efficiency of software validation.
  5. Software Quality & Reliability — Focusing on robust systems, measurable quality, and confidence throughout delivery.
  6. AI-Driven Engineering — Considering how AI can augment engineering processes while preserving rigor and oversight.

### "Current Direction" Highlight Section (dark navy background, full width)
This section also appears on Home in full — it's the one duplicated section across Home and Research pages, since it's the site's central highlight.
- Eyebrow: "CURRENT DIRECTION · 01" (teal)
- Large serif heading: "AI-Driven Automated Testing Framework for Healthcare Applications"
- A two-column info box on light/white card over the dark background:
  - Left: label "RESEARCH IN PROGRESS" + description paragraph "Exploring how AI-driven approaches can support automated testing and improve software quality for healthcare applications." + small arrow icon (↗) as a "view more" affordance
  - Right: a stacked meta-info list with labels and values:
    - RESEARCH AREA → AI-driven software testing
    - APPLICATION DOMAIN → Healthcare applications
    - KEY FOCUS → Automation, quality & reliability
    - RESEARCH OBJECTIVE → Explore practical framework approaches

### Research Approach / Methodology Section
- Eyebrow: "METHODOLOGY"
- Heading: "Research approach"
- Subtitle: "A clear progression from identifying meaningful problems to developing, evaluating, and interpreting practical research outcomes."
- Horizontal 6-step timeline (connected by a thin line), each step = circular icon badge + step number label + step title:
  01 Research Problem → 02 Literature & Gap Analysis → 03 Framework / Method Development → 04 Testing & Evaluation → 05 Analysis → 06 Research Outcomes
  On mobile, stack vertically.

## PUBLICATIONS PAGE SECTION IN DETAIL (`publications.html`)

### Publications Section
- Light gray-blue background
- Eyebrow: "RESEARCH ARCHIVE"
- Heading: "Publications"
- Subtitle: "Research publications will be added here."
- One placeholder publication card with a subtle diagonal-stripe "coming soon" background texture: Year · Journal/Conference label, "Paper title" placeholder, "Authors · DOI" placeholder, a "Read abstract ⌄" expandable toggle (collapsed by default, JS toggles a hidden abstract text block), small document icon top-right.
- Build this card so it's easy to duplicate later when real publications are added (use a repeatable HTML block/comment marker).

## PROJECTS PAGE SECTIONS IN DETAIL (`projects.html`)

### Research Projects Section
- Eyebrow: "SELECTED WORK"
- Heading: "Research projects"
- Subtitle: "Current and upcoming research directions across AI, testing, and healthcare technology."
- Two-column grid:
  - Featured project card: "FEATURED · CURRENT DIRECTION" label, "AI-Driven Automated Testing Framework for Healthcare Applications" title, one-line description, arrow icon link (links to `research.html`, since Current Direction now lives on the Research page)
  - Upcoming project placeholder card: dashed border, plus icon, "UPCOMING PROJECT" label, "Future research direction" title, "Project details coming soon." text

### Professional Profile Section
- Eyebrow: "ACADEMIC PRESENCE"
- Heading: "Professional profile"
- 4-column row of small cards (icon + label + "Profile coming soon" muted text), stacking to 2x2 then 1-column on smaller screens:
  Google Scholar · ORCID · ResearchGate · LinkedIn
  (Leave `href="#"` placeholders clearly commented so real profile URLs can be dropped in later.)

## CTA BAND (shared, appears near the bottom of Home, About, Research, Publications, Projects pages)

### CTA Band ("Research & Collaboration")
- Full-width solid teal background section
- Eyebrow: "OPEN INQUIRY" (white/light)
- Heading: "Research & Collaboration"
- Text: "Interested in research collaboration, knowledge exchange, and opportunities at the intersection of artificial intelligence, software testing, and healthcare technology."
- Button: "Get in Touch →" (white filled, dark text) — **also opens the same Contact popup modal**, available on whichever page it's placed on

## CONTACT PAGE SECTION IN DETAIL (`contact.html`)

### Contact Section
- Eyebrow: "CORRESPONDENCE"
- Heading: "Contact"
- Left: short text "For research discussion, knowledge exchange, and potential collaboration." + name "Archenaa J" + email (mailto link, icon)
- Right: an **inline contact form** (this is the normal in-page section version — Name, Email, Message fields, "Send Message" button) that POSTs to `contact-handler.php`
- Note: this page does NOT need the CTA band above it (it would be redundant with the page's own purpose) — just Header/Nav → Contact Section → Footer

## FOOTER (shared across all pages)
- Dark navy background
- Left: "AJ" monogram + "Archenaa J", tagline "Industry Researcher — Artificial Intelligence | Software Testing | Healthcare Technology"
- Right: Email link, "Professional profiles coming soon" muted text, small copyright line
- All footer links (if any nav repeated in footer) point to the respective HTML pages

## CONTACT FORM — POPUP MODAL BEHAVIOR (IMPORTANT — CUSTOM REQUIREMENT)
This is different from the reference site and is a specific requirement:

- The **hero "Contact" button** (on Home) and every **CTA band "Get in Touch" button** (on whichever pages it appears) must trigger a **popup modal overlay** — this modal is available sitewide via shared `script.js`, so it works the same way regardless of which page the user is currently on, without navigating to `contact.html`.
- Modal must include:
  - A dimmed/blurred backdrop overlay covering the full viewport
  - A centered modal card with the same form fields as the inline contact section: Name, Email, Message, Send Message button
  - A close "✕" icon top-right of the modal
  - Close on: clicking the ✕, clicking outside the modal (on the backdrop), and pressing `Esc`
  - Focus trap basic behavior (focus moves into modal on open, returns to trigger button on close) for accessibility
  - Smooth fade/scale-in animation on open (CSS transition, no external animation library)
- The inline Contact form on `contact.html` stays a **normal in-page form**, separate from the modal — but both forms should submit to the **same `contact-handler.php`** endpoint via the same JS submit handler (reuse one JS function for both forms to avoid duplicate logic).
- On successful submission (via `fetch()` AJAX POST, not a full page reload): show an inline success message inside the form ("Thank you — your message has been sent.") and reset the form fields. On failure: show an inline error message.

## PHP CONTACT HANDLER (`contact-handler.php`)
- Accept POST fields: `name`, `email`, `message`
- Server-side validate: all fields required, email format validated with `filter_var($email, FILTER_VALIDATE_EMAIL)`
- Sanitize inputs before using in the mail body (strip line breaks from `name`/`email` to prevent header injection)
- Use PHP's native `mail()` function to send the message to the site owner's inbox (leave a clearly marked constant/variable at the top of the file, e.g. `define('RECIPIENT_EMAIL', 'saiarchenaastudy@gmail.com');`, so the hosting email can be swapped easily)
- Set proper headers: `From:` a no-reply address on the domain (e.g. `noreply@[domain]`), `Reply-To:` set to the sender's submitted email, `Content-Type: text/plain; charset=UTF-8`
- Return a JSON response (`{"success": true}` or `{"success": false, "error": "..."}`) so the frontend `fetch()` call can branch on it
- Include basic honeypot spam protection: one hidden input field in both forms (e.g. `website` field, visually hidden via CSS, never filled by real users) — if that field is non-empty on submit, silently reject as spam without sending mail

## GENERAL NOTES
- No CMS, no database — everything is static multi-page markup + the one PHP mail endpoint.
- Keep JS minimal: mobile menu toggle, active-nav-link highlighting, popup modal open/close logic (available sitewide), publication abstract toggle, and the shared contact-form AJAX submit handler used by both `contact.html`'s form and the modal form. In-page smooth-scroll is no longer needed for nav (nav now links across pages), but keep it for any same-page jump links if used (e.g. a "Read abstract" toggle doesn't need scroll, but a long page could have a "back to top" link).
- Code should be clean and commented enough that sections can be edited or duplicated later (e.g. adding a second publication card, adding real profile links, swapping the About photo placeholder for a real image).
- Match the reference's spacing rhythm: generous section padding (roughly 80–120px vertical on desktop, less on mobile), consistent max-width content container (~1100–1200px), alternating light/white section backgrounds for visual separation.
- Keep header/nav and footer markup byte-identical across all 6 HTML pages (except the "active" nav class) so the site feels cohesive and any later shared edits (e.g. adding a 7th page) are a simple find-and-replace across files.
- Do not add extra sections, testimonials, blog, or pricing — keep the site exactly as scoped above: simple, professional, researcher-focused, now organized as 6 linked pages instead of one long scroll.
