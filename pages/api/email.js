import React from "react";

export default async function handler(req, res) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = {
    to: "zcaptain65@gmail.com",
    from: "zcaptain2002@gmail.com",
    // subject: "Scenario 44",
    // text: "Lift and coast where possible",
    templateId: "d-f408be01db99489cbd757d4607cf23f2",
    dynamicTemplateData: {
      subject: "GGV Test Email",
    },
  };
  sgMail
    .send(message)
    .then((response) => res.redirect(307, "/payments"))
    .catch((error) => console.log(error.message));
}
