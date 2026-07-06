# Publishing Workflow

This project separates content preparation from final publishing. It helps you
produce consistent drafts, posters, and checklists while keeping account login,
CAPTCHA, QR scan, payment, permissions, and final publish confirmation under
human control.

## 1. Prepare Work Items

Create or update a `.work.json` file under `works/`.

Required fields:

- `id`: short work identifier, used as the draft folder name.
- `title`: base title for every platform.
- `hook`: opening sentence or short selling point.
- `summary`: main description of the work.
- `targetUrl`: landing page, product page, or relay station URL.
- `tags`: reusable topic tags.
- `assets`: image, poster, or video paths.
- `platforms`: platform ids from `configs/platforms.json`.
- `notes`: publishing reminders and account-specific instructions.

Example:

```json
{
  "id": "tokenaizf",
  "status": "draft",
  "title": "TokenAI 中转站",
  "hook": "把 AI 接口调用、资料入口和工具导航整理到一个页面。",
  "summary": "适合需要统一管理 AI API、模型资料、工具入口和教程的人。",
  "targetUrl": "https://tokenaizf.cn/",
  "tags": ["AI工具", "AI接口", "效率工具"],
  "assets": ["assets/tokenaizf-cover.svg"],
  "platforms": ["xiaohongshu", "douyin", "bilibili", "zhihu"],
  "notes": "发布前确认入口地址可访问。"
}
```

## 2. Generate Drafts

