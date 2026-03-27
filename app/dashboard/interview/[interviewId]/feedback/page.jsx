"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronsUpDown,
  Trophy,
  Star,
  MessageSquareText,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Home,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const router = useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
    // Calculate overall rating
    if (result.length > 0) {
      const totalRating = result.reduce(
        (sum, item) => sum + (Number(item.rating) || 0),
        0
      );
      setOverallRating((totalRating / result.length).toFixed(1));
    }
  };
  const getRatingColor = (rating) => {
    const r = Number(rating) || 0;
    if (r >= 8) return "text-emerald-600";
    if (r >= 5) return "text-amber-500";
    return "text-red-500";
  };
  const getRatingBg = (rating) => {
    const r = Number(rating) || 0;
    if (r >= 8) return "bg-emerald-50 border-emerald-200";
    if (r >= 5) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {feedbackList?.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <MessageSquareText className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Feedback Yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
              It looks like there&apos;s no interview feedback recorded for this
              session. Complete an interview to see your results here.
            </p>
            <Button
              onClick={() => router.replace("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        ) : (
          <>
            {/* ── Header Section ── */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Trophy className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                Interview Complete!
              </h1>
              <p className="text-gray-500 text-base sm:text-lg">
                Here&apos;s a detailed breakdown of your performance
              </p>
            </div>
            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {/* Overall Rating */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Overall Rating
                  </span>
                </div>
                <p
                  className={`text-4xl font-extrabold ${getRatingColor(overallRating)}`}
                >
                  {overallRating}
                  <span className="text-lg font-medium text-gray-400">/10</span>
                </p>
              </div>
              {/* Questions Answered */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <MessageSquareText className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Questions
                  </span>
                </div>
                <p className="text-4xl font-extrabold text-gray-900">
                  {feedbackList.length}
                </p>
              </div>
              {/* Strong Answers */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Strong Answers
                  </span>
                </div>
                <p className="text-4xl font-extrabold text-emerald-600">
                  {
                    feedbackList.filter((item) => (Number(item.rating) || 0) >= 7)
                      .length
                  }
                </p>
              </div>
            </div>
            {/* ── Question List ── */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Detailed Feedback
              </h2>
              {feedbackList.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="w-full group">
                    <div
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 
                      rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 
                      transition-all duration-200 text-left"
                    >
                      {/* Question Number */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      {/* Question Text */}
                      <p className="flex-1 text-sm sm:text-base font-medium text-gray-700">
                        {item.question}
                      </p>
                      {/* Rating Badge */}
                      <span
                        className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border ${getRatingBg(item.rating)} ${getRatingColor(item.rating)}`}
                      >
                        {item.rating}/10
                      </span>
                      {/* Toggle */}
                      <ChevronsUpDown className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mx-4 border-x border-b border-gray-200 rounded-b-xl bg-white p-5 space-y-4 shadow-sm -mt-1">
                      {/* Your Answer */}
                      <div className="rounded-lg bg-red-50 border border-red-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                            Your Answer
                          </h3>
                        </div>
                        <p className="text-sm text-red-900 leading-relaxed">
                          {item.userAns}
                        </p>
                      </div>
                      {/* Correct Answer */}
                      <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <h3 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                            Ideal Answer
                          </h3>
                        </div>
                        <p className="text-sm text-emerald-900 leading-relaxed">
                          {item.correctAns}
                        </p>
                      </div>
                      {/* Feedback */}
                      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-blue-500" />
                          <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                            Improvement Tips
                          </h3>
                        </div>
                        <p className="text-sm text-blue-900 leading-relaxed">
                          {item.feedback}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            {/* ── Footer ── */}
            <div className="flex justify-center mt-10">
              <Button
                onClick={() => router.replace("/dashboard")}
                size="lg"
                className="gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <Home className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Feedback;
