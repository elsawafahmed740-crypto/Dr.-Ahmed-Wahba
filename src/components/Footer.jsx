export function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="border-t border-white/5 bg-[#0F2747] pt-6 pb-28 lg:pb-6 text-center">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-[13px] font-medium text-white/40">
          &copy; {year} Dr. Ahmed Ibrahim Wahba. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
