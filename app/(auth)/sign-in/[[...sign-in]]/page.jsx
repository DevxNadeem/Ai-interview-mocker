import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Panel - Visual / Branding */}
        <section className="relative flex h-40 items-end lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden">
          {/* Background Image with Overlay */}
          <img
            alt="Professional interview setting"
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
          {/* Content Overlay */}
          <div className="hidden lg:relative lg:block lg:p-12 lg:pb-16 w-full">
            {/* Logo */}
            <a className="inline-block" href="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-white font-bold text-xl">AI Interview Coach</span>
              </div>
            </a>
            <h2 className="mt-10 text-3xl font-extrabold sm:text-4xl md:text-5xl leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
                Ace Every Interview
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-md">
              Practice with AI-powered mock interviews, get instant feedback, and land your dream job. Join thousands of successful candidates.
            </p>
            {/* Trust Indicators */}
            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">10,000+ mock interviews completed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">94% of users report improved confidence</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm">Trusted by candidates at Google, Meta, Amazon</span>
              </div>
            </div>
            {/* Testimonial Mini */}
            <div className="mt-10 p-5 rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm max-w-md">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                &ldquo;This tool completely changed how I prepare for interviews. Got my dream role at a top tech company!&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&q=80"
                  alt="Sarah Chen"
                  className="w-8 h-8 rounded-full border border-purple-500/30"
                />
                <div>
                  <p className="text-xs font-semibold text-white">Sarah Chen</p>
                  <p className="text-xs text-slate-500">Software Engineer at Google</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Right Panel - Sign In */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-xl lg:max-w-lg">
            {/* Mobile Header */}
            <div className="relative -mt-20 block lg:hidden mb-10">
              <a
                className="inline-flex w-14 h-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                href="/"
              >
                <svg
                  className="h-7 w-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </a>
              <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl md:text-4xl">
                <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Sign in to continue your interview preparation journey and ace your next interview.
              </p>
            </div>
            {/* Sign In Header (Desktop) */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
              <p className="text-slate-400 text-sm">Sign in to your account to continue your preparation</p>
            </div>
            {/* Clerk Sign In Component */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <div className="relative">
                <SignIn />
              </div>
            </div>
            {/* Bottom Links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/sign-up"
                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Create one for free
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}