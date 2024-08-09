import express from "express";
import cors from "cors";
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());



  app.use(cors());

app.use("/category", require("./routes/Category"));
app.use("/user", require("./routes/User"));
app.use("/feedback", require("./routes/Feedback"));
app.use("/adm", require("./routes/Adm"));
app.use("/freelancer", require("./routes/Freelancer"));
app.use("/auth", require("./routes/Auth"));
app.use("/service", require("./routes/Service"));

app.listen(port, () => {
  console.log("Server starter at port ", port);
});
