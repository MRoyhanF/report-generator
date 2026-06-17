## Project

Student Weekly Report Generator

## Goal

Build a web application to help teachers generate weekly student progress reports using structured inputs and AI.

The app should reduce report writing time from 5–10 minutes into under 1 minute.

This application is NOT an LMS.
This application is NOT for storing long-term student data.

Main objective:
Teacher fills observations → AI generates report → teacher reviews → copy/export.

---

## Tech Stack

Framework:

* Next.js (App Router)
* TypeScript

UI:

* Tailwind CSS
* shadcn/ui

Deployment:

* Vercel

AI:

* Gemini API

Storage:

* localStorage only

No backend.
No database.
No authentication.

---

## Core Features

### 1. Report Generator

Teacher fills:

Student Information

* Student Name
* Teacher Name
* Class / Level
* Report Period

Learning Information

* Topic Learned
* Project / Learning Activity

Observation

Understanding

* Excellent
* Good
* Need Support

Participation

* Active
* Moderate
* Passive

Focus

* Excellent
* Moderate
* Need Reminder

Task Completion

* Complete
* Mostly Complete
* Partial

Confidence

* High
* Growing
* Need Encouragement

Challenges
(multi-select)

* Need More Practice
* Exploration
* Focus
* Reading Adaptation
* Communication
* Following Instructions

Strengths
(multi-select)

* Creative
* Curious
* Independent
* Persistent
* Fast Learner
* Collaborative

Teacher Notes
(optional)
max 150 chars

---

### 2. Generate Report

Output sections:

STUDENT PROGRESS REPORT

Student Information

Learning Progress

Project / Learning Activities

Challenges

Strengths / Potentials

Parent Support Recommendation

---

### 3. Editing

Teacher must be able to:

* regenerate report
* edit generated text
* copy report
* export as txt

---

## UX Rules

Design:

* clean
* modern
* teacher friendly
* minimal clicks

Target:
Generate report in under 60 seconds.

Avoid:

* long forms
* unnecessary configuration
* multiple pages

Prefer:
single page layout

---

## AI Rules

Report style:

Tone:

* professional
* warm
* constructive

Avoid:

* negative wording
* judgmental language
* repetitive sentences

Challenges section:
must sound developmental

Parent recommendation:
simple and actionable

Never:

* mention AI
* mention scoring

Output language:
English

Length:
150–250 words

---

## File Structure

app/
components/
lib/
hooks/
types/

Suggested Components:

ReportForm
ObservationSection
ReportPreview
GenerateButton
CopyButton
ExportButton

---

## Future (not now)

* PDF export
* Report history
* Analytics
* Curriculum metadata
* Batch generation
