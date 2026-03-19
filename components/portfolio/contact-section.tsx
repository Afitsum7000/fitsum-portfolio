'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Send, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const services = [
  'Fintech backend systems',
  'Payment integrations',
  'Backend architecture',
  'Microservices and scalable APIs',
  'Cloud infrastructure and DevOps',
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      ...(formData.company.trim()
        ? { company: formData.company.trim() }
        : {}),
    }

    try {
      const supabase = createClient()

      console.log('sending contact form', payload)

      const { data, error: insertError } = await supabase
        .from('contact_messages')
        .insert([payload])

      console.log('contact form response', { data, error: insertError })

      if (insertError) throw insertError

      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center p-3 rounded-full bg-secondary border border-border mb-6"
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Work With Me
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I am available for consulting and development work in:
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {services.map((service, i) => (
                <motion.span
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-sm px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300 cursor-default"
                >
                  {service}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border overflow-hidden shadow-sm shadow-black/20">
              <CardContent className="pt-8 relative">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      >
                        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-semibold text-foreground mb-3"
                      >
                        Message Sent!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground mb-8"
                      >
                        Thanks for reaching out. I will get back to you soon.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 relative">
                          <Label 
                            htmlFor="name"
                            className={`transition-colors duration-300 ${focusedField === 'name' ? 'text-primary' : ''}`}
                          >
                            Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label 
                            htmlFor="email"
                            className={`transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : ''}`}
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={formData.email}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label 
                          htmlFor="company"
                          className={`transition-colors duration-300 ${focusedField === 'company' ? 'text-primary' : ''}`}
                        >
                          Company (Optional)
                        </Label>
                        <Input
                          id="company"
                          placeholder="Your company"
                          value={formData.company}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label 
                          htmlFor="message"
                          className={`transition-colors duration-300 ${focusedField === 'message' ? 'text-primary' : ''}`}
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project or opportunity..."
                          rows={5}
                          required
                          value={formData.message}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                        />
                      </div>
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-destructive"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          disabled={isSubmitting} 
                          className="w-full group shadow-sm shadow-primary/20"
                          size="lg"
                        >
                          <span className="flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                Send Message
                              </>
                            )}
                          </span>
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
