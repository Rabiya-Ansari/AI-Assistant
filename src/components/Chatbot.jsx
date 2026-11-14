import axios from 'axios'
import React, { useState } from 'react'

const Chatbot = () => {
    const [data, setData] = useState("")
    const [result, setResult] = useState("")
    const API_KEY = import.meta.env.VITE_AI_KEY

    const extractText = (obj) => {
        if (!obj) return ""
        if (typeof obj === "string") return obj
        if (Array.isArray(obj)) return obj.map(extractText).filter(Boolean).join("\n")
        if (typeof obj === "object") {
            if (obj.text && typeof obj.text === "string") return obj.text
            if (obj.parts) return extractText(obj.parts)
            if (obj.content) return extractText(obj.content)
            if (obj.output) return extractText(obj.output)
            if (obj.message) return extractText(obj.message)
        }
        return ""
    }

    const getData = async () => {
        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/interactions',
                {
                    model: "models/gemini-3.5-flash",
                    input: data
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": API_KEY
                    }
                }
            )
            const steps = response.data.steps || []
            const replyStep = steps[steps.length - 1]
            const finalText = extractText(replyStep) || extractText(steps)
            setResult(finalText || "No text found.")
        } catch (err) {
            console.log(err)
            setResult("Something went wrong.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white p-6">

                <h1 className="text-3xl font-bold text-center text-black mb-6">
                    AI Assistant
                </h1>

                <textarea
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="...."
                    className="w-full h-32 border border-gray-300 p-3"
                />

                <button
                    onClick={getData}
                    className="w-full bg-blue-600 text-white py-3 mt-3"
                >
                    Ask AI
                </button>

                <div className="mt-6 p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                        Answer: {result}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Chatbot
