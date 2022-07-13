const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function Handler(req, res) {
  // console.log(req.body.user_id);

  // const [createVisaHolder, { loading }] = useMutation(APPLY_VISA, {
  //   variables: {
  //     first_name: "DEMO",
  //     last_name: "DEMO",
  //     user: "aissa",
  //     conservation_areas: req.body.enteredConservationAreas,
  //     passport_no: req.body.passport_no,
  //     passport_expiry: req.body.passport_expiry,
  //   },
  // });

  // await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/visas/${payment_id}`)
  //   .then( (response) => qr_code = response.data.attributes.qr_image);
  // console.log("qrcode", qr_code);

  if (req.method === "POST") {
    // Create visa holder
    // await createVisaHolder();

    // toast.success("visa holder created succesfully")
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1LG6qaFQPGmzrn5tDKjmnos3",
            quantity: 1,
          },
        ],
        mode: "payment",

        success_url: `${req.headers.origin}/api/email/`,
        cancel_url: `${req.headers.origin}/payments/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
export default Handler;
