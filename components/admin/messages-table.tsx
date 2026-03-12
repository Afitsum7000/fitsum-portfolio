'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { createClient } from '@/lib/supabase/client'
import { Eye, Trash2, Mail, Building } from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  read: boolean
  created_at: string
}

interface MessagesTableProps {
  messages: Message[]
}

export function MessagesTable({ messages }: MessagesTableProps) {
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const viewMessage = async (message: Message) => {
    setSelectedMessage(message)

    if (!message.read) {
      const supabase = createClient()
      await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', message.id)
      router.refresh()
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)

    const supabase = createClient()
    await supabase.from('contact_messages').delete().eq('id', deleteId)

    setDeleteId(null)
    setIsDeleting(false)
    setSelectedMessage(null)
    router.refresh()
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-lg">
        <p className="text-muted-foreground">No messages yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Messages from your contact form will appear here
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="border border-border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{message.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {message.company || '-'}
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                    {message.message}
                  </p>
                </TableCell>
                <TableCell>
                  {message.read ? (
                    <Badge variant="secondary">Read</Badge>
                  ) : (
                    <Badge>New</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(message.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => viewMessage(message)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(message.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Message Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {selectedMessage.email}
                </a>
              </div>
              {selectedMessage.company && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  {selectedMessage.company}
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                Received:{' '}
                {new Date(selectedMessage.created_at).toLocaleString()}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-foreground whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleteId(selectedMessage.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
