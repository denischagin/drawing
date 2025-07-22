import { STORAGE_KEYS } from '@/constants'
import { useMemo } from 'react'
import { useParams } from 'react-router'

export const useAdmin = (): boolean => {
  const { roomId } = useParams()

  const isAdmin = useMemo(() => {
    return roomId === sessionStorage.getItem(STORAGE_KEYS.roomId)
  }, [roomId])

  return isAdmin
}
