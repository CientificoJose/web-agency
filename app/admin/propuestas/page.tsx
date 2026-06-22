import { getProposals, getCatalog } from "@/lib/actions"
import AdminPropuestasClient from "./AdminPropuestasClient"

export const dynamic = "force-dynamic"

export default async function AdminPropuestasPage() {
  const proposals = await getProposals()
  const catalog = await getCatalog()

  return <AdminPropuestasClient proposals={proposals} initialCatalog={catalog} />
}
