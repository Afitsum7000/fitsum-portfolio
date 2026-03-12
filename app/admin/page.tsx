import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen, MessageSquare, Star, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [projectsResult, messagesResult, unreadResult, featuredResult] =
    await Promise.all([
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('contact_messages').select('id', { count: 'exact' }),
      supabase
        .from('contact_messages')
        .select('id', { count: 'exact' })
        .eq('read', false),
      supabase
        .from('projects')
        .select('id', { count: 'exact' })
        .eq('featured', true),
    ])

  const stats = [
    {
      title: 'Total Projects',
      value: projectsResult.count || 0,
      icon: FolderOpen,
      href: '/admin/projects',
    },
    {
      title: 'Featured Projects',
      value: featuredResult.count || 0,
      icon: Star,
      href: '/admin/projects',
    },
    {
      title: 'Total Messages',
      value: messagesResult.count || 0,
      icon: MessageSquare,
      href: '/admin/messages',
    },
    {
      title: 'Unread Messages',
      value: unreadResult.count || 0,
      icon: Clock,
      href: '/admin/messages',
    },
  ]

  // Get recent messages
  const { data: recentMessages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here is an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Messages
            <Link
              href="/admin/messages"
              className="text-sm font-normal text-primary hover:underline"
            >
              View all
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentMessages && recentMessages.length > 0 ? (
            <div className="flex flex-col gap-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">
                        {message.name}
                      </p>
                      {!message.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.email}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {new Date(message.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No messages yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
