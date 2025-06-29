import { HfInference } from '@huggingface/inference';

const inference = new HfInference(process.env.HUGGINGFACEHUB_ACCESS_TOKEN);

export async function POST(req:Request){
  try{
    console.log("hi");
   const { messages } = await req.json();
   console.log(messages);
   const latestMessage=messages[messages.length-1].content;
   const template={
    role: "system",
    content: `As an AI Assistant knowledgeable about PostPearl—a social media platform created by Vishwas in 2024 during his tenure at IIIT Allahabad, tailored for teenagers and developers—please provide detailed responses to the questions below. PostPearl's features include posts (text, images, videos), an AI chatbot, and user profiles. Its technology stack comprises React (Next.js) for the frontend, Apollo Server with Prisma for the backend, PostgreSQL for the database, cloud-based hosting, and security measures such as OAuth authentication and secure APIs. If the provided context doesn't cover specific information, please use your existing knowledge without mentioning the source or any limitations. Format responses using markdown where applicable If You Dont Know The Answer Just Return "Sorry, I Cant Answer That" 
    .\n-----------\nQuestion: ${latestMessage}`,
  }
  
   const response = await inference.chatCompletion({
    model: 'meta-llama/Meta-Llama-3-8B-Instruct', 
    messages: [template],
  });
const message = response.choices[0].message;
const responseBody = { message };
console.log(responseBody);
return new Response(JSON.stringify(responseBody), {
  headers: { 'Content-Type': 'application/json' },
});
  }
  catch(error){
   console.log(error);
  }
 }