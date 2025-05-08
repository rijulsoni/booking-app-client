import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NIt6KSCaxNQvXKq7t1hB12Cr8gNVA5glEewwjn3zEB9DotBIRGhTC6HJ1lJGWZg2ZmGAUZZufYFFqeBzpqiyoHL00JR8plX3e')
createRoot(document.getElementById("root")!).render(
<Provider store={store}>
<Elements stripe={stripePromise}>
  <App />
</Elements>
</Provider>
);
