import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/portfolio/hero-section'
import { SkillsSection } from '@/components/portfolio/skills-section'
import { ExperienceSection } from '@/components/portfolio/experience-section'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { ContactSection } from '@/components/portfolio/contact-section'
import { Footer } from '@/components/portfolio/footer'
import { Navbar } from '@/components/portfolio/navbar'

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  console.log('HomePage projects fetch', { count: projects?.length, error })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection projects={projects || []} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
