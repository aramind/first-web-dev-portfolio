import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TitlePage from "./pages/TitlePage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import AddPage from "./pages/AddPage";
import ChartsPage from "./pages/ChartsPage";
import DataContextProvider from "./contextprovider/DataContextProvider";
import Blog from "./pages/Blog";

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
      { path: "charts", element: <ChartsPage />, errorElement: <NotFound /> },
      {
        path: "summary",
        element: <SummaryPage />,
        errorElement: <NotFound />,
      },
      { path: "add", element: <AddPage />, errorElement: <NotFound /> },
      { path: "blog", element: <Blog />, errorElement: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={router}>
        <MainLayout />
      </RouterProvider>
    </DataContextProvider>
  );
}

export default App;
