'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { API_PATH, apiClient } from '@/lib/api'
import { Loader } from 'lucide-react'
import { useMemo } from 'react'
import { Table } from '@/components/ui/table'
import toast from 'react-hot-toast'

export function IntlChapterNames() {
  // This useQuery could just as well happen in some deeper
  // child to <Activists>, data will be available immediately either way
  const { data, isLoading } = useQuery({
    queryKey: [API_PATH.CHAPTER_LIST],
    queryFn: apiClient.getChapterList,
  })

  const chapterNames = useMemo(() => {
    return (data ?? []).map((ch) => ch.Name)
  }, [data])

  console.log(chapterNames)

  return (
    <div>
      <p className="font-bold">Here are some activists:</p>
      <ul className="list-disc pl-4">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          chapterNames.map((Name) => <li key={Name}>{Name}</li>)
        )}
      </ul>
    </div>
  )
}

/** Example component of how to fetch data using Tanstack Query. */
export default function InternationalChapters() {
  // TODO: add example of loading data from child relationships
  //   // This query was not prefetched on the server and will not start
  //   // fetching until on the client, both patterns are fine to mix.
  //   const { data: eventsData } = useQuery({
  //     queryKey: ['activists-events'],
  //     queryFn: getActivistsEvents,
  //   })

  return (
    <>
      <Table />
      <IntlChapterNames />
      <Button onClick={() => toast.success('Hey!')}>Click me</Button>
    </>
  )
}
