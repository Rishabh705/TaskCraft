import Error from "./components/NotFound"
import Home from "./components/Home";
import HomeLayout from './Layouts/HomeLayout'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Home />} />
    </Route>
  )
  )
  return (
    <RouterProvider router={router} />
  )
}
export default App
