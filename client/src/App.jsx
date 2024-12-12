import React from 'react';
import Cookies from 'js-cookie';

function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function login() {
      await fetch('http://localhost:5080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: 'testuser1@gmail.com',
          password: 'password'
        })
      })
      // get token from cookie
      fetch('http://localhost:5080/api/products', {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => setProducts(data.products));
    }
    login();
  }, []);

  return (
    <div className='bg-stone-500'>
      <div className='bg-stone-500'>
        <p className='bg-stone-500'>Logged In Status: <b>{Cookies.get('token') ? 'Logged In' : 'Not Logged In'}</b></p>
        <h1>Products</h1>
        {
          products.map(product => (
            <div key={product._id}>
              <h2 className='font-mono'>{product.title}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <img src={product.thumbnailImage} alt={product.title} width={"150px"} />
            </div>
          ))
        }
      </div>

      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
        <div class="shrink-0">
          <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo"></img>
        </div>
        <div>
          <div class="text-xl font-medium text-black">ChitChat</div>
          <p class="text-slate-500">You have a new message!</p>
        </div>
      </div>

    </div>
  );
}

export default App;
