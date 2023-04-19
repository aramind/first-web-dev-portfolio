import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import RecordPage from "./pages/RecordPage";
import ChartsPage from "./pages/ChartsPage";
import SummaryPage from "./pages/SummaryPage";
import ReadingsPage from "./pages/ReadingsPage";
import { Login } from "@mui/icons-material";
import NavBar from "./components/navbar/NavBar";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <HomePage />, errorElement: <NotFoundPage /> },
      {
        path: "record",
        element: <RecordPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "charts",
        element: <ChartsPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "summary",
        element: <SummaryPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "readings",
        element: <ReadingsPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
