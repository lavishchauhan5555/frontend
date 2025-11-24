import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

export default function LandingPage() {
  return (
    <>
   

      <div className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <header className="w-full py-16 px-6 lg:px-20 bg-linear-to-b from-blue-600 to-blue-500 text-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                AI-Powered Study Assistant for Smarter Exam Preparation
              </h1>
              <p className="mt-6 text-lg opacity-90">
                Upload PDFs, notes, textbooks, or videos — get instant
                summaries, quizzes, flashcards, and an AI tutor.
              </p>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 rounded-2xl bg-white text-blue-600 font-semibold shadow-md hover:shadow-lg">
                  Get Started Free
                </button>
                <button className="px-6 py-3 rounded-2xl border border-white font-semibold hover:bg-white hover:text-blue-600 transition">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://i.imgur.com/8Y2xXcP.png"
                alt="AI Study Banner"
                className="w-full max-w-md rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-20 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Everything You Need To Study Smarter
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Transform your notes into a complete exam preparation toolkit.
            </p>

            <div className="grid md:grid-cols-3 gap-10 mt-14">
              <div className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition">
                <h3 className="text-xl font-semibold">Auto Summaries</h3>
                <p className="mt-3 text-gray-600">
                  Get summaries from your PDFs.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition">
                <h3 className="text-xl font-semibold">MCQs & Quizzes</h3>
                <p className="mt-3 text-gray-600">AI-generated questions.</p>
              </div>

              <div className="p-8 bg-white rounded-3xl shadow hover:shadow-xl transition">
                <h3 className="text-xl font-semibold">Flashcards (SRS)</h3>
                <p className="mt-3 text-gray-600">Smart spaced repetition.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tutor */}
        <section className="py-20 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-3xl font-bold">Your Personal AI Tutor</h2>
              <p className="mt-4 text-gray-600 text-lg">
                Ask any question and get answers grounded from your uploaded
                documents.
              </p>
              <button className="mt-6 px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700">
                Try AI Tutor
              </button>
            </div>

            <img
              src="https://i.imgur.com/I4z3LSl.png"
              alt="AI Tutor"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </section>
      </div>

    
    </>
  );
}
