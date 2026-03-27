"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false,
  });
  useEffect(() => {
    results?.forEach((result) => {
      setUserAnswer((prev) => prev + " " + result?.transcript);
    });
  }, [results]);
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);
  const StartStopRecording = () => {
    if (isRecording) stopSpeechToText();
    else startSpeechToText();
  };
  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = `
Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
User Answer: ${userAnswer}
Return ONLY JSON:
{
  "rating": number,
  "feedback": "string"
}
`;
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      });
      const data = await response.json();
      const text = data.text;
      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const match = cleanText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Invalid JSON");
      const JsonFeedbackResp = JSON.parse(match[0]);
      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });
      toast("Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    } catch (err) {
      console.error(err);
      toast("Error generating feedback");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center">
      {/* Webcam Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Your Camera
          </h2>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-emerald-500"
              }`}
            />
            <span className="text-xs text-gray-500">
              {isRecording ? "Recording" : "Ready"}
            </span>
          </div>
        </div>
        {/* Webcam Feed */}
        <div className="relative bg-gray-900">
          <Image
            src="/webcam.png"
            width={200}
            height={200}
            alt="webcam"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
          />
          <Webcam
            mirrored
            className="w-full"
            style={{ height: 320 }}
          />
          {/* Recording Indicator Overlay */}
          {isRecording && (
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Recording...
            </div>
          )}
        </div>
        {/* Privacy Footer */}
        <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/30">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-gray-400" />
            <p className="text-xs text-gray-400">
              Your video is not recorded or stored
            </p>
          </div>
        </div>
      </div>
      {/* Record Button */}
      <Button
        onClick={StartStopRecording}
        disabled={loading}
        size="lg"
        className={`mt-6 gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-all duration-200 ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : ""
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : isRecording ? (
          <>
            <StopCircle className="w-4 h-4" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            Record Answer
          </>
        )}
      </Button>
      {/* Transcription Preview */}
      {userAnswer && (
        <div className="mt-4 w-full max-w-md p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Your Answer
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {userAnswer.trim()}
          </p>
        </div>
      )}
    </div>
  );
}
export default RecordAnswerSection;
