'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { API_PATH, apiClient } from '@/lib/api'
import { Loader } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function IntlChapterNames() {
  // This useQuery could just as well happen in some deeper
  // child to <Activists>, data will be available immediately either way
  const { data, isLoading } = useQuery({
    queryKey: [API_PATH.CHAPTER_LIST],
    queryFn: apiClient.getChapterList,
  })

  const chaptersData = useMemo(() => {
    return data ?? []
  }, [data])

  console.log(chaptersData)

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center p-4">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chapter ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {chaptersData.map((person, idx) => (
              <TableRow key={idx}>
                <TableCell>{person.ChapterID}</TableCell>
                <TableCell>{person.Name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
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
