---
title: pickd.
description: pickd. is a unified discovery platform that helps players find pickleball courts and availability across fragmented booking systems.
lede: pickd. consolidates real-time court availability from 8+ booking platforms across Davao City — filter by district, surface, price, and time, then book in one tap.
projectType: personal
clientName: ''
previewProblem: Mindanao pickleball players have to check multiple different booking sites just to find a free court.
previewOutcome: pickd. turned a fragmented, multi-tab booking hunt into a single mobile-first search — players in Davao City and Mindanao can now see every available court across 8+ platforms in under a second.
featuredImage: /media/projects/pickd./opengraph-image.png
gallery:
  - /media/projects/pickd./Screenshot (23).png
  - /media/projects/pickd./Screenshot (25).png
  - /media/projects/pickd./Screenshot (26).png
  - /media/projects/pickd./Screenshot (27).png
problem:
  context: Court availability is scattered across multiple fragmented booking platforms.
  subcontext: There's no single place to see what's free when — so players either hop between tabs or show up to full courts. Venues lose bookings, players waste time.
approach:
  context: Instead of building another booking platform, we built a bridge between them — a single window into every court in the city.
  subcontext: "We started with Davao City and Mindanao, onboarded every booking platform we could find, and designed the experience to be dead simple: pick a date, see what's free, tap to proceed to the booking provider."
technicalDecisions:
  context: Tiered sync by date horizo
  subcontext: Today through next 7 days sync every 30 minutes; days 8–14 every 3 hours; further dates only on demand. Why fetch 15,000 API calls a day when most dates are never viewed by anyone? The cost is a slightly slower experience for users who search far in advance.
outcome:
  - The system aggregates 8+ platforms plus manual venues into one database, surfaced through the same interface.
  - The queue-based design (per-job retry, tiered sync by date, provider isolation) means a single provider's API breaking or a CSS class rename on an HTML scrape doesn't cascade into a total outage.
  - Because every filter lives in the URL, a player can send "courts free tomorrow after 5pm in Matina, sorted by price" as a single link.
date: 2026-07-01
technologies:
  - Next.js
  - NestJS
  - Redis
  - BullMQ
  - PostgreSQL
roles:
  - Full Stack Developer
githubUrl: ''
demoUrl: https://pickd.project1of1.com/
featured: true
status: Completed
ifLive: true
underNda: false
hasDetailPage: true
---
