import { RoomService } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export const useCreateRoom = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: RoomService.createRoom,
    onSuccess: (key: string) => {
      navigate('/' + key)
    },
  })
}
