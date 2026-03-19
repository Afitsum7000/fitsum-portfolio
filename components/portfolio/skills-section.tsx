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
  },
  {
    category: 'Backend Frameworks',
    icon: Server,
    items: ['NestJS', 'Express.js', 'Fastify', 'Laravel', 'FastAPI'],
  },
  {
    category: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    category: 'Architecture',
    icon: Container,
    items: ['Microservices', 'REST APIs', 'GraphQL', 'Event-driven'],
  },
  {
    category: 'DevOps',
    icon: Cloud,
    items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'DigitalOcean'],
  },
  {
    category: 'Version Control',
    icon: GitBranch,
    items: ['Git', 'GitHub', 'GitLab'],
  },
  {
    category: 'Security',
    icon: Shield,
    items: ['JWT', 'OAuth2', 'RBAC', 'API Security'],
  },
  {
    category: 'Performance',
    icon: Zap,
    items: ['Optimization', 'Caching', 'Load Balancing', 'Monitoring'],
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
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none opacity-20" />
      
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
              <Card className="bg-card border-border overflow-hidden group hover:border-primary/40 transition-all duration-300 h-full shadow-sm shadow-black/20">
                <CardContent className="pt-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2.5 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors duration-300"
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
                        className="text-xs px-2.5 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300 cursor-default"
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
