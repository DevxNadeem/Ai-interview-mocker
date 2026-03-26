"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `
Job position: ${jobPosition}
Job Description: ${jobDesc}
Years of Experience: ${jobExperience}

Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions.

STRICT RULES:
- Return ONLY JSON
- No markdown
- Format:
[
  {
    "question": "string",
    "answer": "string"
  }
]
`;

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: InputPrompt }),
      });

      const data = await response.json();
      const text = data.text;

      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const match = cleanText.match(/\[.*\]/s);
      if (!match) throw new Error("Invalid JSON");

      const parsed = JSON.parse(match[0]);
      setJsonResponse(parsed);

      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(parsed),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }

    } catch (err) {
      console.error(err);
      alert("Failed to generate interview questions");
    }

    setLoading(false);
  };

  return (
    <form
  onSubmit={onSubmit}
  className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto space-y-5"
>
  {/* Heading */}
  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      Create Mock Interview
    </h2>
    <p className="text-sm text-gray-500">
      Fill in details to generate AI interview questions
    </p>
  </div>

  {/* Job Role */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-600">
      Job Role
    </label>
    <Input
      placeholder="e.g. Frontend Developer"
      onChange={(e) => setJobPosition(e.target.value)}
      required
      className="rounded-xl focus:ring-2 focus:ring-indigo-400"
    />
  </div>

  {/* Tech Stack */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-600">
      Tech Stack
    </label>
    <Textarea
      placeholder="React, Node.js, MongoDB..."
      onChange={(e) => setJobDesc(e.target.value)}
      required
      className="rounded-xl focus:ring-2 focus:ring-indigo-400 resize-none"
    />
  </div>

  {/* Experience */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-600">
      Experience (Years)
    </label>
    <Input
      type="number"
      placeholder="e.g. 1"
      onChange={(e) => setJobExperience(e.target.value)}
      required
      className="rounded-xl focus:ring-2 focus:ring-indigo-400"
    />
  </div>

  {/* Button */}
  <Button
    disabled={loading}
    className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
  >
    {loading ? "Generating..." : "Start Interview"}
  </Button>
</form>

  );
}

export default AddNewInterview;