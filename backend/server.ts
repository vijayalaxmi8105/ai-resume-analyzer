import express from "express";
import cors from "cors";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "GEMINI_API_KEY is not set. AI analysis will be unavailable until it is configured."
  );
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/", (_req, res) => {
  res.send("Resume Analyzer API Running");
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();

    if (!genAI) {
      return res.status(503).json({
        success: false,
        message: "AI analysis is unavailable because GEMINI_API_KEY is not configured.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Analyze this resume text and return valid JSON only. Use this structure:
{
  "ats_score": number,
  "strengths": string[],
  "weaknesses": string[],
  "missing_skills": string[],
  "suggestions": string[]
}

Resume Text:
${pdfData.text}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const analysisData = JSON.parse(result.response.text());

    return res.status(200).json({
      success: true,
      analysis: analysisData,
    });

  } catch (error) {
    console.error("Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Analysis failed due to internal error or invalid parsing.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});