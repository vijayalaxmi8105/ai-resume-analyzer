import { useState } from 'react'
import './App.css'

type AnalysisResult = {
  ats_score: number
  strengths: string[]
  weaknesses: string[]
  missing_skills: string[]
  suggestions: string[]
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [textPreview, setTextPreview] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      setError('Please choose a PDF resume to analyze.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to analyze the resume.')
      }

      setAnalysis(data.analysis)
      setTextPreview(data.text || '')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="app-card">
        <div>
          <p className="eyebrow">Resume Analyzer</p>
          <h1>Upload a resume to get AI-powered insights</h1>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <label className="upload-box">
            <span>{file ? file.name : 'Choose a PDF file'}</span>
            <input
              type="file"
              accept=".pdf"
              onChange={(event) => {
                const selected = event.target.files?.[0] || null
                setFile(selected)
                if (selected) {
                  setError('')
                }
              }}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Analyzing…' : 'Analyze Resume'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {analysis && (
          <section className="results-panel">
            <div className="score-card">
              <span>ATS Score</span>
              <strong>{analysis.ats_score}/100</strong>
            </div>

            <div className="result-grid">
              <article>
                <h3>Strengths</h3>
                <ul>
                  {analysis.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Weaknesses</h3>
                <ul>
                  {analysis.weaknesses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Missing Skills</h3>
                <ul>
                  {analysis.missing_skills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Suggestions</h3>
                <ul>
                  {analysis.suggestions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            {textPreview && (
              <details className="text-preview">
                <summary>View extracted text</summary>
                <pre>{textPreview}</pre>
              </details>
            )}
          </section>
        )}
      </section>
    </main>
  )
}

export default App
