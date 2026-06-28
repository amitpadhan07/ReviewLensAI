const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend port 3000
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// In-Memory Data Store representing reviews
let reviews = [
  {
    _id: "1",
    reviewText: "We stayed in the Canopy Cabin for 3 nights. The views of the pine forest were spectacular, and the sound of the nearby creek was so soothing. The home-cooked wood-fired local breakfast was the highlight! The host was exceptionally warm.",
    sentiment: "Positive",
    category: "Location",
    aiResponse: "Dear Guest,\n\nThank you so much for your wonderful review! We are absolutely thrilled to hear you had such a great time in our Canopy Cabin and enjoyed the pine forest views and creek sounds. We take great pride in our home-cooked wood-fired breakfast and the hospitality we offer. We hope to welcome you back to our eco-sanctuary soon!\n\nWarm regards,\nManagement Team",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "2",
    reviewText: "The location in the valley is beautiful, but the room was quite cold and the water heater was broken during our entire stay. When we told the staff, they said they'd check but nothing was done. Disappointed given the high price.",
    sentiment: "Negative",
    category: "Cleanliness",
    aiResponse: "Dear Guest,\n\nThank you for taking the time to share your feedback. We sincerely apologize that your experience did not meet your expectations, particularly regarding the cold room and the issues with the water heater. We take your comments seriously and are addressing this with our maintenance team to prevent this from happening again. We hope you will give us another chance in the future to show you a much better stay.\n\nSincerely,\nManagement Team",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "3",
    reviewText: "Clean cabins and lovely nature walks. However, the WiFi is virtually non-existent, making it hard if you need to do any remote work. Good for a digital detox, but be prepared.",
    sentiment: "Neutral",
    category: "Value",
    aiResponse: "Dear Guest,\n\nThank you for your review and constructive feedback. We are glad you enjoyed the clean cabins and nature walks. While we promote our eco-sanctuary as a place for a digital detox, we understand that reliable connectivity is important for some guests, and we are evaluating ways to improve our internet access without losing our remote charm. We hope to host you again for another peaceful stay.\n\nKind regards,\nManagement Team",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "4",
    reviewText: "The local organic dinner cooked by the family was absolutely delicious! Everything was fresh from the garden. The cabin was basic but cozy. Very peaceful atmosphere.",
    sentiment: "Positive",
    category: "Food",
    aiResponse: "Dear Guest,\n\nThank you for sharing your experience! We are delighted to hear you loved the organic local dinner and found the cabin cozy. Our farm-to-table dining is one of our favorite things to share with guests. We look forward to welcoming you back to our peaceful sanctuary!\n\nWarm regards,\nManagement Team",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "5",
    reviewText: "The hosts were incredibly helpful and treated us like family. They arranged transport and guided us through the trails. The accommodation is nested deep in nature.",
    sentiment: "Positive",
    category: "Host",
    aiResponse: "Dear Guest,\n\nThank you so much for your kind words! We are thrilled that you felt so welcomed by our team. Providing a warm, family-like hospitality is our core mission. We hope to guide you through more trails on your next visit!\n\nWarm regards,\nManagement Team",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "6",
    reviewText: "Beautiful views and very quiet, but the bathroom was not properly cleaned and there were insects inside. We understand it's a forest stay, but basic hygiene should be maintained.",
    sentiment: "Negative",
    category: "Cleanliness",
    aiResponse: "Dear Guest,\n\nThank you for your feedback. We apologize for the issues you encountered with bathroom cleanliness. While being deep in the forest brings us closer to nature and bugs, we maintain high standards of cleanliness and have reinforced housekeeping protocols to ensure the cabins are thoroughly cleaned and inspected. We hope to welcome you back for a flawless stay.\n\nSincerely,\nManagement Team",
    createdAt: new Date().toISOString()
  }
];

// Fallback logic when Gemini API Key is missing or default
function analyzeFallback(reviewText) {
  console.warn("Using fallback mock analyzer (Gemini API Key is not configured or is default).");
  
  let sentiment = 'Neutral';
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
  let category = 'Experience';
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

async function analyzeReview(reviewText) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY" || apiKey.trim() === "") {
    return analyzeFallback(reviewText);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
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
   - For "Positive" reviews, thank the guest warmly, highlight their positive comments (especially regarding their chosen category), and express excitement to welcome them back.
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
    const rawText = result.response.text();
    return JSON.parse(rawText.trim());
  } catch (error) {
    console.error("Gemini call failed, invoking fallback:", error);
    return analyzeFallback(reviewText);
  }
}

// ---------------- REST API ENDPOINTS ----------------

// 1. GET /api/reviews - List all reviews
app.get("/api/reviews", (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews: reviews
    });
  } catch (err) {
    next(err);
  }
});

