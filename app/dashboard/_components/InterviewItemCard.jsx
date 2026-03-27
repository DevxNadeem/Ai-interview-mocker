import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Briefcase, Calendar, Clock, Play, MessageSquareText } from "lucide-react";
function InterviewItemCard({ interview }) {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };
  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-2xl p-5 
      shadow-sm hover:shadow-lg hover:border-gray-300 
      transition-all duration-300 ease-in-out"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary/80 to-primary/40 rounded-b-full" />
      {/* Job Info */}
      <div className="mt-1 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base text-gray-900 truncate">
              {interview?.jobPosition}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm text-gray-500">
                {interview?.jobExperience}{" "}
                {Number(interview?.jobExperience) === 1 ? "Year" : "Years"} of
                Experience
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Date */}
      <div className="flex items-center gap-1.5 mb-4 px-1">
        <Calendar className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs text-gray-400">{interview.createdAt}</span>
      </div>
      {/* Actions */}
      <div className="flex gap-3">
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-1.5 rounded-lg border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          onClick={onFeedbackPress}
        >
          <MessageSquareText className="w-3.5 h-3.5" />
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full gap-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          onClick={onStart}
        >
          <Play className="w-3.5 h-3.5" />
          Start
        </Button>
      </div>
    </div>
  );
}
export default InterviewItemCard;
