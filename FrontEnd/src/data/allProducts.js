import aataProducts from "./aataProducts";
import cleaningProducts from "./CleaningProducts";
import colddrink from "./Colddrink";
import cosmetics from "./Cosmetic";
import dryfruits from "./DryFruits";
import instantFood from "./InstantFood";
import masala from "./Masala";
import oils from "./Oils";
import pickle from "./Pickle";
import pulses from "./Pulses";
import rice from "./Rice";
import salt from "./Salt";
import snacks from "./Snacks";
import sweetsProduct from "./Sweets";
import TcmdProducts from "./TcmdProducts";

// Combine all products with their category link
const allProducts = [
    ...aataProducts.map(p => ({ ...p, category: "aata", link: `/product/aata/${p.id}` })),
    ...cleaningProducts.map(p => ({ ...p, category: "clean", link: `/product/clean/${p.id}` })),
    ...colddrink.map(p => ({ ...p, category: "colddrink", link: `/product/colddrink/${p.id}` })),
    ...cosmetics.map(p => ({ ...p, category: "cosmetics", link: `/product/cosmetics/${p.id}` })),
    ...dryfruits.map(p => ({ ...p, category: "dryfruits", link: `/product/dryfruits/${p.id}` })),
    ...instantFood.map(p => ({ ...p, category: "instantfood", link: `/product/instantfood/${p.id}` })),
    ...masala.map(p => ({ ...p, category: "masala", link: `/product/masala/${p.id}` })),
    ...oils.map(p => ({ ...p, category: "oils", link: `/product/oils/${p.id}` })),
    ...pickle.map(p => ({ ...p, category: "pickle", link: `/product/pickle/${p.id}` })),
    ...pulses.map(p => ({ ...p, category: "pulses", link: `/product/pulses/${p.id}` })),
    ...rice.map(p => ({ ...p, category: "rice", link: `/product/rice/${p.id}` })),
    ...salt.map(p => ({ ...p, category: "salt", link: `/product/salt/${p.id}` })),
    ...snacks.map(p => ({ ...p, category: "snacks", link: `/product/snacks/${p.id}` })),
    ...sweetsProduct.map(p => ({ ...p, category: "sweets", link: `/product/sweets/${p.id}` })),
    ...TcmdProducts.map(p => ({ ...p, category: "tcmd", link: `/product/tcmd/${p.id}` })),
];

export default allProducts;
