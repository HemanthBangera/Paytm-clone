const express = require("express");
const rootRouter = require("./routes/index.js")
const app = express()
const cors = require("cors")
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())


app.use("/api/vi",rootRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
