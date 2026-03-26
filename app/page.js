import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { AtomIcon, Edit, Share2, Sparkles, ArrowRight, CheckCircle2, Star } from "lucide-react";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[128px]" />
      </div>
      <Header />
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm text-purple-300 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Interview Preparation</span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight leading-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Your Personal AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Interview Coach
            </span>
          </h1>
          <p className="mb-10 text-lg font-normal text-slate-400 lg:text-xl sm:px-16 xl:px-48 max-w-3xl mx-auto leading-relaxed">
            Double your chances of landing that job offer with our AI-powered interview prep. Practice with realistic questions, get instant feedback, and build confidence.
          </p>
          <div className="flex flex-col mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:scale-105 transform"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105 transform"
            >
              See How It Works
            </a>
          </div>
          {/* Hero Image / Mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-2 shadow-2xl shadow-purple-500/10">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&q=80"
                className="rounded-xl w-full object-cover"
                width={1200}
                height={600}
                alt="AI Interview Coach Dashboard Preview"
              />
              {/* Floating Stats Cards */}
              <div className="absolute -left-6 top-1/4 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Success Rate</p>
                    <p className="text-lg font-bold text-green-400">94%</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 top-1/3 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">User Rating</p>
                    <p className="text-lg font-bold text-purple-400">4.9/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Feature Cards */}
          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 shadow-xl transition-all duration-500 hover:border-purple-500/30 hover:shadow-purple-500/10 hover:shadow-2xl hover:-translate-y-2 transform">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-6">
                  <AtomIcon className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">
                  Write Your Prompt
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Define the job role, required skills, and interview focus areas. Our AI will generate tailored questions based on your input to simulate a real interview experience.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 shadow-xl transition-all duration-500 hover:border-pink-500/30 hover:shadow-pink-500/10 hover:shadow-2xl hover:-translate-y-2 transform">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30 mb-6">
                  <Edit className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">
                  Customize Your Interview
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Customize your interview by refining the generated questions, adjusting difficulty levels, or adding specific topics to better match your preparation goals.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 shadow-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:shadow-2xl hover:-translate-y-2 transform">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
                  <Share2 className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">
                  Share & Get Feedback
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Start your mock interview instantly or share it with others. Track responses, analyze performance, and improve with AI-powered feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24">
        <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
          {/* Section Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            How It Works?
          </h2>
          <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">
            Give a mock interview in just 3 simple easy steps and land your dream job
          </p>
          {/* Steps with connecting line */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 hidden lg:block" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Step 1 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg shadow-purple-500/30">
                    1
                  </div>
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-6 border border-slate-700/50">
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&q=80"
                      width={400}
                      height={250}
                      alt="Write your prompt"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">Write Your Prompt</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Describe your target role and interview type. Our AI instantly crafts personalized questions tailored to your career goals and experience level.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg shadow-pink-500/30">
                    2
                  </div>
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-6 border border-slate-700/50">
                    <Image
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop&q=80"
                      width={400}
                      height={250}
                      alt="Practice your interview"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">Practice & Refine</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Answer questions in a realistic interview simulation. Adjust difficulty, add topics, and fine-tune your preparation for maximum impact.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg shadow-blue-500/30">
                    3
                  </div>
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-6 border border-slate-700/50">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&q=80"
                      width={400}
                      height={250}
                      alt="Get AI feedback and share"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">Get AI Feedback</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Receive detailed AI-powered feedback on your answers. Track your progress, identify weak areas, and share results with mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="mt-20">
            <a
              href="/sign-in"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:scale-105 transform"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
      {/* Testimonials / Social Proof */}
      <section className="relative z-10 py-24 border-t border-slate-800/50">
        <div className="px-4 mx-auto max-w-screen-xl text-center lg:px-12">
          <h2 className="text-3xl font-extrabold mb-16 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Trusted by Thousands of Job Seekers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Software Engineer at Google", quote: "This tool transformed my interview preparation. I felt confident and prepared for every question.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
              { name: "James Wilson", role: "Product Manager at Meta", quote: "The AI feedback was incredibly accurate. It helped me identify blind spots I never knew I had.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
              { name: "Priya Sharma", role: "Data Scientist at Amazon", quote: "From nervous wreck to confident candidate in just two weeks. Absolutely game-changing.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80" },
            ].map((testimonial, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center gap-1 justify-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center justify-center gap-3">
                    <Image
                      src={testimonial.img}
                      width={40}
                      height={40}
                      alt={testimonial.name}
                      className="rounded-full border-2 border-purple-500/30"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} AI Interview Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
