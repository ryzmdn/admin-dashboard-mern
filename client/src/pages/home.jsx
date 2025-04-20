"use client";

import { Link } from "react-router";
import { Footer } from "../components/Footer";
import Dashboard from "../assets/dashboard.jpg"

export default function Home() {
  return (
    <>
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative flex items-center gap-x-2 rounded-full px-3 py-1 text-base/6 font-medium text-gray-800 bg-gray-50/50 backdrop-blur-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-5 w-auto"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <a
                href="https://github.com/ryzmdn"
                target="_blank"
                className="font-semibold"
              >
                <span aria-hidden="true" className="absolute inset-0" /> Visit
                GitHub
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Open Source Full-stack <strong>MERN</strong> Auth
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Try authentication and authorization boilerplate using MERN stack
              (MongoDB Express, React and Node).
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                Try it now
              </Link>
              <a
                href="https://react.dev"
                target="_blank"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="App screenshot"
                src={Dashboard}
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
