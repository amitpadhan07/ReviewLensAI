import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

const SAMPLE_REVIEWS = [
  {
    reviewText: "We stayed in the Canopy Cabin for 3 nights. The views of the pine forest were spectacular, and the sound of the nearby creek was so soothing. The home-cooked wood-fired local breakfast was the highlight! The host was exceptionally warm.",
    sentiment: "Positive",
    category: "Location",
    aiResponse: "Dear Guest,\n\nThank you so much for your wonderful review! We are absolutely thrilled to hear you had such a great time in our Canopy Cabin and enjoyed the pine forest views and creek sounds. We take great pride in our home-cooked wood-fired breakfast and the hospitality we offer. We hope to welcome you back to our eco-sanctuary soon!\n\nWarm regards,\nManagement Team",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    reviewText: "The location in the valley is beautiful, but the room was quite cold and the water heater was broken during our entire stay. When we told the staff, they said they'd check but nothing was done. Disappointed given the high price.",
    sentiment: "Negative",
    category: "Cleanliness",
    aiResponse: "Dear Guest,\n\nThank you for taking the time to share your feedback. We sincerely apologize that your experience did not meet your expectations, particularly regarding the cold room and the issues with the water heater. We take your comments seriously and are addressing this with our maintenance team to prevent this from happening again. We hope you will give us another chance in the future to show you a much better stay.\n\nSincerely,\nManagement Team",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
  },
  {
    reviewText: "Clean cabins and lovely nature walks. However, the WiFi is virtually non-existent, making it hard if you need to do any remote work. Good for a digital detox, but be prepared.",
    sentiment: "Neutral",
    category: "Value",
    aiResponse: "Dear Guest,\n\nThank you for your review and constructive feedback. We are glad you enjoyed the clean cabins and nature walks. While we promote our eco-sanctuary as a place for a digital detox, we understand that reliable connectivity is important for some guests, and we are evaluating ways to improve our internet access without losing our remote charm. We hope to host you again for another peaceful stay.\n\nKind regards,\nManagement Team",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    reviewText: "The local organic dinner cooked by the family was absolutely delicious! Everything was fresh from the garden. The cabin was basic but cozy. Very peaceful atmosphere.",
    sentiment: "Positive",
    category: "Food",
    aiResponse: "Dear Guest,\n\nThank you for sharing your experience! We are delighted to hear you loved the organic local dinner and found the cabin cozy. Our farm-to-table dining is one of our favorite things to share with guests. We look forward to welcoming you back to our peaceful sanctuary!\n\nWarm regards,\nManagement Team",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    reviewText: "The hosts were incredibly helpful and treated us like family. They arranged transport and guided us through the trails. The accommodation is nested deep in nature.",
    sentiment: "Positive",
    category: "Host",
    aiResponse: "Dear Guest,\n\nThank you so much for your kind words! We are thrilled that you felt so welcomed by our team. Providing a warm, family-like hospitality is our core mission. We hope to guide you through more trails on your next visit!\n\nWarm regards,\nManagement Team",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    reviewText: "Beautiful views and very quiet, but the bathroom was not properly cleaned and there were insects inside. We understand it's a forest stay, but basic hygiene should be maintained.",
    sentiment: "Negative",
    category: "Cleanliness",
    aiResponse: "Dear Guest,\n\nThank you for your feedback. We apologize for the issues you encountered with bathroom cleanliness. While being deep in the forest brings us closer to nature and bugs, we maintain high standards of cleanliness and have reinforced housekeeping protocols to ensure the cabins are thoroughly cleaned and inspected. We hope to welcome you back for a flawless stay.\n\nSincerely,\nManagement Team",
    createdAt: new Date() // Today
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Check if empty
    const count = await Review.countDocuments();
    if (count === 0) {
      await Review.insertMany(SAMPLE_REVIEWS);
    }
    
    // Fetch all sorted by createdAt desc
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, count: reviews.length, reviews });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch reviews";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
