import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold text-blue-600">MyApp</div>

      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/features" className="hover:text-blue-600 transition">
            Features
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="hover:text-blue-600 transition">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex space-x-4">
        <Link
          to="/Login"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/Signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
