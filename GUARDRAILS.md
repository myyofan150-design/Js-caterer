# JS CATERER — PROJECT GUARDRAILS & ARCHITECTURE CONTRACT

> **Mandatory Inspection File**: Read this file before making any structural, layout, or script modifications to the codebase.

---

## 🛑 MANDATORY BUG-FREE & FAIL-SAFE PROTOCOL:
1. **AUTOMATED BACKUP BEFORE EVERY EDIT**:
   - Before executing ANY code edit or structural modification, ALWAYS run `node scratch/backup.js` OR `git commit` to save an instant restore point.
2. **ZERO TRUNCATION / NO FILE COLLAPSE**:
   - Inspect full target files before writing changes. Never perform edits that replace full files with truncated snippets.
3. **SCOPE & VERIFY**:
   - Ensure all CSS changes are strictly scoped (e.g. `#act-4 .selector`).
   - Run `node scratch/check_site.js` BEFORE completing ANY turn to verify JavaScript syntax, CSS brace depth, and asset links.
4. **INSTANT ZERO-RISK RECOVERY**:
   - If ANY edit causes visual distortion or syntax failure, immediately run `node scratch/restore.js latest` OR `git reset --hard HEAD` to restore the site to a clean working state in 1 second.

---

## 🛡️ Core Rules & Guardrails

### 1. Strict Section Scoping (CSS)
- Every visual tweak or CSS modification MUST be strictly scoped inside its specific section ID.
  - Example: Use `#act-3 .video-toggle-btn` instead of generic `.video-toggle-btn`.
  - Example: Use `#act-1 .hero-top-progress-bar` instead of generic `.hero-top-progress-bar`.
  - Example: Use `#act-4 .central-thali-wrapper` instead of un-scoped selectors.
- NEVER modify global utility classes or shared layout wrappers (`.container`, `.fullstretch-section`, `.luxury-header`) unless explicitly requested by the user.

### 2. Mandatory CSS & JS Linter Verification
- BEFORE finalizing any edit to `styles.css` or `script.js`, verify that no dangling or unclosed braces (`{`) or parentheses (`(`) exist:
  ```bash
  node scratch/check_site.js
  ```
- If an edit removes CSS properties, verify that the outer selector `{` and closing `}` are either updated or deleted together — NEVER leave an empty or unclosed selector.

### 3. DOM Contract & Element ID Protection
- The following critical HTML element IDs are immutable contracts. They MUST NEVER be renamed, removed, or stripped during HTML replacement:
  - `header` & `mobileToggleBtn` (Sticky header and mobile drawer toggle)
  - `heroTopProgressBar` & `heroTopProgressFill` (Hero slideshow progress bar)
  - `heroSlideshow`, `heroSlideNum`, `heroSlideLbl`, `heroBgVideo` (Hero slideshow elements)
  - `act-3`, `heritageVideo`, `heritageVideoToggle` (Heritage Story section & video elements)
  - `act-4`, `centralRotatingThali` (Four Pillars rotating brass plate showcase)
  - `cCategory`, `cOccasion`, `contactPageForm` (Dynamic form controls & booking handler)

### 4. Media Asset & Link Integrity
- Every media asset path (`assets/videos/...`, `assets/...jpg`, `assets/...png`) MUST exist on disk.
- Run `node scratch/check_site.js` after asset modifications to confirm 0 missing files and 0 broken links.

---

## 📝 User-Defined Dynamic Guardrails (Enforced Always)

- **Rule 1**: Hero section progress bar MUST be scoped inside `#act-1` (`position: absolute; top: 0; left: 0;`) so it scrolls away naturally with the Hero section and never sticks to the header.
- **Rule 2**: Heritage video background (`#act-3`) MUST NOT autoplay on page load; it starts paused showing the poster image and plays only on user click of `#heritageVideoToggle`.
- **Rule 3**: In Section 4 (`#act-4`), ONLY the brass Thali plate rotates on scroll; the central JS Caterer logo MUST remain stationary and upright at all times. No dashed decorative circles.
- **Rule 4**: ALL outputs must be 100% bug-free, error-free, and verified with `node scratch/check_site.js`.

---

*Last Updated: 2026-08-14*
