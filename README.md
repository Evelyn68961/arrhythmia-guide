# Arrhythmia Guide

A comprehensive bilingual (English/Chinese) web reference for cardiac arrhythmias — covering electrophysiology fundamentals, ECG interpretation, and evidence-based management of tachyarrhythmias and bradyarrhythmias.

**Live Site:** [arrhythmia-guide.vercel.app](https://arrhythmia-guide.vercel.app)

## Overview

This application organizes arrhythmia knowledge into three main sections:

- **Fundamentals** — Cardiac electrophysiology, systematic ECG interpretation, and arrhythmia mechanisms
- **Tachyarrhythmias** — SVT, Atrial Fibrillation, Ventricular Tachycardia, Ventricular Fibrillation
- **Bradyarrhythmias** — Sinus Node Dysfunction, AV Block

Each topic features tabbed navigation, two-column layouts with clinical diagrams, and a one-click language toggle between English and Chinese.

## Features

- Bilingual content (English/Chinese) with shared language state via React Context
- Searchable home page with filterable topic cards
- Abbreviation letter highlighting on home page tabs (e.g. **S**upra**v**entricular **T**achycardia)
- Tabbed navigation within each topic (Overview, Etiology, Classification, Treatment, Prevention)
- Two-column layout: clinical diagrams on the left, detailed text on the right
- Drug cards with detail grids for pharmacotherapy information
- Sidebar navigation with nested routes for each section
- Responsive design with mobile hamburger menu
- Polished 404 page with bilingual support
- Keyboard-accessible with focus-visible styles

## Tech Stack

- **React** with functional components and hooks
- **Vite** for fast development and production builds
- **React Router** for client-side routing and nested layouts
- **JSON-driven content** using bilingual `{ en, zh }` data structures
- **CSS** with responsive media queries (900px tablet, 600px mobile breakpoints)
- **Vercel** for deployment

## Project Structure

```
src/
├── assets/images/          # Clinical diagrams and illustrations
├── components/
│   └── Navbar.jsx          # Top navigation with hamburger menu + language toggle
├── context/
│   └── LanguageContext.jsx  # Global language state (en/zh)
├── data/                   # Bilingual JSON content files
├── pages/
│   ├── Home.jsx            # Search bar, category cards with linked tabs
│   ├── FundamentalsLayout.jsx  # Sidebar layout for /fundamentals/*
│   ├── TachyLayout.jsx        # Sidebar layout for /tachyarrhythmias/*
│   ├── BradyLayout.jsx        # Sidebar layout for /bradyarrhythmias/*
│   ├── CardiacElectro.jsx     # Cardiac Electrophysiology
│   ├── ECGInterpret.jsx       # ECG Interpretation
│   ├── ArrhyOverview.jsx      # Arrhythmia Overview
│   ├── SVT.jsx                # Supraventricular Tachycardia
│   ├── AF.jsx                 # Atrial Fibrillation
│   ├── VT.jsx                 # Ventricular Tachycardia
│   ├── VF.jsx                 # Ventricular Fibrillation
│   ├── SND.jsx                # Sinus Node Dysfunction
│   ├── AVBlock.jsx            # AV Block
│   └── NotFound.jsx           # 404 page
├── App.jsx                 # Route definitions
├── index.css               # Global styles + responsive media queries
└── main.jsx                # Entry point
notes/                      # Learning notes (search bar, routing, etc.)
```

## About

Built by a clinical pharmacist exploring the intersection of healthcare and technology. This project demonstrates how clinical domain expertise can be combined with modern web development to create accessible medical reference tools.

## License

This project is for educational and portfolio purposes.
