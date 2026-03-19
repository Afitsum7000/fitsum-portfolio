'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    title: 'Lead Backend Developer',
    company: 'ZTOA',
    description:
      'Architected backend systems for outsourced projects. Designed microservices architectures and APIs, integrated third-party services for payments and notifications.',
    achievements: [
      'Designed scalable microservices architectures and RESTful APIs',
      'Integrated third-party payment and notification services',
      'Optimized backend performance and system scalability',
    ],
  },
  {
    title: 'Senior Backend Developer',
    company: 'EagleLion System Technology',
    description:
      'Worked on fintech systems supporting high-volume financial transactions. Built secure backend services for financial workflows.',
    achievements: [
      'Integrated mobile money and banking APIs',
      'Designed backend services handling financial workflows securely',
      'Implemented secure transaction processing systems',
    ],
  },
  {
    title: 'Lead Backend Developer',
    company: 'Dynamic Technology',
    description:
      'Led backend development for a School Management System. Designed database architecture and implemented core business logic.',
    achievements: [
      'Designed database architecture and backend APIs',
      'Implemented role-based access control systems',
      'Built core business logic for educational workflows',
    ],
  },
  {
    title: 'Full Stack Developer / DevOps',
    company: 'Adika Taxi',
    description:
      'Worked on a ride-hailing platform backend with real-time features. Built scalable APIs for driver and rider operations.',
    achievements: [
      'Built backend services integrating payments and messaging',
      'Developed scalable APIs for real-time operations',
      'Automated deployments and infrastructure management',
    ],
  },
  {
    title: 'Backend Developer',
    company: 'Kuraz Technology',
    description:
      'Built scalable REST APIs and backend systems supporting multiple applications. Optimized database queries and backend performance.',
    achievements: [
      'Built scalable REST APIs supporting multiple applications',
      'Optimized database queries and backend performance under heavy load',
      'Implemented secure authentication and authorization systems',
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            4+ years building backend systems for fintech, ride-hailing, and enterprise platforms.
          </p>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Animated timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
            />

            <div className="flex flex-col gap-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-8 md:pl-16"
                >
                  {/* Animated timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute left-0 md:left-4 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20"
                  />

                  <motion.div
                    whileHover={{ scale: 1.02, x: 6, y: -4 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 transition-all duration-300 ease-in-out hover:border-primary/25 hover:shadow-xl hover:shadow-black/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <ul className="flex flex-col gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5 font-mono">{'>'}</span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
