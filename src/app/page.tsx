import Hero from "@/components/sections/Hero"
import CoursesGrid from "@/components/sections/CoursesGrid"
import Services from "@/components/sections/Services"
import Testimonials from "@/components/sections/Testimonials"

export default function Home() {
  return (
    <main>
      <Hero />
      <CoursesGrid />
      <Services />
      <Testimonials />
    </main>
  )
}