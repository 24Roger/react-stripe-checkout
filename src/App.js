import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import 'bootswatch/dist/lux/bootstrap.min.css';
import './App.css';

const stripePromise = loadStripe("pk_test_51HSTsREymoDGodVFi1graclqOUm86NgO54oI6WeBaidQNZnXIOsHiuQLPQmq1UWpX1Y6Nk3JuuPjaN9FGYZ1AQeV000IlEgwZT");

const CheckoutForm = () => {

  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if(!error){      
      const id = paymentMethod;
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/checkout",
        {
          id,
          amount: 10000,
        }
      );
      console.log(data);
    }
  }

  return <form onSubmit={handleSubmit} className="card card-body">

    <img
      src="https://images-na.ssl-images-amazon.com/images/I/71h6PpGaz9L._AC_SL1500_.jpg"
      alt="Surface laptop 4"
      className="img-fluid">        
    </img>
    <h3 className="text-center my-2">Price: 100$</h3>

    <div className="form-group">
      <CardElement className="form-control"/>
    </div>

    <button className="btn
     btn-success">
      Buy
    </button>
  </form>
}

function App() {
  return (

    <Elements stripe={stripePromise}>

      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
          <CheckoutForm/>
          </div>
        </div>
     </div>       

    </Elements>
    
  );
}

export default App;
