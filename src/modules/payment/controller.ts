import { Request, Response } from 'express';
import Stripe from 'stripe';
import { ResponseCode } from '../../common/apiResponse';

const stripe = new Stripe('sk_test_51OyrgABAvfPSndrV78iAgZN7XbmfMuC70UVOTiZRtyGH8CkhCL9OklLrabfUHzXVIbrlhPPhAT0WeKMS9MwDiXKc00tM7aL5WC', { apiVersion: '2020-08-27' });

// export const paymentIntent = async (req: Request, res: Response) => {
//   try {
//     const { amount, paymentMethodId } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     res.status(ResponseCode.SUCCESS).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ error });
//   }
// };
export const paymentIntent = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email, price } = req.body;

    if (!price) {
      return res.status(400).json({ error: 'Missing required parameters: email and price' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // amount is in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
