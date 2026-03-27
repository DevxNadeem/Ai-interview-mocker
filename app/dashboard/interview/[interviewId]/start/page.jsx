"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Loader2,
} from "lucide-react";
function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  const totalQuestions = mockInterviewQuestion?.length || 0;
  const isFirstQuestion = activeQuestionIndex === 0;
  const isLastQuestion = activeQuestionIndex === totalQuestions - 1;
  const progress =
    totalQuestions > 0
      ? ((activeQuestionIndex + 1) / totalQuestions) * 100
      : 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Progress Bar */}
        {mockInterviewQuestion && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">
                Question {activeQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        {/* Loading State */}
        {!mockInterviewQuestion && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-gray-500 text-sm">
              Loading interview questions...
            </p>
          </div>
        )}
        {/* Main Content */}
        {mockInterviewQuestion && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Questions */}
              <QuestionsSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
              />
              {/* Video / Audio Recording */}
              <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
              />
            </div>
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {/* Previous */}
              <div>
                {!isFirstQuestion && (
                  <Button
                    variant="outline"
                    className="gap-2 rounded-lg border-gray-200 hover:bg-gray-50"
                    onClick={() =>
                      setActiveQuestionIndex(activeQuestionIndex - 1)
                    }
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}
              </div>
              {/* Question Dots */}
              <div className="hidden sm:flex items-center gap-1.5">
                {mockInterviewQuestion.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveQuestionIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                      index === activeQuestionIndex
                        ? "bg-primary scale-125"
                        : index < activeQuestionIndex
                          ? "bg-primary/40"
                          : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    title={`Question ${index + 1}`}
                  />
                ))}
              </div>
              {/* Next / End */}
              <div>
                {isLastQuestion ? (
                  <Link
                    href={
                      "/dashboard/interview/" +
                      interviewData?.mockId +
                      "/feedback"
                    }
                  >
                    <Button className="gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all">
                      End Interview
                      <Flag className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="gap-2 rounded-lg shadow-sm"
                    onClick={() =>
                      setActiveQuestionIndex(activeQuestionIndex + 1)
                    }
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default StartInterview;
