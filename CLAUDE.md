# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive educational web application demonstrating **GOLLuM** (Gaussian Process Optimized LLMs), a framework for calibrating Large Language Models using Bayesian Optimization. The app is built as a step-by-step tutorial with visualizations explaining how LLMs can be fine-tuned for scientific discovery and business optimization.

Based on: Ranković, B., & Schwaller, P. (2025). *GOLLuM: Gaussian Process Optimized LLMs--Reframing LLM Finetuning through Bayesian Optimization.* arXiv preprint arXiv:2504.06265.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production (outputs to docs/)
npm run build

# Preview production build (tests the actual built app)
npm run preview
```

## GitHub Pages Deployment

**IMPORTANT**: This app is configured for GitHub Pages deployment from the `docs/` folder.

- **Production builds** use base path `/gollum-tutorial/` (configured in vite.config.ts)
- **Local development** uses base path `/`
- The `docs/` folder is committed to the repository (not gitignored)
- All React dependencies are bundled into the build (no external import maps)

### Deployment Options:
1. **From docs folder**: Push built files, configure GitHub Pages to deploy from `main` branch `/docs` folder
2. **GitHub Actions**: Workflow at `.github/workflows/deploy.yml` builds and deploys automatically

### Testing Production Builds Locally:
- **DO NOT** use Live Server extension to preview the `docs/` folder
- **ALWAYS** use `npm run preview` which understands Vite's base path configuration
- Live Server will fail with MIME type errors because it doesn't handle the `/gollum-tutorial/` base path

## Architecture

### Application Structure

**Single Page Application (SPA)** with step-based navigation:
- **App.tsx**: Main component managing navigation state via `TutorialStep` enum
- **Sidebar Navigation**: Fixed on desktop, shows all tutorial steps
- **Content Area**: Renders different content/visualizations based on `currentStep`

### Tutorial Steps System

The app is organized into chapters defined in `types.ts` as `TutorialStep` enum:

1. **Scientific Introduction** (INTRO → APPLICATIONS)
2. **Business Sector Applications** (SECTOR_HEALTH → SECTOR_EDUCATION)
3. **Builder Guide** (BUILD_PREP → BUILD_DEPLOY)

Each step maps to content in `constants.ts` (`CONTENT` object) and may have:
- **Visualizations**: Conditionally rendered React components
- **Example Cards**: Industry-specific use cases from `SECTOR_EXAMPLES`

### Data Flow

```
constants.ts (data) → App.tsx (state) → Visualization Components
                    ↓
                types.ts (interfaces)
```

- **MOCK_POINTS**: Simulated data for latent space visualization (80 points with yield values)
- **PERFORMANCE_DATA**: Chart data showing GOLLuM vs static LLM performance
- **CONTENT**: Text content for each tutorial step
- **SECTOR_EXAMPLES**: Industry-specific optimization examples with icon mappings

### Key Components

**App.tsx**:
- Manages `currentStep` state
- Dynamic icon resolution via `getIconComponent()` helper
- Conditional rendering logic for visualizations based on step type
- Navigation controls (Back/Next buttons)

**Visualization Components** (in `components/`):
- `LatentSpaceSimulation`: Interactive 2D scatter plot showing LLM latent space before/after optimization
- `OptimizationChart`: Line chart comparing GOLLuM vs traditional approaches
- `SectorVisualizations`: Industry-specific diagrams for business sectors
- `AssemblyGuideViz`: Builder guide visualizations for implementation steps
- `IkeaBuilderViz`: Supporting component for builder guide

### Styling

- **Tailwind CSS**: Loaded via CDN in index.html (production warning expected)
- **Custom Fonts**: Inter (body), JetBrains Mono (code)
- **Color Scheme**: Slate-based with indigo accents for active states

## Important Technical Details

### Vite Configuration

```typescript
base: mode === 'production' ? '/gollum-tutorial/' : '/'
build: {
  outDir: 'docs',
  emptyOutDir: true,
}
```

- **Base path switching**: Development uses `/`, production uses `/gollum-tutorial/`
- **Output directory**: Builds to `docs/` not `dist/`
- **Environment variables**: `GEMINI_API_KEY` defined but not currently used in runtime

### JSX Syntax Gotcha

In SVG text elements, the `>` character must be escaped:
```tsx
// WRONG - causes build errors
<text>Arrow -&gt; Direction</text>

// CORRECT
<text>Arrow {'->'} Direction</text>
```

This was fixed in `components/AssemblyGuideViz.tsx:181-189`.

### Dependencies

- **React 19.2.0**: Latest React with concurrent features
- **Recharts**: Used in OptimizationChart for data visualization
- **Lucide React**: Icon library (all icons imported explicitly in App.tsx)
- **D3**: For advanced visualizations in LatentSpaceSimulation

All dependencies are bundled during build - no external CDN imports for JavaScript modules.

## Making Changes

### Adding New Tutorial Steps

1. Add enum value to `TutorialStep` in `types.ts`
2. Add content to `CONTENT` object in `constants.ts`
3. Add step to `steps` array in `App.tsx` with icon
4. (Optional) Add visualization component and conditional rendering in `renderContent()`
5. (Optional) Add sector examples to `SECTOR_EXAMPLES` in `constants.ts`

### Adding Visualizations

Create component in `components/` directory, import in App.tsx, and add conditional render:

```tsx
{currentStep === TutorialStep.YOUR_STEP && (
  <YourComponent data={YOUR_DATA} />
)}
```

### Modifying Content

All tutorial text is in `constants.ts` - edit the `CONTENT` object directly. Body text supports multi-line strings with `\n` for paragraphs.

## Common Issues

**MIME Type Errors**: If you see "Expected a JavaScript module but the server responded with MIME type 'application/octet-stream'":
- This means you're trying to preview the production build incorrectly
- Use `npm run preview` instead of Live Server
- The issue is caused by the base path mismatch between Vite config and static file servers

**Import Map Removed**: Earlier versions used external CDN import maps which caused MIME type issues on GitHub Pages. All dependencies are now bundled.

**Favicon 404**: A simple SVG favicon is provided in `public/favicon.svg` and copied to build output.

## Repository Context

- **Original Source**: Exported from AI Studio (see metadata.json)
- **Primary Branch**: `main`
- **GitHub Pages URL**: https://businessdatasolutions.github.io/gollum-tutorial/
- **Academic Paper**: arXiv:2504.06265
