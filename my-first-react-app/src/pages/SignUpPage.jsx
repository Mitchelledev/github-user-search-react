import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployer, setIsEmployer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signup, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const success = signup(name, email, password, isEmployer);
    if (success) {
      navigate("/home");
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-lg border border-slate-200 p-8 w-full max-w-sm">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Create account</h2>
        <p className="text-slate-600 text-sm mb-6">Join Job Board today</p>

        <div className="flex flex-col gap-3">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-900 text-left">Username</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-900 text-left">Email</label>
              <input
                type="email"
                autoComplete="off"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-900 text-left">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.584 10.587a2 2 0 002.829 2.829M9.363 5.365A9.466 9.466 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-5.858-.908a3 3 0 00-4.243-4.243M6.228 6.228A9.965 9.965 0 002.457 12c1.275 4.057 5.065 7 9.543 7a9.96 9.96 0 004.11-.892" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Employer Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="employer"
                checked={isEmployer}
                onChange={(e) => setIsEmployer(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="employer" className="text-sm text-slate-900 cursor-pointer">
                I'm posting jobs (employer)
              </label>
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;