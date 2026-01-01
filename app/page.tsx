export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-30"></div>

      <div className="relative z-10 text-center space-y-6 max-w-md">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Coming <span className="text-blue-500">Soon</span>
        </h1>
        
        <p className="text-gray-400 text-lg">
          We're building something exciting. Stay tuned for the launch of my new digital home.
        </p>

        {/* Simple Input/Button (Optional) */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
            Notify Me
          </button>
        </div>
      </div>
    </main>
  );
}
