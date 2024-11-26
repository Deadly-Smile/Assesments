import { Route, Routes } from "react-router-dom";
import { useGetCartItemsQuery, useGetUserQuery } from "./store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import UserContext from "./context/UserContext";
import CartContext from "./context/CartContext";
import Cart from "./components/Cart";

const App = () => {
  const { data: user, isSuccess: isUserSuccess } = useGetUserQuery();
  const { data: cart } = useGetCartItemsQuery();
  return (
    <UserContext.Provider value={{ user: user, isSuccess: isUserSuccess }}>
      <CartContext.Provider value={{ cart: cart }}>
        <header className="b border-emerald-950">
          <Navbar webName="Anik Saha" />
        </header>
        <section className="min-h-[85vh]">
          {isUserSuccess && user?.username ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </section>
        <footer>
          <Footer />
        </footer>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
