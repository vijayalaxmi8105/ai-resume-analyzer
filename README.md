# AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes using Gemini AI and provides ATS scores, strengths, weaknesses, missing skills, and personalized improvement suggestions.

## Features

* Upload Resume (PDF)
* Extract Resume Content
* ATS Score Generation
* Strengths Analysis
* Weakness Detection
* Missing Skills Identification
* Personalized Resume Improvement Suggestions
* AI-Powered Analysis using Gemini AI

## Tech Stack

### Frontend

* React
* TypeScript
* Vite

### Backend

* Node.js
* Express.js
* TypeScript

### AI

* Google Gemini AI

### Other Tools

* Multer (File Uploads)
* PDF Parse (PDF Text Extraction)
* Dotenv

## Project Workflow

Resume PDF
→ File Upload
→ PDF Parsing
→ Text Extraction
→ Gemini AI Analysis
→ ATS Score Generation
→ Resume Feedback

## Installation

### Clone Repository

```bash
git clone https://github.com/vijayalaxmi8105/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoint

### Upload Resume

```http
POST /upload
```

Form Data:

```text
resume : PDF File
```

Response:

```json
{
  "ats_score": 93,
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "suggestions": []
}
```

## Future Enhancements

* Job Description Matching
* Resume-to-Role Compatibility Score
* Cover Letter Generator
* Resume History Tracking
* Download Analysis Report
* User Authentication

## Author

**Vijayalaxmi Jampani**

Computer Science Engineering Student

Built using React, TypeScript, Node.js, Express, and Gemini AI.
