"use client";

import { useState, FormEvent, useEffect } from "react";
import { Bot, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";

interface WeatherData {
  location: string;
  coordinates: string;
  date: string;
  yearsSampled: number;
  probabilities: {
    veryHot: number;
    veryCold: number;
    veryWindy: number;
    veryWet: number;
    veryUncomfortable: number;
  };
  counts: {
    veryHot: number;
    veryCold: number;
    veryWindy: number;
    veryWet: number;
    veryUncomfortable: number;
  };
}

interface Message {
  id: number;
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
}

interface WeatherChatAssistantProps {
  weatherData: WeatherData;
}

export function WeatherChatAssistant({ weatherData }: WeatherChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate initial AI message - serious and professional
  const generateInitialMessage = (data: WeatherData) => {
    const highestRisk = Object.entries(data.probabilities)
      .reduce((a, b) =>
        data.probabilities[a[0] as keyof typeof data.probabilities] >
        data.probabilities[b[0] as keyof typeof data.probabilities]
          ? a
          : b
      )[0];

    const riskPercentage = (
      Math.max(...Object.values(data.probabilities)) * 100
    ).toFixed(1);
    const riskLevel =
      Math.max(...Object.values(data.probabilities)) >= 0.3
        ? "High"
        : Math.max(...Object.values(data.probabilities)) >= 0.15
        ? "Medium"
        : "Low";

    const conditionName = highestRisk
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    return `Hello. I'm your Weather Planning Assistant.

I've analyzed the weather data for **${data.location}** on **${data.date}**.

**Analysis Summary:**
- Primary risk: ${conditionName} (${riskPercentage}% probability)
- Risk assessment: ${riskLevel}
- Data based on ${data.yearsSampled} years of NASA satellite observations

I can help you with event planning strategies, risk mitigation, alternative arrangements, and seasonal insights.

How can I assist you today?`;
  };

  useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      content: generateInitialMessage(weatherData),
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [weatherData]);

  const callGeminiAPI = async (prompt: string, context: string): Promise<string> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        console.error("❌ Gemini API Key not configured");
        throw new Error("API key not configured");
      }

      console.log("🔄 Calling Gemini API...");

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${context}

User Question: ${prompt}

🧭 Guidelines:
- Keep responses under **6-7 lines**.
- Focus on practical and clear weather planning advice.
- Avoid repetition or lengthy explanations.
- Bold the highlighted text that is necessary
- Always end with a short concluding line.`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 250,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error:", response.status, errorText);
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Gemini API response received");

      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.candidates?.[0]?.output ||
        "I'm here to help you with your weather planning!";

      return aiResponse;
    } catch (error) {
      console.error("❌ Gemini API Error:", error);

      const highRisk = Math.max(...Object.values(weatherData.probabilities));
      const riskCondition = Object.entries(weatherData.probabilities)
        .find(([_, prob]) => prob === highRisk)?.[0]
        ?.replace(/([A-Z])/g, " $1")
        .toLowerCase();

      return `I'm currently unable to connect to the API.

Based on the analysis for **${weatherData.location}** on **${weatherData.date}**:

${highRisk > 0.3 ? `**High risk** of ${riskCondition} conditions detected. Consider indoor alternatives or comprehensive backup plans.` :
highRisk > 0.15 ? `**Moderate risk** identified. Maintain flexible scheduling and monitor forecasts regularly.` :
`**Low risk** assessment. Conditions appear favorable for outdoor events.`}

Please let me know if you need specific recommendations.`;
    }
  };

  const generateContextPrompt = (data: WeatherData) => {
    const risks = Object.entries(data.probabilities)
      .map(
        ([key, prob]) =>
          `${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: ${(prob * 100).toFixed(1)}%`
      )
      .join(", ");

    return `You are a weather planning assistant helping users make decisions about outdoor events.

📍 Location: ${data.location} (${data.coordinates})
📅 Date: ${data.date}
🛰️ Data source: ${data.yearsSampled} years of NASA POWER satellite data

Probabilities → ${risks}

Focus on actionable advice, encouragement, and weather risk mitigation.`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const contextPrompt = generateContextPrompt(weatherData);
      const aiResponse = await callGeminiAPI(input.trim(), contextPrompt);

      const aiMessage: Message = {
        id: messages.length + 2,
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickSuggestions = [
    "What outdoor event strategies do you recommend?",
    "How should I mitigate weather risks?",
    "What backup plans should I prepare?",
    "When is the optimal time for this event?",
  ];

  const handleQuickSuggestion = (suggestion: string) => setInput(suggestion);

  return (
    <ExpandableChat
      size="md"
      position="bottom-right"
      icon={<Bot className="h-5 w-5" />}
      className="z-40"
    >
      <ExpandableChatHeader className="flex-col text-center justify-center bg-white border-b py-3">
        <div className="flex items-center justify-center space-x-2">
          <Bot className="h-5 w-5 text-gray-700" />
          <h1 className="text-base font-semibold text-gray-900">
            Weather Assistant
          </h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {weatherData.location}
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody className="bg-gray-50">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-7 w-7 shrink-0"
                fallback={message.sender === "user" ? "U" : "AI"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
                className={
                  message.sender === "ai"
                    ? "bg-white border border-gray-200 text-gray-800 prose prose-sm max-w-none"
                    : "bg-blue-600 text-white"
                }
              >
                {message.sender === "ai" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar className="h-7 w-7 shrink-0" fallback="AI" />
              <ChatBubbleMessage isLoading className="bg-white border border-gray-200" />
            </ChatBubble>
          )}

          {messages.length === 1 && (
            <div className="px-3 py-2">
              <p className="text-xs text-gray-600 mb-2 font-medium">Suggested questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="text-left text-xs bg-white hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 transition-colors text-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className="bg-white border-t py-2">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-white focus-within:ring-1 focus-within:ring-gray-300 p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about weather planning..."
            className="min-h-10 resize-none rounded-lg bg-white border-0 p-2.5 shadow-none focus-visible:ring-0 text-sm text-gray-900 placeholder:text-gray-400"
            disabled={isLoading}
          />
          <div className="flex items-center p-2 pt-0 justify-end">
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs px-3 py-1.5"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
