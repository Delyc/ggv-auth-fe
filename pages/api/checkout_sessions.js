import { data } from 'autoprefixer';


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import fetcher from '../../lib/api';

async function Handler(req, res) {
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  const payment_id = 1;
  let qr_code = "";
  await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/visas/${payment_id}`)
    .then( (response) => qr_code = response.data);
  console.log("qrcode", qr_code);

  if (req.method === "POST") {
    try {
      
      // const qr_code_pass = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOESURBVO3BO65jSwIDwWRB+99yThvPoFXAgaTbn2FE/IWZ/xxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKizcl4Sep3CThRqUloam0JNyo3CThJ6m84zBTDjPlMFNefJjKJyXhCZWbJNwk4UblHSqflIRPOsyUw0w5zJQXX5aEJ1SeSMKNSlNpSWgqLQk3SWgqTyThCZVvOsyUw0w5zJQX/2eS0FRaEppKS0JT+ZccZsphphxmyot/jMqNyo3KjUpLQlP5mx1mymGmHGbKiy9T+UlJaCpPJOEJlXeo/EkOM+UwUw4z5cWHJeF3UmlJaCotCU2lJaGptCQ0lZsk/MkOM+UwUw4z5cWbVP5mKi0JTeUdKn+Tw0w5zJTDTIm/8IYkNJWWhE9SeSIJNyo3SbhRuUnCJ6l802GmHGbKYaa8+DKVmyTcqHxTEprKjUpLQlNpKi0JTaUl4YkkNJV3HGbKYaYcZkr8hTck4QmVmyS8Q+UmCU2lJeFG5SYJP0nlkw4z5TBTDjMl/sIPSsKNyk0S3qHSktBUnkhCU7lJQlNpSWgqP+kwUw4z5TBTXrwpCTcq70hCU7lJQlNpSWgqTyThHSotCe9IQlN5x2GmHGbKYabEX3hDEm5UPikJNypPJKGptCQ0lZaEJ1RukvCEyicdZsphphxmyosPU3lHEm5UWhJuktBUmkpLwhMqLQk3SWgqf5LDTDnMlMNMefFlSWgqLQk3Ku9QaUm4UWlJuEnCjconqXzTYaYcZsphpsRfeEMSmkpLwiep3CShqbwjCb+Tyk0Smso7DjPlMFMOM+XFm1RuVL4pCU8koancqNwkoak8kYQ/yWGmHGbKYaa8eFMSfpJKU7lJwk0SnlB5IglN5UbldzrMlMNMOcyUFx+m8klJuEnCN6m0JDyh8klJ+KbDTDnMlMNMefFlSXhC5ZNUbpLQVN6RhL/ZYaYcZsphprz4x6i0JNyo3CThCZWWhKZyk4Sm0lRaEj7pMFMOM+UwU17841RaEloSnlC5SUJTaUloKn+Sw0w5zJTDTHnxZSrfpPIOlZaEpvKOJDSVG5UnVD7pMFMOM+UwU158WBJ+UhKaSktCU3kiCTcqTeWJJDSVJ5LQVN5xmCmHmXKYKfEXZv5zmCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKf8DKWuc6uVLoe0AAAAASUVORK5CYII=";
      var strImage = qr_code.replace(/^data:image\/[a-z]+;base64,/, "");
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const message = {
        to: "joseorlando182@gmail.com",
        from: "zcaptain2002@gmail.com",
        // subject: "Scenario 44",
        // text: "Lift and coast where possible",
        templateId: "d-c90e3bf8e61b4c188b2987b4a3c76d5a",
        dynamicTemplateData: {
          subject: "Your Global Green Visa Details!",
          name: "Jose",
          username: "Pedro 1",
          action_url: process.env.DASHBOARD_URL,
        },
        attachments: [
          {
            filename: "qrCode.png",
            content: strImage,
            type:  'image/png',
            content_id: "qrCode",
            disposition: "inline",
          }
        ]
        
      };

    console.log(strImage);

      sgMail
        .send(message)
        .then((response) => console.log("Email Sent"))
        .catch((error) => console.log(error.message));
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

        success_url: `${req.headers.origin}/payments/?success=true`,
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