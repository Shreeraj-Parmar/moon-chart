import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import Dashboard from './components/Dashboard';


function App() {

  const userRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
  ]);

  return (
    <>
      <RouterProvider router={userRoutes} />
    </>
  )
}

export default App
