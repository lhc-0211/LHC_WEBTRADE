import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import NotFound from "../pages/about/notFound";
import PriceBoardPage from "../pages/price-board/PriceBoardPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PriceBoardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
