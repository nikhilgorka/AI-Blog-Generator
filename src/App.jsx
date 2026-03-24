import React, { useState } from 'react'
import "./App.css"
import { GoogleGenAI } from "@google/genai";
import { FaBeer } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { IoMdArrowRoundBack } from "react-icons/io";

const App = () => {
  const [screen , setScreen] = useState(1);
  const [text , setText] = useState("");
  const [data , setData] = useState(null);
  const [loading , setLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey:"AIzaSyAYYamwRlfezaUzGRW2UKZGlQ54zQ-BhNI"}); // INSERT API KEY

  async function generateBlogContent() {
    setLoading(true);
    setScreen(2);
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents:  `
      You are an expert SEO blog writer and AI content strategist.
      Write a complete blog post on the topic: ${text}.
      Return the blog in Markdown format...
      `
    });
    console.log(response.text);
    setData(response.text);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">

      {
        screen === 1 ? 
        <>
          {/* ✅ GAP ADDED HERE */}
          <div className="flex flex-col items-center justify-center h-screen px-4 gap-8">

            {/* Title */}
            <h1 className='text-[48px] font-bold text-center leading-tight'>
              AI <span className='text-amber-400'>Blog</span> Content <span className='text-amber-400'>Generator</span> 
            </h1>

            <p className="text-gray-400 text-center max-w-xl">
              Generate SEO-optimized blogs instantly using AI
            </p>

            {/* Input Box */}
            <div className="w-full max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl transition-all focus-within:border-amber-400">
              
              <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="w-full min-h-[150px] bg-transparent outline-none text-white placeholder-gray-400 resize-none px-4 py-3"
                placeholder="Explain your blog topic..."
              />
            </div>

            {/* ✅ BUTTON (NO mt-8 NOW) */}
            <button 
              onClick={generateBlogContent} 
              className="relative w-[260px] py-3 rounded-xl font-semibold text-white overflow-hidden group"
            >
              {/* Gradient */}
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 transition-all duration-500 group-hover:scale-110"></span>

              {/* Glow */}
              <span className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:opacity-60"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                Generate ✨
              </span>
            </button>

          </div>
        </> : 
        <>
        {/* Centered Output */}
        <div className="flex justify-center px-4 py-10">

          <div className="w-full max-w-3xl">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <IoMdArrowRoundBack 
                className="cursor-pointer text-amber-400 hover:scale-110 transition"
                onClick={() => setScreen(1)}
              />
              <p className='font-bold text-[22px]'>OUTPUT</p>
            </div>

            {/* Output Box */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">

              {loading ?  
                <div className="flex justify-center items-center h-[300px]">
                  <ClipLoader
                    color="#f59e0b"
                    size={80}
                  />
                </div>
              : 
              <>
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-[17px]">
                  {data}
                </div>
              </>}

            </div>

          </div>
        </div>
        </>
      }
    </div>
  )
}

export default App
