'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Star, Folder } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  image_url: string | null
  live_url: string | null
  featured: boolean
}

interface ProjectsSectionProps {
  projects: Project[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
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
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            A selection of systems I have designed and built. Each project represents 
            significant technical challenges solved at scale.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Card className="bg-card border-border overflow-hidden group hover:border-primary/40 hover:shadow-md hover:shadow-black/20 transition-all duration-300 h-full">
                <CardHeader className="pb-4 relative">
                  <div className="flex items-start justify-between">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors duration-300">
                        <Folder className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-foreground">
                        {project.title}
                      </CardTitle>
                    </motion.div>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-secondary text-primary border border-border">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-secondary border-border text-secondary-foreground hover:border-primary/40 transition-colors duration-300"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  {project.live_url && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        className="group/btn border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      >
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-foreground mb-8"
            >
              Other Projects
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <Card className="bg-card border-border hover:border-primary/40 hover:shadow-md hover:shadow-black/20 transition-all duration-300 h-full group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 10 }}
                          className="p-2 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors duration-300"
                        >
                          <Folder className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </motion.div>
                        <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack.slice(0, 4).map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-xs opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech_stack.length > 4 && (
                          <Badge variant="outline" className="text-xs opacity-70">
                            +{project.tech_stack.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
