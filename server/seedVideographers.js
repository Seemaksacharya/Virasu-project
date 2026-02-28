const mongoose = require("mongoose");
const Videographer = require("./models/Videographer");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const sampleExperts = [
  {
    name: "Arjun",
    specialization: "Wedding Photography",
    price: 50000,
    description:
      "Arjun is a highly skilled wedding videographer with over 6 years of experience capturing intimate and grand celebrations. He specializes in cinematic storytelling videos that highlight emotions, rituals, and cultural beauty. His expertise lies in blending traditional aesthetics with modern cinematic techniques, ensuring every frame is artistic. Arjun has successfully completed over 120 weddings and is known for delivering heart-touching highlight reels.",
    experience: "6+ years in cinematic wedding storytelling",
    awards: ["Best Wedding Videographer 2023", "Top Cinematic Films Award"],
    portfolio: [
      "/uploads/arjun1.jpg",
      "/uploads/arjun2.jpg",
      "/uploads/arjun3.jpg",
      "/uploads/arjun4.jpg",
      "/uploads/arjun5.jpg",
      "/uploads/arjun6.jpg"
    ],
    videos: [
      "https://www.youtube.com/embed/ScMzIvxBSi4",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ],
    reviews: [
      { user: "Priya & Ankit", comment: "Arjun captured our wedding beautifully! The highlight video made our families cry with joy.", rating: 5 },
      { user: "Rahul", comment: "Very professional, punctual, and talented. Highly recommended for weddings!", rating: 4 },
    ]
  },
  {
    name: "Raj",
    specialization: "Event Videography",
    price: 20000,
    description:
      "Raj is an expert in corporate and personal event videography. His dynamic filming style brings energy and vibrancy to concerts, product launches, birthdays, and corporate events. He is skilled in working with large crowds, stage lighting, and high-energy performances. Raj’s clients include several leading brands and startups, and he is appreciated for his quick turnaround times.",
    experience: "8 years in corporate & concert filming",
    awards: ["Best Event Coverage Award 2022"],
    portfolio: [
      "/uploads/raj1.jpeg",
      "/uploads/raj2.jpeg",
      "/uploads/raj3.jpeg",
      "/uploads/raj4.jpeg",
      "/uploads/raj5.jpeg",
      "/uploads/raj6.jpeg"
    ],
    videos: [
      "https://www.youtube.com/embed/aqz-KE-bpKQ",
      "https://www.youtube.com/embed/tgbNymZ7vqY"
    ],
    reviews: [
      { user: "Infosys Bangalore", comment: "Raj covered our corporate event flawlessly. Everyone loved the final video!", rating: 5 },
      { user: "Ananya", comment: "Amazing work for my birthday event, captured all the special moments.", rating: 4 },
    ]
  },
  {
    name: "Meerao",
    specialization: "Fashion & Portfolio Shoots",
    price: 18000,
    description:
      "Meera is a creative fashion videographer who collaborates with designers, models, and influencers to produce stunning portfolio films. Her videos focus on elegance, style, and storytelling. She has worked with several modeling agencies and fashion brands, bringing out the best of fabric, makeup, and confidence in her shoots.",
    experience: "5 years in fashion videography & portfolio shoots",
    awards: ["Fashion Excellence Award 2021"],
    portfolio: [
      "/uploads/meera1.jpeg",
      "/uploads/meera2.jpeg",
      "/uploads/meera3.jpeg",
      "/uploads/meera4.jpeg",
      "/uploads/meera5.jpeg",
      "/uploads/meera6.jpeg"
    ],
    videos: [
      "https://www.youtube.com/embed/2g811Eo7K8U",
      "https://www.youtube.com/embed/9bZkp7q19f0"
    ],
    reviews: [
      { user: "Simran", comment: "Meera created an amazing fashion portfolio for me, which helped me land 3 modeling projects.", rating: 5 },
      { user: "Designer Studio", comment: "Professional and stylish video content. Loved her sense of aesthetics.", rating: 4 },
    ]
  },
  {
    name: "Karan",
    specialization: "Cinematic Wedding Films",
    price: 25000,
    description:
      "Karan is known for producing grand cinematic wedding films that look like movies. He uses drones, cinematic lenses, and advanced editing to deliver films that feel larger-than-life. His storytelling captures candid laughter, tears, and rituals, making couples relive their day every time they watch the film.",
    experience: "10 years in luxury wedding cinematics",
    awards: ["Luxury Wedding Cinematographer 2020", "Drone Excellence Award"],
    portfolio: [
      "/uploads/karan1.jpeg",
      "/uploads/karan2.jpeg",
      "/uploads/karan3.jpeg",
      "/uploads/karan4.jpeg",
      "/uploads/karan5.jpeg",
      "/uploads/karan6.jpeg"
    ],
    videos: [
      "https://www.youtube.com/embed/5qap5aO4i9A",
      "https://www.youtube.com/embed/jNQXAC9IVRw"
    ],
    reviews: [
      { user: "Sneha & Ramesh", comment: "Karan turned our wedding into a cinematic masterpiece. The drone shots were breathtaking!", rating: 5 },
      { user: "Akshay", comment: "Very creative and friendly team. Loved the editing style.", rating: 4 },
    ]
  }
];

async function seed() {
  try {
    await Videographer.deleteMany();
    await Videographer.insertMany(sampleExperts);
    console.log("✅ Videographers inserted with full details!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
