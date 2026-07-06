# Publishing Workflow

This project separates preparation from final publishing.

## 1. Prepare Work Items

Create or update a `.work.json` file under `works/`.

## 2. Generate Drafts

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-drafts.ps1
```

Generated drafts are written to `drafts/<work-id>/<platform>.md`.

## 3. Generate Poster Assets

```powershell
node .\scripts\generate-tokenaizf-posters.js
```

The script writes SVG files to `assets/`. If you need PNG, convert the SVG with
your browser, ImageMagick, or another design/export tool.

## 4. Publish With Review

For each platform:

1. Log in with the account owner present.
2. Upload or paste the prepared material.
3. Review title, body, tags, links, visibility, and declarations.
4. Confirm final publish only after checking the platform preview.

Platforms often require QR login, CAPTCHA, phone verification, account
selection, or final publish confirmation. These steps should stay manual.

## Platform Notes

- Xiaohongshu: browser upload controls and final publish buttons may use
  custom UI that blocks generic automation. Keep final publish manual.
- Douyin: creator center usually requires QR login and video or image upload.
- Bilibili: article publishing can be prepared in the web editor; keep an eye on
  title length and declaration fields.
