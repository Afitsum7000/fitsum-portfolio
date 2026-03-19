'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail, Github } from 'lucide-react'

const socialLinks = [
  {
    href: 'https://github.com/FitsumK',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/fitsum-kasaye',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:fitsumkasaye24@gmail.com',
    icon: Mail,
    label: 'Email',
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-muted/30 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-semibold text-foreground text-lg"
            >
              Fitsum Kasaye
            </motion.span>
            <span className="text-sm text-muted-foreground">
              Backend & Fintech Systems Engineer
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-2.5 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                aria-label={link.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center text-sm text-muted-foreground/90">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              Designed and built by Fitsum Kasaye • {currentYear}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
