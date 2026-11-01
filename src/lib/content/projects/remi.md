---
title: Remi
description: A local-first media card maker for anime, manga, movies, TV, games, music, and podcasts — arrange the covers you love on a grid and export one poster image.
lede: Search nine media categories, hang the covers on a wall, and take the whole thing with you as a single PNG. No accounts, no cloud, no upload.
projectType: personal
clientName: ''
previewProblem: Media lists are scattered across a dozen services, and none of them make something you can keep.
previewOutcome: Remi turns nine media APIs into one local wall you can export in a click.
featuredImage: /media/projects/remi/opengraph-image.png
gallery:
  - /media/projects/remi/remi-add.png
  - /media/projects/remi/remi-arrange.png
  - /media/projects/remi/remi-export.png
problem:
  context: The things I love live in a dozen different apps, and none of them make something you can hang on a wall.
  subcontext: Anime lives on AniList, films on TMDB, games in a spreadsheet, music and podcasts somewhere else entirely. I wanted one place to search all of it, arrange it the way a room looks, and export the result as a single image — running on my own machine, with no account and no uploads.
approach:
  context: A club wall, not a dashboard.
  subcontext: Remi is built to hang one card quickly, on a laptop at a desk or a phone in hand. One saturated ultramarine room, black-mounted posters, butter type, and hard offsets instead of soft shadows. Every edit works without dragging — pick a slot, search, tap to place, nudge the crop, reorder or shuffle.
technicalDecisions:
  context: One Canvas renderer for both preview and export.
  subcontext: The same render path draws the on-screen preview and the 1080px (or 2× 2160px) PNG, so what you see is what the file contains, and export dimensions never depend on the viewport. Credentials for AniList, TMDB, TheGamesDB, Deezer, and Podcast Index stay in server-only modules, so an accidental client import fails the build instead of shipping a key. Cards autosave to IndexedDB, but the .remi ZIP — every artwork, upload, and unplaced item — is the durable backup. Uploads are capped at 10 MiB / 24 megapixels, cards at 40 MiB / 100 items, and archives at 64 MiB / 102 entries; the app refuses to silently discard overflow, overwrite a card, or report a failed save or export as successful.
outcome:
  - Nine categories in one search — anime, manga, manhwa, manhua, movies, TV, games, songs and albums, podcasts.
  - 3×3, 4×4, and 5×5 grids with optional central free space, exported as 4:5, 3:4, 9:16, or 1:1.
  - Editable .remi project archives, full mobile workflows on iPhone Safari and Android Chrome, and a Playwright suite that includes axe-core accessibility checks.
date: 2026-11-01
technologies:
  - SvelteKit
  - TypeScript
  - Canvas API
  - IndexedDB
  - Docker
roles:
  - Designer & Developer
githubUrl: https://github.com/louispawaon/remi
demoUrl: https://remi.project1of1.com/
featured: true
status: Completed
ifLive: true
underNda: false
hasDetailPage: true
---
