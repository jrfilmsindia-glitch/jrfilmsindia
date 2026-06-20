export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 px-6 md:px-16 py-12 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-purple-500 text-lg font-bold mb-4">JR FILMS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Watch exclusive short films, series and vertical videos from India's best creators.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Browse</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 text-sm hover:text-purple-500 transition">Home</a></li>
              <li><a href="/browse" className="text-gray-400 text-sm hover:text-purple-500 transition">All Videos</a></li>
              <li><a href="/series" className="text-gray-400 text-sm hover:text-purple-500 transition">Series</a></li>
              <li><a href="/shorts" className="text-gray-400 text-sm hover:text-purple-500 transition">Shorts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="https://youtube.com" target="_blank" className="text-gray-400 text-sm hover:text-purple-500 transition">YouTube</a></li>
              <li><a href="https://instagram.com" target="_blank" className="text-gray-400 text-sm hover:text-purple-500 transition">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" className="text-gray-400 text-sm hover:text-purple-500 transition">Facebook</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-sm hover:text-purple-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-purple-500 transition">Terms of Use</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-purple-500 transition">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2026 JR Films India. All rights reserved.</p>
          <p className="text-gray-500 text-xs">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}
