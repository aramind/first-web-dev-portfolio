import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TitlePage from "./pages/TitlePage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import AddPage from "./pages/AddPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <TitlePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/monitimeapp",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <HomePage />, errorElement: <NotFound /> },
      {
        path: "summary",
        element: <SummaryPage />,
        errorElement: <NotFound />,
      },
      { path: "add", element: <AddPage />, errorElement: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
