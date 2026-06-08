import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Sweets", image: "../CardImages/Sweets.jpg", link: "/sweets" },
  { id: 2, name: "Cosmetics", image: "../CardImages/Cosmetics.png", link: "/cosmetics" },
  { id: 3, name: "Cold-drink", image: "../CardImages/Colddrink.jpeg", link: "/colddrink" },
  { id: 4, name: "Oils", image: "../CardImages/fortuneOil.avif", link: "/oils" },
  { id: 5, name: "Aata", image: "../CardImages/Aata.jpg", link: "/aata" },
  { id: 6, name: "Snacks", image: "../CardImages/Snacks.avif", link: "/snacks" },
  { id: 7, name: "Masala", image: "../CardImages/masale.jpg", link: "/masala" },
  { id: 8, name: "Instant Food", image: "../CardImages/instant.webp", link: "/instant-food" },
  { id: 9, name: "DryFruits", image: "../CardImages/dryFruits.jpeg", link: "/dry-fruits" },
  { id: 10, name: "Pickle", image: "../CardImages/Aachar.jpg", link: "/pickle" },
  { id: 11, name: "Cleanning & Essentials", image: "../CardImages/clean.webp", link: "/clean" },
  { id: 12, name: "Tea ,Coffee & Milk Drinks", image: "../CardImages/TMC.jpeg", link: "/tcmd" },
  { id: 13, name: "Rice", image: "../CardImages/Rice.avif", link: "/rice" },
  { id: 14, name: "Salt", image: "../CardImages/namak.jpg", link: "/salt" },
  { id: 15, name: "Pulses", image: "../CardImages/Dal.jpg", link: "/pulses" },

];
export default function ProductCard() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Products
      </h1>

      {/* Scrollable Container */}
      <div className="max-w-7xl mx-auto px-4 h-[650px] overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={product.link || "#"} key={product.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 h-[260px] flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-3"
                />
                <h3 className="text-center text-sm font-semibold">
                  {product.name}
                </h3>
                <button className="mt-auto w-full bg-green-600 text-white py-1.5 text-sm rounded hover:bg-green-700">
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
