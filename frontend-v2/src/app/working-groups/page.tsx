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

import WorkingGroupsList from './working-groups-list'

export default async function WorkingGroupsPage() {
  const apiClient = new ApiClient(await getCookies())
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [API_PATH.WORKING_GROUPS_LIST],
    queryFn: apiClient.getWorkingGroups,
  })

  return (
    <AuthedPageLayout pageName="TestPage">
      <Navbar />
      <ContentWrapper size="sm" className="gap-6">
        <h1 className="text-lg">Working Groups</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <WorkingGroupsList />
        </HydrationBoundary>
      </ContentWrapper>
    </AuthedPageLayout>
  )
}

//add working groups list and then an edit component when modification happens.
