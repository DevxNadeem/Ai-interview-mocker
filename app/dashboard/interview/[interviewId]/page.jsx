"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Lightbulb,
  WebcamIcon,
  Briefcase,
  FileText,
  Clock,
  ArrowRight,
  Camera,
  Shield,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Let&apos;s Get Started
          </h1>
          <p className="mt-2 text-gray-500 text-base sm:text-lg">
            Review the details below and enable your camera before starting
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column — Interview Details */}
          <div className="space-y-6">
            {/* Job Details Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                  Interview Details
                </h2>
              </div>
              <div className="p-6 space-y-5">
                {/* Job Position */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Job Role / Position
                    </p>
                    <p className="text-base font-semibold text-gray-900 mt-0.5">
                      {interviewData?.jobPosition || (
                        <span className="inline-block h-5 w-40 bg-gray-100 animate-pulse rounded" />
                      )}
                    </p>
                  </div>
                </div>
                {/* Job Description */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Job Description / Tech Stack
                    </p>
                    <p className="text-base font-semibold text-gray-900 mt-0.5">
                      {interviewData?.jobDesc || (
                        <span className="inline-block h-5 w-56 bg-gray-100 animate-pulse rounded" />
                      )}
                    </p>
                  </div>
                </div>
                {/* Years of Experience */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Years of Experience
                    </p>
                    <p className="text-base font-semibold text-gray-900 mt-0.5">
                      {interviewData?.jobExperience !== undefined ? (
                        `${interviewData.jobExperience} ${Number(interviewData.jobExperience) === 1 ? "Year" : "Years"}`
                      ) : (
                        <span className="inline-block h-5 w-20 bg-gray-100 animate-pulse rounded" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Information Banner */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-semibold text-amber-800 text-sm">
                  Before You Begin
                </h3>
              </div>
              <p className="text-sm text-amber-700 leading-relaxed">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </p>
            </div>
          </div>
          {/* Right Column — Webcam */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                  Camera Preview
                </h2>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${webCamEnabled ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`}
                  />
                  <span className="text-xs text-gray-500">
                    {webCamEnabled ? "Live" : "Off"}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-6">
                {webCamEnabled ? (
                  <div className="rounded-xl overflow-hidden shadow-inner bg-black">
                    <Webcam
                      onUserMedia={() => setWebCamEnabled(true)}
                      onUserMediaError={() => setWebCamEnabled(false)}
                      mirrored={true}
                      className="rounded-xl"
                      style={{ width: "100%", maxHeight: 320 }}
                    />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center py-10">
                    <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                      <WebcamIcon className="w-12 h-12 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-medium">
                      Camera is turned off
                    </p>
                    <p className="text-xs text-gray-400 mb-5">
                      Enable it to practice with video
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2 rounded-lg border-gray-200 hover:bg-gray-50"
                      onClick={() => setWebCamEnabled(true)}
                    >
                      <Camera className="w-4 h-4" />
                      Enable Camera & Microphone
                    </Button>
                  </div>
                )}
              </div>
              {/* Privacy note */}
              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/30">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400">
                    Your video is not recorded or stored
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Button */}
        <div className="flex justify-end mt-8">
          <Link
            href={
              "/dashboard/interview/" +
              params.interviewId +
              "/start"
            }
          >
            <Button
              size="lg"
              className="gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-shadow"
            >
              Start Interview
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Interview;
