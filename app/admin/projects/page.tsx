import { createClient } from '@/lib/supabase/server'
import { ProjectsTable } from '@/components/admin/projects-table'
import { ProjectFormDialog } from '@/components/admin/project-form-dialog'

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <ProjectFormDialog />
      </div>

      <ProjectsTable projects={projects || []} />
    </div>
  )
}
