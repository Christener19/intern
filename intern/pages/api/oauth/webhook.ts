// require('dotenv').config();
// import express from 'express';
// import ngrok from 'ngrok';
// import crypto from 'crypto';

// const app = express();
// const port = 3001;
// const TOKEN: any = process.env.SECRET_TOKEN;

// app.use(express.json());

// app.get('/api/oauth/webhook', (req, res) => {
//   res.send('Webhook endpoint verified');
// });

// // Handle POST requests to /zoom-webhook
// app.post('/zoom-webhook', (req, res) => {
//   console.log('Zoom Webhook Received:', req.body);

//   // Construct the message string
//   const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`;

//   // Hash the message string with your Webhook Secret Token and prepend the version semantic
//   const hashForVerify = crypto.createHmac('sha256', TOKEN).update(message).digest('hex');
//   const signature = `v0=${hashForVerify}`;

//   if (req.headers['x-zm-signature'] === signature) {
//     if (req.body.event === 'endpoint.url_validation') {
//       const hashForValidate = crypto.createHmac('sha256', TOKEN).update(req.body.payload.plainToken).digest('hex');

//       const response = {
//         plainToken: req.body.payload.plainToken,
//         encryptedToken: hashForValidate
//       };

//       console.log(response);
//       res.status(200).json(response);
//     } else {
//       console.log('Authorized request to Zoom Webhook.');
//       res.status(200).json({ message: 'Authorized request to Zoom Webhook.' });

//       // Business logic here, e.g., make API request to Zoom or 3rd party
//     }
//   } else {
//     console.log('Unauthorized request to Zoom Webhook.');
//     res.status(401).json({ message: 'Unauthorized request to Zoom Webhook.' });
//   }
// });

// app.get('/zoom-webhook', (req, res) => {
//   res.send('Zoom Webhook GET endpoint reached');
// });

// app.get('/', (req, res) => res.send('Hello World!'));
// const PERSONAL_NGROK_TOKEN: any = process.env.PERSONAL_NGROK_TOKEN;
// const startServer = async () => {
//   try {
//     await ngrok.authtoken(PERSONAL_NGROK_TOKEN);
//     app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
//     const ngrokUrl = await ngrok.connect(port);
//     console.log(`Ngrok tunnel established at ${ngrokUrl}`);
//     console.log(`Zoom Webhook endpoint: ${ngrokUrl}/zoom-webhook`);
//   } catch (err) {
//     console.error('Error starting server or Ngrok', err);
//     process.exit(1);
//   }
// };

// startServer();


// //Go here first:                //http://localhost:3000/api/oauth/webhook?code=
// //Then change it to this           //http://localhost:3001/api/oauth/webhook?code=





