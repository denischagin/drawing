import { baseApi } from '@/api'

class WebsocketService {
  async connect(): Promise<undefined> {
    await baseApi.get('/api/v1/ws')
  }
}
export default new WebsocketService()
