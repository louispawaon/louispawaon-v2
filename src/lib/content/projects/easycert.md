---
title: EasyCert
description: A web-based platform that automates certificate generation for multiple use cases. users upload custom certificate designs, map participant data to placeholders, and generate personalized certificates in bulk, ready for download distribution.
lede: Automate certificate design, mapping, and bulk generation so hosts can ship credentials without spreadsheet chaos.
projectType: personal
featuredImage: /media/projects/easycert/easycert-land.png
gallery:
  - /media/projects/easycert/easycert-home.png
  - /media/projects/easycert/easycert-design.png
  - /media/projects/easycert/easycert-preview.png
  - /media/projects/easycert/easycert-generate.png
problem:
  context: Organizations and event hosts often struggle to create and distribute certificates manually.
  subcontext: Existing solutions were either rigid, required technical knowledge, or lacked bulk generation features, making it slow and error-prone for large groups.
approach:
  context: A web-based platform that automates certificate generation for multiple use cases.
  subcontext: Users upload custom certificate designs, map participant data to placeholders, and generate personalized certificates in bulk, ready for download distribution.
technicalDecisions:
  context: Kept the UI minimal to prioritize speed and ease of use.
  subcontext: |-
    Handled template and data mapping in a straightforward, user-driven flow.
    Focused on bulk generation as a core feature instead of adding unnecessary complexity.
    Frontend built with Next.js and React for interactive user flow.
    Client-side handling of template preview and data mapping.
    Simple processing pipeline for generating certificates from input data.
outcome:
  - Eliminated repetitive manual certificate editing
  - Reduced time needed to generate certificates for events
  - Provided a simple tool usable without technical knowledge
date: 2026-03-22
technologies:
  - NextJS
  - TailwindCSS
roles:
  - Developer
githubUrl: https://github.com/louispawaon/easycert
demoUrl: https://easycert.vercel.app/
featured: true
status: Completed
ifLive: true
previewProblem: Event hosts were stuck doing one-off certificates by hand.
previewOutcome: Upload a template, map fields once, and generate certificates in bulk.
---
