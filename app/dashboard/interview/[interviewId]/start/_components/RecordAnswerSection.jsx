"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false
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
        createdAt: moment().format('DD-MM-yyyy'),
      });

      toast("Answer recorded ✅");
      setUserAnswer('');
      setResults([]);

    } catch (err) {
      console.error(err);
      toast("Error generating feedback ❌");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black p-5 rounded-lg mt-10">
        <Image src="/webcam.png" width={200} height={200} alt="webcam" className="absolute" />
        <Webcam mirrored style={{ height: 400, width: 400 }} />
      </div>

      <Button onClick={StartStopRecording} disabled={loading} className="mt-5">
        {isRecording ? <><StopCircle /> Stop</> : <><Mic /> Record</>}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;