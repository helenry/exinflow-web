import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Welcome</h1>
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
      >
        Continue with Google
      </button>
    </div>
  );
}