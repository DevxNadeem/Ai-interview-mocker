import { Lightbulb, Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";
function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => setIsSpeaking(false);
      speech.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-6 border border-gray-200 rounded-2xl my-8 bg-white shadow-sm">
        {/* Question Navigation Pills */}
        <div className="flex flex-wrap gap-2">
          {mockInterviewQuestion.map((question, index) => (
            <span
              key={index}
              className={`inline-flex items-center justify-center px-4 py-2
              rounded-full text-xs sm:text-sm font-medium cursor-pointer
              transition-all duration-200
              ${
                activeQuestionIndex === index
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              Q{index + 1}
            </span>
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-gray-100 my-5" />
        {/* Question Text */}
        <div className="flex items-start gap-3">
          <p className="flex-1 text-base sm:text-lg font-medium text-gray-800 leading-relaxed">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </p>
          {/* Speaker Button */}
          <button
            onClick={() =>
              textToSpeech(
                mockInterviewQuestion[activeQuestionIndex]?.question
              )
            }
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-200 cursor-pointer
              ${
                isSpeaking
                  ? "bg-primary/10 text-primary ring-2 ring-primary/20"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              }`}
            title={isSpeaking ? "Stop speaking" : "Read aloud"}
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
        {/* Info Note */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-blue-800">Note</h3>
          </div>
          <p className="text-sm text-blue-700 leading-relaxed">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </p>
        </div>
      </div>
    )
  );
}
export default QuestionsSection;
