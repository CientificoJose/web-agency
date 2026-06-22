import { getProposalById, getCatalog } from "@/lib/actions"
import { notFound } from "next/navigation"
import EditarPropuestaClient from "./EditarPropuestaClient"

interface EditarPropuestaPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditarPropuestaPage({ params }: EditarPropuestaPageProps) {
  const resolvedParams = await params
  const { proposal, credentials } = await getProposalById(resolvedParams.id)
  const catalog = await getCatalog()

  if (!proposal) {
    notFound()
  }

  return (
    <EditarPropuestaClient
      proposal={proposal}
      initialCredentials={credentials}
      catalog={catalog}
    />
  )
}
