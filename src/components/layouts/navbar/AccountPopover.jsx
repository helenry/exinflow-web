// components/layout/navbar/AccountPopover.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../../api/firebase";
import { paths } from "../../../routes/allRoutes";
import CircleButton from "../../buttons/CircleButton";
import useAuthStore from "../../../stores/authStore";

export default function AccountPopover() {
  const { currentUser } = useAuthStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate(paths.sign_in);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <CircleButton onClick={toggleMenu} imageSrc={currentUser?.photoURL} />

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10">
          <ul className="py-1">
            <li>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm"
              >
                <FaSignOutAlt /> Log Out
              </button>
            </li>
            {/* Add more items here */}
          </ul>
        </div>
      )}
    </div>
  );
}
