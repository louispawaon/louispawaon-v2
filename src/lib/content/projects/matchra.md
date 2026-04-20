---
title: Matchra
description: A self-hosted Telegram bot that evaluates job descriptions against your resume using a local LLM. Paste a job description or send a link, get a match score, a breakdown of where you fit and where you don't, and an honest explanation — all from your phone.
lede: A self-hosted job fit analyzer that tells you whether to apply — before you spend an hour writing a cover letter.
projectType: personal
clientName: ''
previewProblem: I was spending 20–30 minutes per job application just deciding if a role was worth pursuing.
previewOutcome: Instead of building a web app, I built a Telegram bot.
featuredImage: /media/projects/matchra/matchra-land.png
gallery:
  - /media/projects/matchra/matchra-land.png
  - /media/projects/matchra/matchra-workflow.png
problem:
  context: I was spending 20–30 minutes per job application just deciding if a role was worth pursuing.
  subcontext: Reading JDs carefully, cross-referencing my resume, second-guessing myself. Half the time I'd write a full cover letter for something I was underqualified for, or skip a role I was actually a strong fit for because the title threw me off. I wanted a second opinion I could get in under a minute, from my phone, without uploading my resume to yet another platform.
approach:
  context: Instead of building a web app, I built a Telegram bot.
  subcontext: "Because that's where I'm already spending time during a job search. The whole system runs locally: n8n orchestrates the workflow, Ollama runs the LLM on-device, and nothing leaves your machine. The bot accepts your resume once, then you send job descriptions or links whenever you find a role. It returns a score, a breakdown, and a plain-language explanation in seconds."
technicalDecisions:
  context: The scoring is deterministic.
  subcontext: "A separate engine computes the match score from structured data the LLM extracts, rather than asking the LLM to score directly. This was a deliberate tradeoff: it means the same resume against the same JD always produces the same number, but it also means the score is only as good as the extraction quality. The LLM's role is narrowed to normalization and explanation — two things it does reliably — while the math stays in code where it can be audited and adjusted."
outcome:
  - Built and shipped as an open-source workflow with a full setup guide.
  - Full evaluation loop — resume ingestion, keyword extraction, JD parsing, scoring, and reasoning.
  - Works across any profession, not just tech roles.
date: 2026-04-10
technologies:
  - n8n
  - Automation
  - Ollama
  - LLMs
roles:
  - Automation Developer
githubUrl: https://github.com/louispawaon/matchra
demoUrl: ''
featured: true
status: Completed
ifLive: true
underNda: false
hasDetailPage: true
---
