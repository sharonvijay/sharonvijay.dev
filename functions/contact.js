const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const contactEmail = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "sharonvijay2003@gmail.com",
      pass: "zkxaugunplsjlpsw",
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  const name =
    event.queryStringParameters.firstName +
    event.queryStringParameters.lastName;
  const email = event.queryStringParameters.email;
  const message = event.queryStringParameters.message;
  const phone = event.queryStringParameters.phone;
  const mail = {
    from: name,
    to: "sharonvijay2003@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await contactEmail.sendMail(mail);
    return {
      statusCode: 200,
      body: JSON.stringify({ code: 200, status: "Message Sent" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ code: 500, status: "Internal Server Error" }),
    };
  }
};
