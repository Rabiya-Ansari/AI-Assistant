import axios from 'axios'
import React, { useState } from 'react'

const Chatboard = () => {
    const [data, setData] = useState("")
    const [result, setResult] = useState("")

    const API_KEY = import.meta.env.VITE_AI_KEY

    const getData = async () => {

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
                {
                    contents: [
                        {
                            parts: [{ text: data }]
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": API_KEY
                    }
                }
            )
            console.log(response)
            setResult(response.data)
        }
        catch (err) {
            console.log(err)
            setResult("something wrong.")
        }
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white  p-6">

                <h1 className="text-3xl font-bold text-center text-black mb-6">
                    AI Assistant
                </h1>

                <textarea
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="...."
                    className="w-full h-32 border border-gray-300  p-3  "
                />

                <button
                    onClick={getData}
                    className="w-full bg-blue-600 text-white py-3  mt-3"
                >
                    Ask AI
                </button>

                <div className="mt-6  p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                        Answer:{result}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Chatboard