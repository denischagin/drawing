import { RoomPage } from '@/pages'
import { createBrowserRouter, RouterProvider } from 'react-router'

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RoomPage />,
    },
    {
      path: '/:roomId',
      element: <RoomPage />,
    },
  ])

  return <RouterProvider router={router} />
}
