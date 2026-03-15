# Arrhythmia Guide

A comprehensive bilingual (English/Chinese) web reference for cardiac arrhythmias — covering electrophysiology fundamentals, ECG interpretation, and evidence-based management of tachyarrhythmias and bradyarrhythmias.

🔗 **Live Site:** [arrhythmia-guide.vercel.app](https://arrhythmia-guide.vercel.app)

## Overview

This application organizes arrhythmia knowledge into three main sections:

- **Fundamentals** — Cardiac electrophysiology, systematic ECG interpretation, and arrhythmia mechanisms
- **Tachyarrhythmias** — SVT, Atrial Fibrillation, Ventricular Tachycardia, Ventricular Fibrillation
- **Bradyarrhythmias** — Sinus Node Dysfunction, AV Block

Each topic features tabbed navigation, two-column layouts with clinical diagrams, and a one-click language toggle between English and Chinese.

## Tech Stack

- **React** with functional components and hooks
- **Vite** for fast development and production builds
- **React Router** for client-side navigation
- **JSON-driven content** using bilingual `{ en, zh }` data structures
- **Vercel** for deployment

## Features

- Bilingual content with shared language state across components
- Tabbed navigation within each topic (Overview, Classification, Management)
- Two-column layout: clinical diagrams on the left, detailed text on the right
- Hover-to-reveal subtopic tags on the home page
- Smooth scroll navigation between sections

## Project Structure

```
src/
├── assets/images/     # Clinical diagrams and illustrations
├── data/              # Bilingual JSON content files
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Fundamentals.jsx
│   ├── Tachy.jsx
│   ├── Brady.jsx
│   ├── CardiacElectro.jsx
│   ├── ECGInterpret.jsx
│   ├── ArrhyOverview.jsx
│   ├── SVT.jsx
│   ├── AF.jsx
│   ├── VT.jsx
│   ├── VF.jsx
│   ├── SND.jsx
│   ├── AVBlock.jsx
│   └── NotFound.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## About

Built by a clinical pharmacist exploring the intersection of healthcare and technology. This project is part of a portfolio demonstrating how clinical domain expertise can be combined with modern web development to create accessible medical reference tools.

## License

This project is for educational and portfolio purposes.
