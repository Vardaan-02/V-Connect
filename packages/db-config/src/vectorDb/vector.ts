import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "openai";
import "dotenv/config";

type similarityMatrix="dot_product"|"cosine"|"euclidean";

const { ASTRADB_COLLECTION, ASTRADB_API_ENDPOINT, ASTRADB_APPLICATION_TOKEN, ASTRADB_NAMESPACE, OPENAI_API_KEY } = process.env;

if (!ASTRADB_COLLECTION || !ASTRADB_API_ENDPOINT || !ASTRADB_APPLICATION_TOKEN || !ASTRADB_NAMESPACE || !OPENAI_API_KEY) {
  throw new Error("One or more environment variables are missing");
}

const openai=new OpenAI({apiKey:OPENAI_API_KEY});

// const data=[
// "https://pearl3-d.vercel.app/profile",
// ]

const client = new DataAPIClient(ASTRADB_APPLICATION_TOKEN);
const db = client.db(ASTRADB_API_ENDPOINT, { namespace: ASTRADB_NAMESPACE });
const collection = db.collection(ASTRADB_COLLECTION);

const splitter=new RecursiveCharacterTextSplitter({
  chunkSize:512,
  chunkOverlap:100,
});


const createCollection = async (similarityMetric: similarityMatrix = "dot_product") => {
 const res = await db.createCollection(ASTRADB_COLLECTION, {
   vector: {
     dimension: 1536,
     metric: similarityMetric,
   },
 });
 console.log(res);
};


const loadSampleData=async ()=>{
  const collection=db.collection(ASTRADB_COLLECTION);
//   for await(const set of data){
//    const content = await scrapePage(set);
//    const chunks=await splitter.splitText(content);
//    for await(const chunk of chunks){
//     const embedding = await openai.embeddings.create({
//      model: "text-embedding-ada-002",
//      input: chunk,
//    });
//    const vector = embedding.data[0].embedding;
//     const res=await collection.insertOne({
//       $vector:vector,
//       text:chunk,
//     })
//     console.log(res);
//   }
// }
  for await(const set of data2){
   const chunks=await splitter.splitText(set);
   for await(const chunk of chunks){
    const embedding = await openai.embeddings.create({
     model: "text-embedding-ada-002",
     input: chunk,
   });
   const vector = embedding.data[0].embedding;
    const res=await collection.insertOne({
      $vector:vector,
      text:chunk,
    })
    console.log(res);
  }
}
}

const scrapePage=async (url:string)=>{
  const loader=new PuppeteerWebBaseLoader(url,{
   launchOptions:{
    headless:true,
   },
   gotoOptions:{
     waitUntil:"domcontentloaded"
   },
   evaluate: async(page,browser)=>{
    const result=await page.evaluate(() => document.body.innerHTML);
    await browser.close();
    return result;
   }
  })
  return (await loader.scrape())?.replace(/<[^>]*>?/gm, '');
}

createCollection().then(() => loadSampleData())

