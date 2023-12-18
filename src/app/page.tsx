"use client";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Input, InputProps } from "@/components/Input";
import { UserCard, BotCard } from "@/components/Card";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [Indata, setIndata] = useState<string>("");
  const [messages, setMessages]: any = useState([]);
  const mend:any = useRef(null)

  useEffect(()=>{
    mend.current.scrollIntoView(messages)
  })

  const handlesend = async () => {
    const text1 = Indata;
    setIndata("");

    //@ts-ignore
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEYGEMINI_KEY);

    setMessages([
      ...messages,
      {
        text1,
        isBot: false,
      },
      {
        text1 : "Loading ..",
        isBot : true,
        isLoading : true
      }
    ]);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts:
            "You are a Bot named as KraxBot Created By kiran alex Challagiri and your purpose is to answer anything that  users sent you and if some one asks about him this is his linkedin link :- https://www.linkedin.com/in/kiran-a-ab0766203/ and this is his Github Link :- https://github.com/Kiran-Alex and he is a BCA Student in final year gonna graduate in 2024 studying in Kl University and he is a Software Developer And a full stack developer skilled in t3 stack(ts,prisma,postgresql,NextJs,trpc) and mern stack and also loves to explore ai stuff and apart from this dont include anything if someone asks about kiran ,for this text you dont need to respond but from next you need to respond according to what user asks",
        },
        {
          role: "model",
          parts:
            "As a bot created by Kiran Alex Challagiri, my purpose is to assist and provide information to users to the best of my capabilities. I am designed to answer a wide range of questions and fulfill various requests based on the training data and algorithms I have been developed with. My primary goal is to help users find the information they need efficiently and effectively.\n\nHere are some of the ways I can assist you:\n\n**Answer Questions**: Provide factual and informative answers to your questions on a variety of topics, including general knowledge, science, history, current events, and more.\n\n**Provide Definitions and Explanations**: Offer clear and concise explanations of concepts, terms, or ideas that you may be unfamiliar with.\n\n**Translate Languages**: Translate words, phrases, or even entire sentences between various languages.\n\n**Summarize Text**: Provide concise summaries of articles, documents, or large blocks of text, highlighting the key points and main ideas.\n\n**Compose Creative Text**: Generate creative content such as poems, short stories, or even song lyrics based on your input and preferences.\n\n**Offer Suggestions**: Suggest ideas, recommendations, or alternative perspectives on various topics or situations.\n\n**Perform Calculations**: Handle basic mathematical calculations, including arithmetic operations, percentages, and simple equations.\n\n**Set Reminders**: Assist you in setting reminders or alarms for important events or tasks.\n\n**Provide Weather Updates**: Offer current weather conditions and forecasts for specific locations.\n\n**Tell Jokes**: Share jokes and humorous stories to lighten the mood or provide a moment of laughter.\n\n**Play Games**: Engage in simple games like tic-tac-toe or trivia to provide entertainment and mental stimulation.\n\n**Offer Emotional Support**: Provide empathetic responses and support during difficult times or emotional situations.\n\nPlease note that my responses are generated based on the data and algorithms I have been trained on, and may not always be comprehensive or completely accurate. If you have any specific questions or concerns, it is always best to consult with an expert or professional in the relevant field.",
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage(text1);
    const response = await result.response;

    try {
      const text = response.text();

      setMessages([
        ...messages,
        {
          text1,
          isBot: false,
        },
        {
          text1: text,
          isBot: true,
          isLoading :false
        },
      ]);
    } catch (err) {
      setMessages([
        ...messages,
        {
          text1,
          isBot: false,
        },
        {
          text1:
            "Entering inappropriate language or discussing sensitive topics is strictly prohibited.",
          isBot: true,
        },
      ]);
    }

    console.log(messages);
  };

  return (
    <>
      <main key="1" className="p-4 bg-gray-100 h-screen flex flex-col">
        <Navbar />

        <div className="flex-1 overflow-auto mb-4">
          <BotCard response={""} />

          {messages.map(
            (message: { text1: string; isBot: boolean;isLoading? : boolean }, i: number) => (
              <UserCard
                username={""}
                message={message.text1}
                key={i}
                isBot={message.isBot}
                isLoading = {message.isLoading}
              />
            )
          )}
          <div ref={mend}/>
        </div>

        

        <div className="border-t-2 border-gray-200 pt-2 space-x-2 flex items-center">
          <input
          onKeyDown={async(e)=>{if(e.key== "Enter")await handlesend()}}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow  text-black"
            placeholder="Type your message here..."
            onChange={(e) => {
              setIndata(e.target.value);
            }}
            value={Indata}
          />
          <button
          
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black"
            onClick={() => {
              handlesend();
            }}
          >
            Send
          </button>
        </div>
      </main>
    </>
  );
}
