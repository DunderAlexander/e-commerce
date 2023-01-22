import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import ItemCards from "./components/ItemCards";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ItemDetails from "./pages/ItemDetails";
import Account from "./pages/Account";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Carousel />
              <ItemCards />
            </main>
          }
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="account" element={<Account />} />
        <Route path="/items/:id" element={<ItemDetails />} />
      </Routes>
    </>
  );
}

export default App;
