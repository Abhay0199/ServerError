const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/callAPI', async (req, res) => {
    const { method, fetchURL, data } = req.body;

    try {
        let axiosConfig = { method, url: fetchURL };

        if (method === 'POST') {
            axiosConfig.data = data;
        }

        const response = await axios(axiosConfig);

        // Assuming you want to send the entire response back to the React app
        res.json(response.data);
    } catch (error) {
        const errorCode = error.response ? error.response.status : 'ND-B1#5-3';
        const errorMessage = error.response ? error.response.data : error.message;

        res.status(401).json({
            errorCode,
            errorMessage,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
