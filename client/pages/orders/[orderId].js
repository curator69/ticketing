import Router from "next/router";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useRequest from "../../hooks/use-request";

const stripePromise = loadStripe(
  "pk_test_51M47mLSCBNy1cnxq4qDQTvLW5gOmjrn3yhi0z6Umw34AZAcRRNs1p5sHLZxEpIn9c5MxfwRIiOZiJlz7ABBIKduy00bxmwPdht"
);

const CheckoutForm = ({ order, currentUser, doRequest }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { token } = await stripe.createToken(
      elements.getElement(CardElement)
    );
    console.log(token);
    await doRequest({ token: token.id });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="btn btn-primary mt-3">
        Pay Now
      </button>
    </form>
  );
};

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <Elements stripe={stripePromise}>
        <CheckoutForm
          order={order}
          currentUser={currentUser}
          doRequest={doRequest}
        />
      </Elements>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
