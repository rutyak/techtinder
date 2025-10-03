import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function Auth() {
  const [authView, setAuthView] = useState("login");
  const [loginToggle, setLoginToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const modelRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    let token = document.cookie
      .split(";")
      .find((row) => row.trim().startsWith("token="))
      ?.split("=")[1];
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  // Close modal on outside click, ESC, or scroll
  useEffect(() => {
    if (!loginToggle) return;

    const handleClickOutside = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setLoginToggle(false);
      }
    };
    const handleEscapeKey = (e) => e.key === "Escape" && setLoginToggle(false);
    const handleScroll = () => setLoginToggle(false);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [loginToggle]);

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (authView === "login" || authView === "signup") {
        const endpoint = authView === "login" ? "login" : "signup";
        const res = await axios.post(`${base_url}/${endpoint}`, formData, {
          withCredentials: true,
        });

        if (!toast.isActive("authToast")) {
          toast.success(res.data?.message, { toastId: "authToast" });
        }

        if (res.data?.user) {
          dispatch(addUser(res.data?.user));
        }

        setLoginToggle(false);
        if (res.status === 200) {
          navigate("/dashboard");
        }
        setFormData({});
      } else if (authView === "forgotPassword") {
        const res = await axios.post(`${base_url}/send-otp`, {
          email: formData.email,
        });
        toast.success(res.data?.message);
        if (res.status === 200) setAuthView("verifyOtp");
      } else if (authView === "verifyOtp") {
        const res = await axios.post(`${base_url}/verify-otp`, {
          email: formData.email,
          otp: formData.otp,
        });
        toast.success(res.data?.message);
        if (res.status === 200) setAuthView("resetPassword");
      } else if (authView === "resetPassword") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        const res = await axios.patch(`${base_url}/reset-password`, {
          email: formData.email,
          password: formData.password,
        });
        toast.success(res.data?.message);
        if (res.status === 200) setAuthView("login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Auth Redirect
  const handleGoogleLogin = () => {
    window.location.href = `${base_url}/auth/google`;
  };

  return (
    <>
      <button
        className="rounded-full py-1 px-3 md:py-2 md:px-6 text-md md:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        onClick={() => setLoginToggle(!loginToggle)}
      >
        Login
      </button>

      {loginToggle && (
        <div className="fixed inset-0 z-30 flex items-center justify-center min-h-screen p-4 bg-gray-900/70">
          <div
            ref={modelRef}
            className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-center flex-1 ">
                {authView === "login" && "Welcome Back 👋"}
                {authView === "signup" && "Connect with us 🤝"}
                {authView === "forgotPassword" && "Forgot Password 🔑"}
                {authView === "resetPassword" && "Set New Password 🔒"}
                {authView === "verifyOtp" && "Verify OTP 📩"}
              </h2>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded-md text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {authView === "login" && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <div
                    className="text-sm text-blue-500 text-right mt-1 cursor-pointer"
                    onClick={() => {
                      setAuthView("forgotPassword");
                      setError("");
                    }}
                  >
                    Forgot Password?
                  </div>
                </>
              )}

              {authView === "signup" && (
                <>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter first name"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter last name"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                </>
              )}

              {authView === "forgotPassword" && (
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                  onChange={handleChanges}
                  required
                />
              )}

              {authView === "verifyOtp" && (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                  onChange={handleChanges}
                  required
                  maxLength={6}
                />
              )}

              {authView === "resetPassword" && (
                <>
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 rounded-lg border border-gray-400 placeholder:text-gray-400"
                    onChange={handleChanges}
                    required
                  />
                </>
              )}

              <button
                data-testid="submitBtn"
                type="submit"
                className="w-full py-2 text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : authView === "login"
                  ? "Login"
                  : authView === "signup"
                  ? "Signup"
                  : authView === "forgotPassword"
                  ? "Verify Email"
                  : authView === "verifyOtp"
                  ? "Verify OTP"
                  : "Update Password"}
              </button>
              {authView !== "login" && authView !== "signup" && (
                <button
                  onClick={() => setAuthView("login")}
                  className="text-blue-500 text-sm font-medium text-end mr-3"
                >
                  ← Back
                </button>
              )}
            </form>

            {/* Google Auth */}
            {authView === "login" && (
              <button
                onClick={handleGoogleLogin}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            )}

            {/* Switch Login/Signup */}
            {(authView === "login" || authView === "signup") && (
              <div className="text-sm text-center mt-3 cursor-default">
                {authView === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <span
                      className="text-blue-600 cursor-pointer hover:underline"
                      onClick={() => setAuthView("signup")}
                    >
                      Signup
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      className="text-blue-500 cursor-pointer hover:underline"
                      onClick={() => setAuthView("login")}
                    >
                      Login
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
