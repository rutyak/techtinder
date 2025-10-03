import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BACKEND_URL;

function ChangePassword({ showPasswordFields, setShowPasswordFields }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePasswordChange() {
    setIsLoading(true);

    try {
      if (!newPassword || !oldPassword || !confirmPassword) {
        return toast.error("Please fill in all password fields.");
      }

      if (oldPassword === newPassword) {
        return toast.error("You have already used this password");
      }
      
      if (newPassword !== confirmPassword) {
        return toast.error("New password and confirm password do not match.");
      }

      const res = await axios.patch(
        base_url + "/change-password",
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data?.message || "Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordFields(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <label className="text-sm text-gray-600 mb-2 block">Password</label>

      <div className="flex justify-between items-center bg-gray-50 p-2 rounded mb-4">
        <p className="text-gray-400">••••••••</p>
        <button
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          {showPasswordFields ? "Cancel" : "Change"}
        </button>
      </div>

      {showPasswordFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm text-gray-600 block mb-1">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:ring"
            />
          </div>
          <div className="md:col-span-2">
            <button
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={handlePasswordChange}
            >
              {isLoading ? "Loading..." : "Save Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