const data2=[
 " General Information",
 " Name of the Platform: PostPearl",
 " Tagline/Slogan: Social Media, Reimagined",
  "Launch Year: 2024",
 " Founder(s): Vishwas",
 "Headquarters Location: Prayagraj",
 "Platform Type: Web-Based Social Media Network",
 "Development Status: Active Development",
 " Open Source Contributions: Planned",
 " Purpose & Target Audience",
  "Primary Purpose: Content Sharing & Networking",
 " Target Audience: Teenagers, Developers, Content Creators, Open-Source Enthusiasts",
  "User Demographics: Tech-Savvy Individuals, Students, Privacy-Conscious Users",
  "Community Focus: Engaging, Supportive, and Tech-Driven",
 " Key Features:Core Features:Posts (Text, Images, Videos)Stories (Temporary Content Sharing)AI Chatbot (Engagement & Assistance)User Profiles with CustomizationEnd-to-End Encryption for PrivacyNo Tracking, No Ads, No Data Exploitation",
 " Upcoming Features:Communities/Groups (Topic-Based Interaction)Developer Showcase (Portfolio Sharing & Feedback)Collaborative Coding Space (Live Code Editing & Sharing) Built-in Blogging Platform for Long-Form ContentInteractive Polls & Q&A Features",
 " Privacy & Security:End-to-End Encryption: Protecting Messages & User DataZero Tracking Policy: No Data Selling or Ad Targeting User-Controlled Data: Option to Export/Delete Account & DataOpen-Source Transparency: Planned for Public Review & ContributionsMinimal Permissions Required: No Excessive Data CollectionUser Experience & Design",
 " UI/UX Philosophy:Clean, Minimalist, Distraction-Free InterfaceFuturistic, Dark Mode-First ApproachSmooth Navigation & Intuitive Interactions",
 " Customization Options:Custom Profile ThemesAdjustable Feed Algorithm for Personalized Content",
 " Monetization Approach: No Ads (Ad-Free Forever)Open-Source Contributions & Community SupportFuture Premium Features (Optional Enhancements)Crowdfunding or Membership-Based Model ConsiderationCompetitors & Market PositioningPrimary Competitor: InstagramOther Similar Platforms: Twitter (X), Reddit, Discord, Mastodon",
 " Unique Selling Points (USP):Ad-Free Experience: No Distractions from AdvertisementsPrivacy-Focused: Encryption & User-Controlled Data Developer-Centric Features: Collaborative Spaces & Showcases",
 " Technology Stack: Frontend: React (Next.js)Backend: Apollo Server + Prisma Database: PostgreSQLHosting: Cloud-Based, Scalable InfrastructureSecurity Measures: OAuth Authentication, Secure APIs",
 
 " Social & Engagement Features: Like, Comment, Share SystemAI-Driven Content Recommendations (Non-Intrusive)Real-Time Notifications & MentionsDirect Messaging with Encryption",
 " Planned Social Features:Live Streaming for Developers & Creators,Events & Meetups for the Tech Community Verified Developer BadgesGrowth & Future Plans",
 " Short-Term Goals:Increase Early Adopters & Developer Engagement,Improve Chatbot Capabilities for Personalized Assistance Optimize Performance & Scalability",
 " Long-Term Vision: Launch Mobile App & PWA Version Expand Global Community & Open-Source Involvement Integrate AI-Powered Content Moderation & AssistancePosition PostPearl as a Go-To Platform for Privacy-Focused Social Networking",
  
 "User Assistance Guide",
 "1️⃣ How to Sign Up on PostPearl:,Go to [PostPearl Website] (insert actual link).Click on Sign Up on the homepage.Enter your Username, Email, and Password.Verify your email (Check your inbox for the confirmation link).Set up your Profile Picture and Bio (optional).Click Create Account – You’re now part of PostPearl! 🎉",
 "2️⃣ How to Sign In:Visit [PostPearl Website].Click Log In.Enter your Registered Email & Password.Click Sign In – You’re in! 🚀",
 "3️⃣ How to Create a Post:Click on the + Create Post button.Choose your post type: Text, Image, or Video.Write your content and add relevant hashtags (#).Click Post to share it with your followers.",
 "4️⃣ How to Like & Comment on Posts:Like a Post: Click the ❤️ (like) button under a post.Comment on a Post: Click 💬 (comment), type your message, and hit Post.",
 "5️⃣ How to Follow & Unfollow UsersFollow a User:Visit their Profile Page.Click Follow ✅.Unfollow a User:Go to their profile.Click Following > Unfollow.",
 "6️⃣ How to Use StoriesClick on Your Profile Picture at the top.Select Upload Image/Video or Type a Text Story.Set the expiration time (default: 24 hours).Click Post Story.",
 "7️⃣ How to Chat with the AI ChatbotClick on the Chatbot Icon in the bottom right corner.Type your question or request (e.g., “What’s trending?”).The AI will respond instantly.You can ask follow-up questions or close the chat anytime.",
 "8️⃣ How to Edit Your Profile:Go to your Profile Page.Click Edit Profile.Update your Username, Bio, Profile Picture, and Links.Click Save Changes.",
 "9️⃣ How to Delete a Post:Click the ⋮ (More Options) on your post.Select Delete Post.Confirm deletion – The post will be permanently removed.",
 "🔟 How to Log OutClick on your Profile Icon (top right).Select Log Out.You will be signed out securely.",
 ]