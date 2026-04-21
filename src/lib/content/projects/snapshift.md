---
title: SnapShift
description: A lightweight tool that converts .heic files to multiple image formats in bulk.
lede: Turn folders of Apple HEICs into shareable JPGs and PNGs without babysitting each file.
projectType: personal
clientName: ''
previewProblem: HEIC batches break workflows on non-Apple tooling.
previewOutcome: Bulk HEIC → JPG/PNG with a small, scriptable pipeline.
featuredImage: /media/projects/snapshift/snapshift-land.png
gallery:
  - /media/projects/snapshift/SnapShift_prev.png
problem:
  context: HEIC is the default image format for Apple devices, but it is not universally supported across platforms and tools.
  subcontext: Users often need to manually convert images one by one, which becomes tedious and inefficient when dealing with large batches.
approach:
  context: Built a simple conversion tool that allows users to transform HEIC files into widely supported formats in bulk.
  subcontext: The focus was on making the process fast, scriptable, and easy to integrate into existing workflows.
technicalDecisions:
  context: Focused on batch processing as a core feature instead of single-file conversion.
  subcontext: 'Kept the tool lightweight and CLI-friendly to maximize flexibility, avoiding unnecessary overhead in favor of scriptable, repeatable usage. Rather than reinventing conversion logic, we leveraged existing image processing libraries for reliable HEIC decoding and format conversion. The design emphasizes minimal setup and straightforward usage, making it easy to integrate into existing workflows. Built in Python for accessibility and rapid development, the tool follows a simple file-based pipeline: input directory → conversion → output directory. It is optimized to handle multiple files efficiently in a single run, ensuring fast batch processing without complex configuration.'
outcome:
  - Eliminated the need for manual, one-by-one HEIC conversions
  - Reduced friction when working with Apple-generated images across platforms
  - Retained image quality during conversion, ensuring outputs remain visually consistent with originals
date: 2024-07-09
technologies:
  - Python
  - Pillow
  - PySide
roles:
  - Developer
githubUrl: https://github.com/louispawaon/snapshift
demoUrl: https://github.com/louispawaon/snapshift/releases/download/v1.0.0/SnapShift.exe
featured: false
status: Completed
hasDetailPage: true
---
