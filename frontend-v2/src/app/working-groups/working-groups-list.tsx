'use client'

import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { API_PATH, ApiClient } from '@/lib/api'
import { Loader } from 'lucide-react'

// Zod schema for validation
const WorkingGroupSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Email: z.string().email(),
})

export default function WorkingGroupsList() {
  const apiClient = new ApiClient()

  const { data: workingGroups, isLoading } = useQuery({
    queryKey: [API_PATH.WORKING_GROUPS_LIST],
    queryFn: apiClient.getWorkingGroups,
  })

  const validatedGroups = workingGroups?.map((wg) =>
    WorkingGroupSchema.parse(wg),
  )

  return (
    <div className="space-y-4">
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        validatedGroups?.map((wg) => (
          <div key={wg.Id} className="flex justify-between border-b py-2">
            <div>
              <div className="font-medium">{wg.Name}</div>
              <div className="text-sm text-gray-500">{wg.Email}</div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
