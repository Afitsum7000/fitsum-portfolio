'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Database, 
  Server, 
  Cloud, 
  Shield, 
  Zap, 
  GitBranch,
  Container,
  Code
} from 'lucide-react'

const skills = [
  {
    category: 'Languages',
    icon: Code,
    items: ['Node.js', 'TypeScript', 'JavaScript', 'PHP', 'Python'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    category: 'Backend Frameworks',
    icon: Server,
    items: ['NestJS', 'Express.js', 'Fastify', 'Laravel', 'FastAPI'],
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    category: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    category: 'Architecture',
    icon: Container,
    items: ['Microservices', 'REST APIs', 'GraphQL', 'Event-driven'],
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    category: 'DevOps',
    icon: Cloud,
    items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'DigitalOcean'],
    gradient: 'from-sky-500/20 to-blue-500/20',
  },
  {
    category: 'Version Control',
    icon: GitBranch,
    items: ['Git', 'GitHub', 'GitLab'],
    gradient: 'from-rose-500/20 to-red-500/20',
  },
  {
    category: 'Security',
    icon: Shield,
    items: ['JWT', 'OAuth2', 'RBAC', 'API Security'],
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    category: 'Performance',
    icon: Zap,
    items: ['Optimization', 'Caching', 'Load Balancing', 'Monitoring'],
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground">
            Deep experience across the full backend stack, specializing in 
            fintech systems, microservices architecture, and scalable APIs.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div key={skill.category} variants={cardVariants}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/25 hover:shadow-xl hover:shadow-black/20 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-45 transition-opacity duration-300 ease-in-out`} />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 ease-in-out"
                    >
                      <skill.icon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-foreground">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300 ease-in-out cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
