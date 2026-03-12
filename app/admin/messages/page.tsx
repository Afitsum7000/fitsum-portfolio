import { createClient } from '@/lib/supabase/server'
import { MessagesTable } from '@/components/admin/messages-table'

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Contact form submissions from your portfolio
        </p>
      </div>

      <MessagesTable messages={messages || []} />
    </div>
  )
}
