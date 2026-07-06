# Promo Relay Station

A small, compliance-first toolkit for preparing promotional posts across
multiple content platforms.

It helps you:

- keep campaign material in one workspace;
- describe each work item with JSON;
- generate platform-specific publishing drafts;
- generate reusable poster SVG assets from JSON configuration;
- keep manual publishing checkpoints clear for platforms that require login,
  CAPTCHA, QR scan, or final human confirmation.

This project does not bypass platform restrictions, login checks, CAPTCHA,
rate limits, or content review. It is designed for legitimate, user-owned
publishing workflows.

## Community

Join the QQ group for AI workflow discussion, toolkit updates, and practical
automation notes:

- QQ group: `2162050314`
- Group name: `码咖8咖AI交流群`

![码咖8咖AI交流群 QQ group QR code](docs/media/qq-group-qrcode.jpg)

## Project Layout

- `works/`: work item definitions.
- `configs/`: platform and poster configuration.
- `content/`: campaign copy packs and growth plans.
- `assets/`: generated or imported media assets. Ignored by default.
- `drafts/`: generated platform drafts. Ignored by default.
- `scripts/`: automation scripts.
- `docs/`: usage, publishing, and compliance notes.

## Quick Start

Generate platform drafts:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-drafts.ps1
```

Generate poster SVG files:

```powershell
node .\scripts\generate-tokenaizf-posters.js
```

The poster script writes SVG files to `assets/`. Convert SVG to PNG with a
browser screenshot, ImageMagick, or your platform's preferred design tool.

## Work Item Format

Create a file in `works/` ending with `.work.json`:

```json
{
  "id": "example",
  "status": "draft",
  "title": "AI API gateway for developers",
  "hook": "Start by getting the API call path working.",
  "summary": "Describe who this is for, what problem it solves, and why people should try it.",
  "targetUrl": "https://example.com",
  "tags": ["AI", "API", "developer"],
  "assets": ["assets/example-cover.png"],
  "platforms": ["xiaohongshu", "douyin", "bilibili", "zhihu"],
  "notes": "Publish only after reviewing platform rules."
}
```

## Publishing Policy

Use official APIs where available. For browser-assisted publishing, keep a
human in the loop for login, CAPTCHA, payment, permissions, account selection,
and final publish confirmation.

See [docs/COMPLIANCE.md](docs/COMPLIANCE.md) and
[docs/PUBLISHING.md](docs/PUBLISHING.md).

## License

MIT. See [LICENSE](LICENSE).
