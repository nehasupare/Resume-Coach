
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeResume = async (resumeText: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the following resume text for a student or fresher. 
    Resume Text: "${resumeText}"`,
    config: {
      systemInstruction: `You are an expert AI Resume Coach specializing in entry-level hiring and ATS (Applicant Tracking Systems). 
      Your goal is to provide constructive, actionable feedback to help students land their first jobs.
      
      Tasks:
      1. Calculate an overall resume score (0-10).
      2. Identify missing or weak sections (e.g., Projects, Skills, Summary).
      3. Suggest section-wise improvements using ATS-friendly language.
      4. Rewrite 2-3 specific bullet points from their experience or projects to be more professional (Action Verb + Task + Result).
      5. Focus on clarity, impact, and keywords relevant to tech/corporate entry roles.
      
      Return the response in JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Overall score out of 10" },
          summary: { type: Type.STRING, description: "One paragraph overview of the resume quality" },
          feedback: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                section: { type: Type.STRING },
                rating: { type: Type.STRING, enum: ["Good", "Fair", "Needs Improvement"] },
                comment: { type: Type.STRING }
              },
              required: ["section", "rating", "comment"]
            }
          },
          improvedBullets: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                improved: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["original", "improved", "reason"]
            }
          },
          missingSections: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          atsTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["score", "summary", "feedback", "improvedBullets", "missingSections", "atsTips"]
      }
    },
  });

  const result = JSON.parse(response.text);
  return result as AnalysisResult;
};
