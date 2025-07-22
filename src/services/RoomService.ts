import { baseApi } from '@/api'

class RoomService {
  async createRoom(): Promise<string> {
    const response = await baseApi.post('/api/v1/rooms')
    console.log(response.data)
    return response.data
  }
}

export default new RoomService()
