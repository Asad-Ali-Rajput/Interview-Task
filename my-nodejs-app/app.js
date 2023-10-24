const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

const app = express();

dotenv.config();

var corsOptions = {
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));

app.get('/api/:section', async (req, res) => {
  console.log(req)
  const userInput = req.params.section;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(`${process.env.API_URL}/${userInput}?api-key=${apiKey}`);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
