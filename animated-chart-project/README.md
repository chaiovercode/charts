# Chai Over Code - Animated Charts

Remotion-powered animated data visualizations for Instagram Reels.

## Quick Start

### Prerequisites

- Node.js 18+
- ffmpeg installed

**Install ffmpeg:**
```bash
# Mac
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows
choco install ffmpeg
```

### Setup

```bash
# Install dependencies
npm install

# Start preview studio
npm start
```

This opens http://localhost:3000 where you can preview the animation with timeline controls.

### Render to MP4

```bash
# Default render
npm run build

# Or manually with custom output
npx remotion render src/index.ts HallucinationChart out/my-chart.mp4
```

Output: `out/hallucination-chart.mp4` (1080×1920, 10 seconds, 30fps)

## Customizing the Chart

Edit `src/Root.tsx` to change the data:

```tsx
defaultProps={{
  kicker: "Your Kicker",
  headline: "Your Headline\nWith Line Break",
  subtitle: "Your subtitle with context",
  data: [
    { name: "Item 1", value: 25, company: "google" },
    { name: "Item 2", value: 18, company: "openai" },
    // ... more items
  ],
  annotation: "Your insight callout",
  source: "Your Source",
  date: "Dec 2025",
}}
```

### Company Colors

Available company keys (automatically colored):
- `google` → Blue (#4285F4)
- `openai` → Green (#10a37f)
- `anthropic` → Tan (#d4a27f)
- `meta` → Blue (#0866FF)
- `xai` → White (#e5e7eb)
- `deepseek` → Indigo (#536af4)
- `mistral` → Orange (#ff7000)
- `microsoft` → Cyan (#00bcf2)
- `amazon` → Orange (#ff9900)

Any other value defaults to zinc gray.

## Adjusting Animation Timing

In `src/compositions/AnimatedBarChart.tsx`, modify these constants:

```tsx
const KICKER_START = 0;        // Frame when kicker appears
const HEADLINE_START = 12;     // Frame when headline appears
const SUBTITLE_START = 30;     // ...
const LEGEND_START = 45;
const BARS_START = 65;         // When first bar starts growing
const BAR_STAGGER = 12;        // Frames between each bar
const BAR_DURATION = 30;       // How long each bar takes to grow
```

At 30fps:
- 15 frames = 0.5 seconds
- 30 frames = 1 second

## Output Specs

| Property | Value |
|----------|-------|
| Width | 1080px |
| Height | 1920px |
| Aspect Ratio | 9:16 (Reels/Stories) |
| FPS | 30 |
| Duration | 10 seconds (300 frames) |
| Codec | H.264 |

## Troubleshooting

**"ffmpeg not found"**
Make sure ffmpeg is installed and in your PATH.

**Fonts not rendering correctly**
The template uses system fonts (Inter, system-ui). For custom fonts, add them to your project and import them.

**Out of memory**
```bash
npx remotion render ... --concurrency=2
```

## License

MIT - Built for Chai Over Code
