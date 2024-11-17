const express = require('express');
const app = express();
const PORT = 5001;
const cors = require('cors');
app.use(cors());


app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
