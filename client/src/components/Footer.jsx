export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center w-full py-5 bg-white">
      <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0">
        &copy; {year} MIT License. All rights reserved.
      </p>
    </footer>
  );
}
