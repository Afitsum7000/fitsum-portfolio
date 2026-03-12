-- Seed initial projects
INSERT INTO public.projects (title, description, tech_stack, image_url, live_url, featured) VALUES
  (
    'Audionix',
    'AI-powered speech-to-text platform with advanced transcription capabilities and multi-language support.',
    ARRAY['Node.js', 'TypeScript', 'AI/ML', 'PostgreSQL', 'Redis'],
    NULL,
    'https://v0-audionix-website-build.vercel.app/',
    true
  ),
  (
    'Miko & Sebli Cleaning',
    'Professional cleaning service website with SEO optimization and booking system.',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    NULL,
    'https://mikoseblicleaning.vercel.app/',
    true
  ),
  (
    'Beten Ethiopia',
    'Real estate and housing platform connecting buyers and sellers in Ethiopia.',
    ARRAY['Node.js', 'PostgreSQL', 'REST API', 'React'],
    NULL,
    'https://betenethiopia.com/',
    true
  ),
  (
    'StarPay - Fintech Wallet Platform',
    'High-volume fintech wallet system with mobile money integration and real-time transaction processing.',
    ARRAY['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Microservices', 'gRPC'],
    NULL,
    NULL,
    true
  ),
  (
    'Ride Hailing Platform',
    'Scalable ride-hailing backend with real-time driver matching, payment integration, and automated dispatch.',
    ARRAY['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Google Cloud', 'Docker'],
    NULL,
    NULL,
    false
  ),
  (
    'School Management System',
    'Comprehensive school management platform with role-based access control, grade tracking, and reporting.',
    ARRAY['Node.js', 'TypeScript', 'PostgreSQL', 'REST API', 'Docker'],
    NULL,
    NULL,
    false
  ),
  (
    'Learning Management System',
    'Enterprise LMS with course management, progress tracking, and certification system.',
    ARRAY['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Microservices'],
    NULL,
    NULL,
    false
  )
ON CONFLICT DO NOTHING;
