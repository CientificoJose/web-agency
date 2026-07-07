import { getProposalById } from "@/lib/actions"
import { notFound } from "next/navigation"
import DynamicContractClient from "./DynamicContractClient"

interface ProposalPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function DynamicProposalPage({ params }: ProposalPageProps) {
  const resolvedParams = await params
  const { proposal, credentials, services, payments, collaborators } = await getProposalById(resolvedParams.id)

  if (!proposal) {
    notFound()
  }

  return (
    <DynamicContractClient
      proposal={proposal}
      credentials={credentials}
      services={services}
      payments={payments}
      collaborators={collaborators}
    />
  )
}
