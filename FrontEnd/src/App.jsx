import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./routes/routes";


// ✅ Yaha import karo CartProvider
import { CartProvider } from "./context/CartContext";  

function App() {
  return (
    <CartProvider>

      <BrowserRouter>
        <Routes>{routes}

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
