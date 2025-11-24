export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-8 mt-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MyApp</h2>
          <p className="text-gray-300 text-sm">
            AI-powered platform for generating notes, quizzes, summaries, and flashcards.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/features" className="hover:text-blue-400">Features</a></li>
            <li><a href="/pricing" className="hover:text-blue-400">Pricing</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: support@myapp.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Address: Delhi, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center mt-10 pt-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}