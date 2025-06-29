import OpenAI from "openai"
import {DataAPIClient} from "@datastax/astra-db-ts"



const { ASTRADB_COLLECTION, ASTRADB_API_ENDPOINT, ASTRADB_APPLICATION_TOKEN, ASTRADB_NAMESPACE, OPENAI_API_KEY } = process.env;

const openai=new OpenAI({
  apiKey:OPENAI_API_KEY
})
const client= new DataAPIClient(ASTRADB_APPLICATION_TOKEN)
const db=client.db(ASTRADB_API_ENDPOINT,{namespace:ASTRADB_NAMESPACE})

export async function POST(req:Request){
  try{
    console.log("hi");
   const {messages}=await req.json();
   console.log(messages);
   const latestMessage=messages[messages.length-1].content;
   let docContext="";
   const embedding=await openai.embeddings.create({
    model:"text-embedding-ada-002",
    input:latestMessage,
    encoding_format:"float"
   })
   try{
    const collection=db.collection(ASTRADB_COLLECTION);
    const cursor=collection.find(null,{
     sort:{
      $vector:embedding.data[0].embedding
     },
     limit:10
    })
    const documents=await cursor.toArray();
    const docMap=documents.map((doc)=>{
     return doc.text;
    })
    docContext=JSON.stringify(docMap);
   }
   catch(error){
    console.log("error querying db");
    docContext="";
   }
   const template={
    role:"system",
    content:`YOu are an Ai Assistant who knows everything about the pearlwebsites basically websites made by vishwas a student in iiit allahbad and a web developer, 3 star at codechef and pupil on codeforces, learning genai ,Use the below context to augment what you know about a social media website made by vishwas . THe context will provide you with information about the website and its features.
    If the context doesnt include the information you need, you can asnwer on your existing knowledge just dont mention the source or what the context does or doesnt include. Format Responses using markdown whereevr applicable and dont return images.
    ------------------
    START CONTEXT
    ${docContext}
    END CONTEXT
    ------------------
    Question:${latestMessage}
    ------------------
    `
   }
   const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      template,
      ...messages,
    ],
  });
  console.log(JSON.stringify(response.choices[0].message));
  const message = response.choices[0].message;
  const responseBody = { message };
  const jsonResponse = JSON.stringify(responseBody);
  return new Response(jsonResponse, {
    headers: { 'Content-Type': 'application/json' },
  });
  }
  catch(error){
   console.log(error);
  }
}