# Attendance Defaulter Processing & Warning Letter Generator

A full-stack web application designed to parse student attendance spreadsheets (Excel/CSV), identify students with attendance below the required 75% threshold, and automatically generate print-ready warning letters in PDF format.

## 📖 Table of Contents
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [File Structure](#file-structure)
- [System Architecture](#system-architecture)
- [How to Run](#how-to-run)

---

## 📝 Description
This application automates the administrative task of monitoring student attendance. Instead of manually inspecting lists, administrators can upload attendance spreadsheets. The system extracts records, highlights subject-wise deficiencies, compiles a list of defaulters, and renders customized letter pages (complete with school headers, student info, tables of missing classes, and signature lines) in a single downloadable PDF.

## 💻 Tech Stack

### Backend
- **FastAPI (Python)**: High-performance backend API service.
- **Pandas**: Used for parsing CSV and Excel sheets.
- **ReportLab**: PDF creation tool used to compile print-ready warning letters dynamically.
- **python-docx**: Library utilized for parsing Word doc outlines.
- **Uvicorn**: ASGI web server implementation.

### Frontend
- **Next.js 16 (App Router)**: Modern React framework.
- **React 19**: Client-side component tree.
- **Tailwind CSS 4**: Modern styling utility framework.
- **Axios**: Establishes API communication.
- **React Dropzone**: Interactive drag-and-drop file input UI.
- **Lucide React**: Clean vector icon package.

## ⚡ Key Features
- **Smart Spreadsheet Parser**: Automatically reads headers and rows from standard CSV and Excel formats.
- **Threshold Analysis**: Automatically flags students whose attendance falls below the 75% threshold.
- **Live Preview Dashboard**: Renders parsed student names, classes, roll numbers, and exact percentage statistics on the frontend.
- **Automated warning PDF compilation**: Dynamically constructs a PDF document containing a formal warning letter for each defaulter, paginated with PageBreaks and custom table layouts.
- **Modern Dark/Light Themes**: Minimalist visual style built using Tailwind.

## 📁 File Structure
```text
Assignment-6/
├── backend/                  # Python API Service
│   ├── services/
│   │   ├── file_parser.py    # Parses uploaded files (CSV/XLSX) with Pandas
│   │   └── letter_generator.py # Formats ReportLab tables and paragraphs into PDFs
│   ├── main.py               # API endpoints (/upload, /generate-letters)
│   └── test_api.py           # API integration tests
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # App Router pages and page logic
│   │   └── components/       # Upload states and visual lists
│   ├── package.json          # Node scripts and definitions
│   └── tailwind.config.ts    # Styling layout parameters
└── Attendance_Report_37.xlsx # Sample input dataset
```

---

## 🚀 How to Run

### 1. Setup Backend
Navigate to the [backend](file:///d:/Avengers%20Doomsday/FSDL/Assignment-6/backend) folder. Create a python virtual environment, activate it, install required packages, and run Uvicorn:
```bash
cd backend
python -m venv venv
# On Windows powershell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install fastapi uvicorn pandas openpyxl reportlab python-docx requests pydantic
python main.py
```
*The API server will launch at `http://localhost:8000`.*

### 2. Setup Frontend
Navigate to the [frontend](file:///d:/Avengers%20Doomsday/FSDL/Assignment-6/frontend) folder in a new terminal, install dependencies, and run:
```bash
cd frontend
npm install
npm run dev
```
*The web dashboard will launch at `http://localhost:3000`.*

---

## 📑 File Upload Format
The spreadsheet parser expects tables with standard columns such as:
* Student Name / Roll Number
* Attendance percentages per course (e.g. Mathematics, Physics, etc.)
* Overall percentage values
* Class details
