import { useState } from "react";
import axios from "axios";

export function Dialog({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");

  const sendCode = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/forgot-password", {
        email,
      });
      setStep(2);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const verifyCode = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/verify-code", {
        email,
        code,
      });
      setStep(3);
    } catch (err) {
      setCode("");
      alert("Wrong code:", err.response.data.msg);
    }
  };

  const changePassword = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/reset-password", {
        email,
        newPassword: newPass,
      });
      alert("Password changed successfully");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      alert("Failed to change password: ", err);
    }
  };

  const handleOverlay = () => {
    onClose();
    setStep(1);
    setCode("");
    setNewPass("");
    setEmail("");
  }

  if (!isOpen) return null;

  return (
    <>
      <button type="button" onClick={handleOverlay} className="fixed top-0 left-0 z-30 size-full bg-gray-900/90" />
      <div className="fixed top-1/2 left-1/2 -translate-1/2 z-50 w-[calc(100%-65%)] bg-white shadow sm:rounded-lg">
        {step === 1 && (
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900">Enter your email</h3>
            <div className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                  autoComplete="off"
                  spellCheck={false}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <button
                type="submit"
                onClick={sendCode}
                className="shrink-0 mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Send code
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900">Verify code from your email</h3>
            <div className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  aria-label="Code"
                  autoComplete="off"
                  spellCheck={false}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <button
                type="submit"
                onClick={verifyCode}
                className="shrink-0 mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Verify code
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900">Change your password</h3>
            <div className="mt-5 sm:flex sm:items-center">
              <div className="w-full sm:max-w-xs">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  aria-label="Password"
                  autoComplete="off"
                  spellCheck={false}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <button
                type="submit"
                onClick={changePassword}
                className="shrink-0 mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Change password
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
