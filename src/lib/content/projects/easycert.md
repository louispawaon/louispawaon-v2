---
title: EasyCert
description: A web-based platform that automates certificate generation for multiple use cases. users upload custom certificate designs, map participant data to placeholders, and generate personalized certificates in bulk, ready for download distribution.
featuredImage: /media/projects/easycert/easycert-land.png
gallery:
  - media/projects/easycert/easycert-home.png
  - media/projects/easycert/easycert-design.png
  - media/projects/easycert/easycert-preview.png
  - media/projects/easycert/easycert-generate.png
problem: Organizations and event hosts often struggle to create and distribute certificates manually. Existing solutions were either rigid, required technical knowledge, or lacked bulk generation features, making it slow and error-prone for large groups.
approach: A web-based platform that automates certificate generation for multiple use cases. Users upload custom certificate designs, map participant data to placeholders, and generate personalized certificates in bulk, ready for download distribution.
engineeringDecisions:
  - Kept the UI minimal to prioritize speed and ease of use
  - Handled template and data mapping in a straightforward, user-driven flow
  - Focused on bulk generation as a core feature instead of adding unnecessary complexity
architecture:
  - Frontend built with Next.js and React for interactive user flow
  - Client-side handling of template preview and data mapping
  - Simple processing pipeline for generating certificates from input data
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
---
