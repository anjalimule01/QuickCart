import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const products = [
{ id: 1, name: 'Wireless Headphones', price: 1499, category: 'Electronics' },
{ id: 2, name: 'Smart Watch', price: 1999, category: 'Electronics' },
{ id: 3, name: 'Backpack', price: 899, category: 'Accessories' },
{ id: 4, name: 'Running Shoes', price: 1299, category: 'Fashion' }
];

function Home() {
const [search, setSearch] = useState('');

const filteredProducts = products.filter(product =>
product.name.toLowerCase().includes(search.toLowerCase())
);

return (
<main>
<h2>Our Products</h2>
<input
placeholder="Search products..."
value={search}
onChange={event => setSearch(event.target.value)}
/>

  <div className="products">
    {filteredProducts.map(product => (
      <article className="product" key={product.id}>
        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </article>
    ))}
    {filteredProducts.length === 0 && <p>No products found.</p>}
  </div>
</main>

);
}

function ProductDetails() {
const productId = Number(window.location.pathname.split('/').pop());
const product = products.find(item => item.id === productId);

if (!product) return <p>Product not found.</p>;

return (
<main>
<h2>{product.name}</h2>
<p>Category: {product.category}</p>
<p>Price: ₹{product.price}</p>
<Link to="/">Back to products</Link>
</main>
);
}

function App() {
return (
<BrowserRouter>
<header>
<h1>QuickCart</h1>
<nav><Link to="/">Home</Link></nav>
</header>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetails />} />
  </Routes>
</BrowserRouter>

);
}

export default App;