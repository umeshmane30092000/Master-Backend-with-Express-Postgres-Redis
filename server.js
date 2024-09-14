import express from 'express'
import "dotenv/config"
const app = express();
import fileupload from "express-fileupload";

const PORT = process.env.PORT || 8000;

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());


app.get("/", (req, res) => {
  res.json({
    message: "hello world"
  })
})


// import routes
import ApiRoutes from './routes/api.js';
app.use("/api", ApiRoutes);

app.listen(PORT, () => console.log(`server is runnig on the PORT ${PORT}`));