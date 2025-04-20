import { useEffect, useState } from "react";
import axios from "axios";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

export default function Dashboard() {
  const [initials, setInitials] = useState("");
  const [user, setUser] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/user",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const fullName = response.data.name;
        const email = response.data.email;
        const parts = fullName.trim().split(" ");
        const ini = parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];

        setUser({ name: fullName, email });
        setInitials(ini.toLowerCase());
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      await axios.delete("http://localhost:4000/api/auth/delete", {
        headers: { Authorization: token },
      });
      localStorage.removeItem("token");
      alert("Account successfully deleted");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to delete account");
    }
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out of your account?"))
      return;
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <Disclosure as="nav" className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="text-xl font-semibold text-gray-800">Dashboard</div>
            <div className="hidden sm:flex sm:items-center">
              <Menu as="div" className="relative ml-3">
                <MenuButton className="inline-flex size-8 items-center justify-center rounded-full bg-gray-800">
                  <span className="text-sm/6 uppercase font-medium text-white">
                    {initials}
                  </span>
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <Link
                      to="/edit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit account
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleDelete}
                      className="block w-full text-start px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    >
                      Delete Account
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <div className="sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                <Bars3Icon className="block h-6 w-6 data-[open]:hidden" />
                <XMarkIcon className="hidden h-6 w-6 data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-gray-800">
                <span className="text-sm font-medium uppercase text-white">
                  {initials}
                </span>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1 px-4 pt-2 pb-3">
            <Link
              to="/edit"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit account
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-start px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
            >
              Delete Account
            </button>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p>Welcome to admin dashboard!</p>
          </div>
        </main>
      </div>
    </>
  );
}