// 2. GET /api/reviews/search - Search reviews by q, category or sentiment
app.get("/api/reviews/search", (req, res, next) => {
  try {
    const { q, category, sentiment } = req.query;
    let filtered = [...reviews];

    if (q) {
      const qLower = q.toLowerCase();
      filtered = filtered.filter(r => 
        r.reviewText.toLowerCase().includes(qLower) || 
        r.aiResponse.toLowerCase().includes(qLower)
      );
    }

    if (category) {
      filtered = filtered.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }

    if (sentiment) {
      filtered = filtered.filter(r => r.sentiment.toLowerCase() === sentiment.toLowerCase());
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      reviews: filtered
    });
  } catch (err) {
    next(err);
  }
});

// 3. GET /api/reviews/:id - Get single review
app.get("/api/reviews/:id", (req, res, next) => {
  try {
    const review = reviews.find(r => r._id === req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, error: "Review not found." });
    }
    res.status(200).json({ success: true, review });
  } catch (err) {
    next(err);
  }
});

// 4. POST /api/reviews - Create a review manually
app.post("/api/reviews", (req, res, next) => {
  try {
    const { reviewText, sentiment, category, aiResponse } = req.body;

    if (!reviewText || !sentiment || !category || !aiResponse) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields: reviewText, sentiment, category, and aiResponse are all required." 
      });
    }

    if (reviewText.trim().length < 10) {
      return res.status(400).json({ 
        success: false, 
        error: "Review text must be at least 10 characters long." 
      });
    }

    const newReview = {
      _id: Date.now().toString(),
      reviewText: reviewText.trim(),
      sentiment,
      category,
      aiResponse,
      createdAt: new Date().toISOString()
    };

    reviews.unshift(newReview);
    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    next(err);
  }
});

// 5. PUT /api/reviews/:id - Update a review
app.put("/api/reviews/:id", (req, res, next) => {
  try {
    const index = reviews.findIndex(r => r._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Review not found." });
    }

    const { reviewText, sentiment, category, aiResponse } = req.body;

    if (reviewText && reviewText.trim().length < 10) {
      return res.status(400).json({ 
        success: false, 
        error: "Review text must be at least 10 characters long." 
      });
    }

    reviews[index] = {
      ...reviews[index],
      reviewText: reviewText ? reviewText.trim() : reviews[index].reviewText,
      sentiment: sentiment || reviews[index].sentiment,
      category: category || reviews[index].category,
      aiResponse: aiResponse || reviews[index].aiResponse
    };

    res.status(200).json({ success: true, data: reviews[index] });
  } catch (err) {
    next(err);
  }
});

// 6. DELETE /api/reviews/:id - Delete a review
app.delete("/api/reviews/:id", (req, res, next) => {
  try {
    const index = reviews.findIndex(r => r._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Review not found." });
    }

    reviews.splice(index, 1);
    res.status(204).send(); // 204 No Content has no body
  } catch (err) {
    next(err);
  }
});

// 7. POST /api/analyze - Analyze and create review
app.post("/api/analyze", async (req, res, next) => {
  try {
    const { reviewText } = req.body;

    if (!reviewText || typeof reviewText !== "string") {
      return res.status(400).json({ success: false, error: "Review text is required." });
    }

    const trimmedText = reviewText.trim();
    if (trimmedText.length < 10) {
      return res.status(400).json({ 
        success: false, 
        error: "Review text must be at least 10 characters long." 
      });
    }

    const analysis = await analyzeReview(trimmedText);

    const savedReview = {
      _id: Date.now().toString(),
      reviewText: trimmedText,
      sentiment: analysis.sentiment,
      category: analysis.category,
      aiResponse: analysis.aiResponse,
      createdAt: new Date().toISOString()
    };

    reviews.unshift(savedReview);

    res.status(201).json({
      success: true,
      data: savedReview
    });
  } catch (err) {
    next(err);
  }
});

// 8. GET /api/dashboard - Aggregates counts for charts
app.get("/api/dashboard", (req, res, next) => {
  try {
    const totalReviews = reviews.length;
    
    // Aggregation logic in memory
    const sentimentCounts = { Positive: 0, Neutral: 0, Negative: 0 };
    const categoryCounts = { Food: 0, Cleanliness: 0, Location: 0, Host: 0, Value: 0, Experience: 0 };

    reviews.forEach(r => {
      if (r.sentiment in sentimentCounts) {
        sentimentCounts[r.sentiment]++;
      }
      if (r.category in categoryCounts) {
        categoryCounts[r.category]++;
      }
    });

    const recentReviews = reviews.slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalReviews,
        sentimentCounts,
        categoryCounts,
        recentReviews
      }
    });
  } catch (err) {
    next(err);
  }
});

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Backend Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "An unexpected server error occurred."
  });
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
