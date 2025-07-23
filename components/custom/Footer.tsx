export default function Footer() {
  return (
    <footer className="text-gray-300 mt-20 border-t border-white/10 w-full ">
      <div className="max-w-7xl py-10 mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CoverMe. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="/privacy" className="hover:text-white">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white">
            Terms
          </a>
          <a href="https://craigo.live" className="hover:text-white">
            Craig Ondevilla
          </a>
        </div>
      </div>
    </footer>
  );
}
