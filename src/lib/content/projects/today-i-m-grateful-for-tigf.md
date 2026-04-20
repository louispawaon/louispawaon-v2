---
title: Today I'm Grateful For (TIGF)
description: An offline-first, private journaling space that captures your thoughts effortlessly and gently reconnects them over time.
lede: Progressive Web Application (PWA) journaling app that opens to a blank canvas and gets out of your way — built because every other journaling app made writing feel like a chore.
projectType: personal
clientName: ''
previewProblem: I had dozens of journaling apps on my phone and kept going back to Apple Notes.
previewOutcome: Testers confirmed the app felt like actual journaling — not a productivity tool, not a habit tracker
featuredImage: /media/projects/today-i-m-grateful-for-tigf/tigf-land.png
gallery:
  - /media/projects/today-i-m-grateful-for-tigf/tigf-land.png
  - /media/projects/today-i-m-grateful-for-tigf/tigf-calm.png
  - /media/projects/today-i-m-grateful-for-tigf/tigf-focus.png
  - /media/projects/today-i-m-grateful-for-tigf/tigf-night.png
problem:
  context: I had dozens of journaling apps on my phone and kept going back to Apple Notes.
  subcontext: "Not because Notes is a journaling app — it isn't — but because it opened fast, asked nothing of me, and let me type immediately. Every dedicated journaling app I tried added something between me and the blank page: a mood picker, a streak counter, a prompt I didn't ask for. I didn't want a system. I wanted somewhere to put a thought before it left."
approach:
  context: The decision was to treat zero friction as a hard constraint, not a design goal.
  subcontext: That meant cutting every feature that required the user to make a choice before writing — no mood tags, no streaks, no prompts, no categories.
technicalDecisions:
  context: Everything is stored in IndexedDB on the user's device — no backend, no accounts, no sync.
  subcontext: That decision made the privacy story trivially simple and the offline behavior reliable, but it means your entries exist only where you wrote them.
outcome:
  - Testers confirmed the app felt like actual journaling — not a productivity tool, not a habit tracker
  - Zero onboarding to skip, zero UI to learn, nothing to configure before writing
date: 2026-04-20
technologies:
  - Progressive Web Application
  - React.js
  - TailwindCSS
  - Dexie.js
  - TanStack Start
roles: []
githubUrl: https://github.com/louispawaon/tigf-v2
demoUrl: https://develop-tigf.louispawaon.workers.dev/
featured: true
status: Completed
ifLive: true
underNda: false
hasDetailPage: true
---
