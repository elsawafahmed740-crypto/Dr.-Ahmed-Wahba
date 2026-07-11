export function PageHero({ eyebrow, title, desc, stats = [], gradient = 'from-[#0F2747] via-[#173a63] to-[#1E5FA8]' }) {
  return (
    <section className={`bg-gradient-to-br ${gradient} text-white`}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/75 ring-1 ring-white/15">{eyebrow}</span>
        <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">{desc}</p>
        {stats.length > 0 && (
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                <div className="text-2xl font-black">{value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/45">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
