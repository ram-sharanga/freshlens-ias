import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-0">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-cyan/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left — text */}
          <div className="flex-1 text-center lg:text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-sm font-medium text-brand-blue">
                Integrated Mentorship for CSE 2027 is live
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold text-ink-primary leading-tight tracking-tight mb-6">
              The most{" "}
              <span className="text-brand-blue">authentic</span>{" "}
              perspective on{" "}
              <span className="relative">
                UPSC
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-cyan rounded-full" />
              </span>{" "}
              preparation
            </h1>

            {/* Subheading */}
            <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Laser-focused mentorship, curated resources, and strategic guidance — 
              built by toppers, designed for serious aspirants.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/courses"
                className="rounded-xl bg-brand-blue px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-indigo transition-all duration-200 shadow-card hover:shadow-hover"
              >
                Explore Courses
              </Link>
              <Link
                href="/courses/integrated-mentorship-cse-2027"
                className="rounded-xl border border-surface-3 bg-surface-0 px-8 py-3.5 text-base font-semibold text-ink-primary hover:border-brand-blue hover:text-brand-blue transition-all duration-200"
              >
                View Mentorship Plan →
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { value: "500+", label: "Active Aspirants" },
                { value: "3000+", label: "Telegram Community" },
                { value: "AIR 47",  label: "Top Rank Achieved" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-ink-primary">{stat.value}</div>
                  <div className="text-sm text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative rounded-2xl bg-gradient-to-br from-brand-blue to-brand-indigo p-8 text-white shadow-hover">
              
              {/* Card header */}
              <div className="mb-6">
                <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-1">Featured Program</p>
                <h2 className="text-2xl font-bold">Integrated Mentorship Plan</h2>
                <p className="text-white/70 mt-1">CSE 2027 — Pre + Mains</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[
                  "1:1 Personalised Mentorship",
                  "PYQ Decoding + Answer Writing",
                  "Weekly Goals & Performance Review",
                  "Prelims + Mains Strategy",
                  "Current Affairs Coverage",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Complete Program</p>
                  <p className="text-3xl font-bold">₹24,999</p>
                </div>
                <Link
                  href="/courses/integrated-mentorship-cse-2027"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-blue hover:bg-brand-cyan hover:text-white transition-all duration-200"
                >
                  Enrol Now
                </Link>
              </div>

              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/5 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}