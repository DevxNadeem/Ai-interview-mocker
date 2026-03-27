"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { History } from "lucide-react";
function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);
  const GetInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    console.log(result);
    setInterviewList(result);
    setLoading(false);
  };
  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-5">
        <History className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-xl text-gray-900">
          Previous Mock Interviews
        </h2>
        {!loading && interviewList.length > 0 && (
          <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {interviewList.length}
          </span>
        )}
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? /* Skeleton Loaders */
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded" />
                  </div>
                </div>
                <div className="h-3 w-1/3 bg-gray-100 animate-pulse rounded" />
                <div className="flex gap-3">
                  <div className="h-8 w-full bg-gray-100 animate-pulse rounded-lg" />
                  <div className="h-8 w-full bg-gray-200 animate-pulse rounded-lg" />
                </div>
              </div>
            ))
          : interviewList.length > 0
            ? /* Interview Cards */
              interviewList.map((interview, index) => (
                <InterviewItemCard interview={interview} key={index} />
              ))
            : /* Empty State */
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <History className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  No Interviews Yet
                </h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Start your first mock interview to see your history here.
                </p>
              </div>}
      </div>
    </div>
  );
}
export default InterviewList;