import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey:
    // 'pk_test_51IRFQdCceJS6fQKRq9PNqOE2LtSrPZOAtT9KgSWKlDd1RFpqPqW2ewsXWDjoAYhiDemCAMj4nFcJ0lLyXDe2W2Vw00HwUgX8xU',
    'pk_test_51IRHvUAbzbp0UmyIzID28j0yvepX4V43vqCWCIXba08buILO5IFA685yCuMBNe5uivHBKY3IdMGYAtMo0dC1KUoQ00joojiTc5',
  // merchantId: '<MERCHANT_ID>',
  androidPayMode: 'test',
});

async function getStripeToken(payload) {
  return await stripe.createTokenWithCard(payload);
}

export default { getStripeToken };
