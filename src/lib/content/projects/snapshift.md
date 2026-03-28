---
title: SnapShift
description: A lightweight tool for converting HEIC images into more accessible formats like JPG and PNG, with support for bulk processing to streamline workflows involving Apple device images.
featuredImage: /media/projects/snapshift/SnapShift_Head.png
gallery:
  - /media/projects/snapshift/SnapShift_prev.png
problem: HEIC is the default image format for Apple devices, but it is not universally supported across platforms and tools. Users often need to manually convert images one by one, which becomes tedious and inefficient when dealing with large batches.
approach: Built a simple conversion tool that allows users to transform HEIC files into widely supported formats in bulk. The focus was on making the process fast, scriptable, and easy to integrate into existing workflows.
engineeringDecisions:
  - Focused on batch processing as a core feature instead of single-file conversion
  - Kept the tool lightweight and CLI-friendly for flexibility
  - Leveraged existing image processing libraries instead of reinventing conversion logic
  - Designed for minimal setup and straightforward usage
architecture:
  - Python-based implementation for accessibility and rapid development
  - Utilizes image processing libraries for handling HEIC decoding and format conversion
  - 'File-based pipeline: input directory → conversion → output directory'
  - Optimized for handling multiple files efficiently in a single run
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
featured: true
status: Completed
---
