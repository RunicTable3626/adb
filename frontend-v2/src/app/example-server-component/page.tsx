// Modeled from example from React Query docs:
// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { ContentWrapper } from '@/app/content-wrapper'
import { AuthedPageLayout } from '@/app/authed-page-layout'
import { API_PATH, ApiClient } from '@/lib/api'
import { getCookies } from '@/lib/auth'
import { Navbar } from '@/components/nav'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import InternationalChapters from './international-chapters'

export default async function IntlOrgPage() {
  const apiClient = new ApiClient(await getCookies())
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [API_PATH.CHAPTER_LIST],
    queryFn: apiClient.getChapterList,
  })

  return (
    <AuthedPageLayout pageName="TestPage">
      <Navbar />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>Activist</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Smith</TableCell>
            <TableCell>Organizer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ContentWrapper size="sm" className="gap-6">
        <p>Hello from App Router!</p>

        {
          // Serialization is as easy as passing props.
          // HydrationBoundary is a Client Component, so hydration will happen there.
        }
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InternationalChapters />
        </HydrationBoundary>
      </ContentWrapper>
    </AuthedPageLayout>
  )
}
