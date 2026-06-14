import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResult {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  category: 'Food' | 'Cleanliness' | 'Location' | 'Host' | 'Value' | 'Experience';
  aiResponse: string;
}

// Fallback logic when Gemini API Key is missing or default
function analyzeFallback(reviewText: string): AnalysisResult {
  console.warn("Using fallback mock analyzer (Gemini API Key is not configured or is the default placeholder).");
  
  let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
  const lowerText = reviewText.toLowerCase();
  
  const positiveWords = ["good", "great", "amazing", "excellent", "wonderful", "love", "delicious", "clean", "friendly", "comfortable", "scenic", "perfect", "beautiful", "cozy", "peaceful"];
  const negativeWords = ["bad", "worst", "terrible", "poor", "dirty", "expensive", "disappointing", "low", "rough", "slow", "disappointed", "cold", "broken", "insect", "wifi", "internet"];
  
  let posCount = 0;
  let negCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) posCount++;
  });
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negCount++;
  });

  if (posCount > negCount) {
    sentiment = 'Positive';
  } else if (negCount > posCount) {
    sentiment = 'Negative';
  }

  // Determine Category
  let category: 'Food' | 'Cleanliness' | 'Location' | 'Host' | 'Value' | 'Experience' = 'Experience';
  if (lowerText.includes("food") || lowerText.includes("meal") || lowerText.includes("cook") || lowerText.includes("breakfast") || lowerText.includes("dinner") || lowerText.includes("eat") || lowerText.includes("organic") || lowerText.includes("garden")) {
    category = 'Food';
  } else if (lowerText.includes("clean") || lowerText.includes("dirty") || lowerText.includes("wash") || lowerText.includes("bathroom") || lowerText.includes("neat") || lowerText.includes("hygiene") || lowerText.includes("insect") || lowerText.includes("bug")) {
    category = 'Cleanliness';
  } else if (lowerText.includes("location") || lowerText.includes("view") || lowerText.includes("river") || lowerText.includes("mountain") || lowerText.includes("road") || lowerText.includes("scenic") || lowerText.includes("trail") || lowerText.includes("creek") || lowerText.includes("nature")) {
    category = 'Location';
  } else if (lowerText.includes("host") || lowerText.includes("staff") || lowerText.includes("owner") || lowerText.includes("people") || lowerText.includes("friendly") || lowerText.includes("family") || lowerText.includes("helpful")) {
    category = 'Host';
  } else if (lowerText.includes("price") || lowerText.includes("expensive") || lowerText.includes("worth") || lowerText.includes("cost") || lowerText.includes("value") || lowerText.includes("cheap") || lowerText.includes("wifi") || lowerText.includes("remote")) {
    category = 'Value';
  }

  // Generate Suggested Response
  let aiResponse = "";
  if (sentiment === 'Positive') {
    aiResponse = `Dear Guest,\n\nThank you so much for your wonderful review! We are absolutely thrilled to hear you had such a great time during your stay. We take great pride in our homestay's ${category.toLowerCase()} and hospitality, and it means the world to our team to receive such positive feedback. We hope to welcome you back to our eco-sanctuary in the near future!\n\nWarm regards,\nManagement Team`;
  } else if (sentiment === 'Negative') {
    aiResponse = `Dear Guest,\n\nThank you for taking the time to share your feedback. We sincerely apologize that your experience did not meet your expectations, particularly regarding the ${category.toLowerCase()} during your stay. We take your comments seriously and are already addressing this with our team to ensure improvements are made. We hope you will give us another chance in the future to show you the high standard of hospitality we aim for.\n\nSincerely,\nManagement Team`;
  } else {
    aiResponse = `Dear Guest,\n\nThank you for your review and for sharing your constructive feedback. We are glad you enjoyed parts of your stay, but also appreciate your notes on the ${category.toLowerCase()}. We are always looking for ways to improve our homestay experience and will use your input to refine our services. We hope to host you again for an even better stay.\n\nKind regards,\nManagement Team`;
  }

  return { sentiment, category, aiResponse };
}

export async function analyzeReview(reviewText: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY" || apiKey.trim() === "") {
    return analyzeFallback(reviewText);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash as the fast, cost-effective model for text processing tasks
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are an advanced AI assistant built for ReviewLens AI, a feedback analysis system for a forest eco-homestay.
Your task is to analyze the following customer review and return a structured JSON response.

Please classify the review into:
1. Sentiment: Must be exactly one of "Positive", "Neutral", "Negative".
2. Category: Must be exactly one of "Food", "Cleanliness", "Location", "Host", "Value", "Experience".
3. AI Response: Draft a professional, warm response to the guest from the "Management Team".
   - For "Positive" reviews, thank the guest warmly, highlight their positive comments (especially regarding their chosen category like ${"${category}"}), and express excitement to welcome them back.
   - For "Negative" reviews, apologize sincerely, acknowledge the specific issue they faced, and promise that management is taking steps to resolve it.
   - For "Neutral" reviews, thank them for their feedback, address both the positives and negatives constructively, and assure them their comments are helping improve the service.

The homestay is located deep in nature (forest, mountains, rivers), so keep the tone serene, nature-friendly, polite, and professional.

Return ONLY a JSON object with this exact structure:
{
  "sentiment": "Positive" | "Neutral" | "Negative",
  "category": "Food" | "Cleanliness" | "Location" | "Host" | "Value" | "Experience",
  "aiResponse": "Drafted response text"
}

Review to analyze:
"${reviewText}"
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean response text if there are any markdown fences
    let cleanJsonStr = responseText.trim();
    if (cleanJsonStr.startsWith("```json")) {
      cleanJsonStr = cleanJsonStr.substring(7);
    }
    if (cleanJsonStr.endsWith("```")) {
      cleanJsonStr = cleanJsonStr.substring(0, cleanJsonStr.length - 3);
    }
    cleanJsonStr = cleanJsonStr.trim();

    const parsed = JSON.parse(cleanJsonStr);

    // Validate structure and type-safety of output
    const sentiment: 'Positive' | 'Neutral' | 'Negative' = 
      ['Positive', 'Neutral', 'Negative'].includes(parsed.sentiment) 
        ? parsed.sentiment 
        : 'Neutral';

    const category: 'Food' | 'Cleanliness' | 'Location' | 'Host' | 'Value' | 'Experience' = 
      ['Food', 'Cleanliness', 'Location', 'Host', 'Value', 'Experience'].includes(parsed.category)
        ? parsed.category
        : 'Experience';

    const aiResponse: string = parsed.aiResponse || "";

    if (!aiResponse) {
      throw new Error("Empty AI Response from model");
    }

    return { sentiment, category, aiResponse };
  } catch (error) {
    console.error("Gemini API call failed, falling back to heuristics:", error);
    return analyzeFallback(reviewText);
  }
}
