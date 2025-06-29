import { HfInference } from '@huggingface/inference';

const inference = new HfInference(process.env.HUGGINGFACEHUB_ACCESS_TOKEN);

export async function POST(req:Request){
  try{
    console.log("hi");
   const { message } = await req.json();
   console.log(message);
   const template={
    role: "system",
    content: `Please enhance the text below by improving its vocabulary and adding content where necessary. Ensure the enhanced text remains concise and retains the original meaning. \n\nOriginal
    Text:  ${message}`,
  }
  
   const response = await inference.chatCompletion({
    model: 'microsoft/Phi-3-mini-4k-instruct', 
    messages: [template],
  });
const ans= response.choices[0].message;
const responseBody = { ans };
console.log(responseBody);
return new Response(JSON.stringify(responseBody), {
  headers: { 'Content-Type': 'application/json' },
});
  }
  catch(error){
   console.log(error);
  }
 }