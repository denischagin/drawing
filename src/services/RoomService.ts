import { baseApi } from '@/api'

class RoomService {
  async createRoom() {
    const response = await baseApi.post('/api/v1/rooms')
    return response.data
  }
}

export default new RoomService()
