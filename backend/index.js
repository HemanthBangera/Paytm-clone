const express = require("express");
const rootRouter = require("./routes/index.js")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())


app.use("/api/vi",rootRouter);

app.listen(3000)