Run from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-drafts.ps1
```

Generated files:

- `drafts/<work-id>/xiaohongshu.md`
- `drafts/<work-id>/douyin.md`
- `drafts/<work-id>/kuaishou.md`
- `drafts/<work-id>/bilibili.md`
- `drafts/<work-id>/zhihu.md`

The generator reads:

- `works/*.work.json`
- `configs/platforms.json`

Before publishing, open the generated draft for the platform and check the title
length, body length, tags, call to action, and target URL.

## 3. Generate Poster Assets

Run from the repository root:

```powershell
node .\scripts\generate-tokenaizf-posters.js
```

Generated files are written to `assets/`. If a platform needs PNG or JPG, export
the SVG with a browser, ImageMagick, Figma, Photoshop, Canva, or another design
tool.

Suggested exports:

- 小红书: vertical poster, 3:4 or 4:5.
- 抖音/快手: vertical cover, 9:16.
- B站: article cover or video cover, 16:9.
- 知乎: inline images are optional; long-form text matters more.

## 4. Pre-Publish Checklist

- Account is logged in and authorized to publish the content.
- Target URL is correct and opens normally.
- The draft does not include passwords, API keys, session cookies, or private
  tokens.
- Claims are accurate and do not promise impossible results.
- Title fits the platform limit.
- Cover image is clear on mobile.
- Tags match the content.
- Visibility, copyright, AI-generated-content, and commercial declaration fields
  are reviewed.

## 5. 小红书操作流程

Official creator page:

```text
https://creator.xiaohongshu.com/publish/publish
```

Recommended content type:

- Image/text note for posters, screenshots, tutorials, and relay-station guides.
- Video note for walkthroughs or screen recordings.

Steps:

1. Open the creator publish page and confirm the correct account is logged in.
2. Choose image/text or video note.
3. Upload the prepared poster, screenshot, or video.
4. Open `drafts/<work-id>/xiaohongshu.md`.
5. Paste the short title into the title field.
6. Paste the body copy into the note content field.
7. Add tags from the draft or from `works/<work-id>.work.json`.
8. Add location/topic/collection only if relevant.
9. Check visibility and platform declaration fields.
10. Preview the note on the page.
11. Click publish after the final review.

Field notes:

- Keep the title short. The default config uses a 20-character limit.
- Put the strongest benefit in the first sentence.
- Use soft call to action, such as "主页入口" or "置顶入口".
- Avoid repetitive hashtag stuffing.

## 6. 抖音操作流程

Official creator page:

```text
https://creator.douyin.com/creator-micro/content/upload
```

Recommended content type:

- Short video for demos and walkthroughs.
- Image post if the account has image-text publishing enabled.

Steps:

1. Open the Douyin creator upload page and confirm the account.
2. Upload the video or image material.
3. Set or upload a cover.
4. Open `drafts/<work-id>/douyin.md`.
5. Paste the title or first line into the title/caption field.
6. Paste the remaining body copy into the description field if available.
7. Add hashtags from the draft.
8. Select topic, collection, location, and visibility only when relevant.
9. Review copyright, commercial, and AI-generated-content declarations.
10. Preview the post.
11. Click publish after confirming every field.

Field notes:

- Keep the first line direct and benefit-driven.
- Make the cover readable at phone-screen size.
- Avoid adding external links in unsupported fields; use profile or pinned-entry
  wording when needed.

## 7. B站专栏操作流程

Official creator page:

```text
https://member.bilibili.com/platform/upload/text/new-edit
```

Recommended content type:

- Article/column for detailed explanations, tutorials, changelogs, and resource
  lists.

Steps:

1. Open the B站专栏 editor and confirm the account.
2. Open `drafts/<work-id>/bilibili.md`.
3. Paste the article title into the title field.
4. If the title is too long, shorten it before submitting.
5. Paste the body into the editor.
6. Insert posters, screenshots, or QR code images where useful.
7. Choose category, tags, and cover.
8. Review originality, copyright, commercial, and platform declaration fields.
9. Preview the article.
10. Submit after the final review.

Field notes:

- B站 titles can be longer than 小红书 titles, but concise titles still perform
  better.
- Use section headings for tutorial-style content.
- Put links and community information in a natural resource section.

## 8. B站视频操作流程

Official creator page:

```text
https://member.bilibili.com/platform/upload/video/frame
```

Recommended content type:

- Demo videos, tutorials, walkthroughs, release updates, or review content.

Steps:

1. Open the B站 video upload page.
2. Upload the video file.
3. Set video title, partition, tags, cover, and description.
4. Use `drafts/<work-id>/bilibili.md` as the base description.
5. Fill copyright, source, commercial, and AI-generated-content declarations.
6. Add subtitles or chapters if available.
7. Preview and submit after the upload processing check is complete.

Field notes:

- A 16:9 cover usually works best.
- Put the key benefit in the first title segment.
- The description can include the relay station URL when allowed by the current
  platform rules.

## 9. 快手操作流程

Official creator page:

```text
https://cp.kuaishou.com/
```

Recommended content type:

- Short video or image-text post.

Steps:

1. Open the 快手创作者服务平台 and enter content publishing/upload.
2. Upload video or image material.
3. Open `drafts/<work-id>/kuaishou.md`.
4. Paste the title/caption.
5. Add tags and topic fields if available.
6. Set cover, visibility, permissions, and location only when relevant.
7. Review platform declarations.
8. Preview and publish after checking the final page.

Field notes:

- Keep the first sentence simple and concrete.
- Use a cover with large readable text.
- Do not repeat the same tag block across too many posts.

## 10. 知乎操作流程

Official entry:

```text
https://www.zhihu.com/
```

Recommended content type:

- Article or answer for long-form explanation, comparison, tutorial, and
  resource organization.

Steps:

1. Open Zhihu and enter the write article or answer flow.
2. Open `drafts/<work-id>/zhihu.md`.
3. Paste the title and body.
4. Add images only where they clarify the content.
5. Add topic tags.
6. Review links, claims, and any commercial declaration fields.
7. Preview on desktop and mobile if available.
8. Publish after the final review.

Field notes:

- Zhihu works better with practical details than short slogans.
- Explain who the relay station is for, what problem it solves, and what users
  should check first.
- Avoid over-optimized marketing language.

## 11. After Publishing

Record the published URL and status in your own tracker or in the work item's
`notes` field. Suggested fields:

- Platform
- Account
- Publish time
- Published URL
- Title used
- Asset used
- Result or review status
- Follow-up action

## Platform Notes

- Some pages use custom upload controls or closed UI components. If generic
  browser automation cannot click a final button reliably, keep that step
  manual.
- Platforms may change field names, limits, and declaration requirements. Check
  the current page before publishing.
- Do not bypass platform restrictions, CAPTCHA, QR login, rate limits, or
  review systems.
