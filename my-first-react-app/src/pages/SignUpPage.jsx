import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext"

function SignUpPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmployer, setIsEmployer] = useState(false);
    const {signup, loading, error} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        const success = signup(email, password, isEmployer);
        if(success) {
            navigate("/home")
        }
    }

  return (
  <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center px-6">
    <div className="bg-white rounded-lg border border-slate-200 p-8 w-full max-w-sm">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">Create account</h2>
      <p className="text-slate-600 text-sm mb-6">Join Job Board today</p>

      {/* Form Container with paragraph - creates spacing between them */}
      <div className="flex flex-col gap-3">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-90 text-left">Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-90 text-left">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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