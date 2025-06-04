// pages/SignIn.jsx
import React, { useState } from "react";
import sign_in from "../assets/images/sign_in.jpg";
import logo_white from "../assets/images/logo/logo_white.png";
import useAuthStore from "../stores/authStore";

const SignIn = () => {
  const { signInWithGoogle, authError, isLoading } = useAuthStore();
  const [localError, setLocalError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setLocalError("");
      await signInWithGoogle();
    } catch (error) {
      setLocalError("Failed to sign in with Google. Please try again.");
    }
  };

  const displayError = localError || authError;

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${sign_in})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={logo_white} alt="Exinflow" className="h-16 mb-14" />

      {displayError && (
        <div className="text-red-500 mb-4 text-center">{displayError}</div>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className={`cursor-pointer bg-black text-white px-8 py-4 rounded-full shadow-md hover:bg-grey-700 flex items-center ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
          alt="Google Logo"
          className="w-6 h-6 mr-3"
        />
        {isLoading ? "Signing in..." : "Continue with Google"}
      </button>
    </div>
  );
};

export default SignIn;
