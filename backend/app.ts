import expres from "express";
import cookieparser from "cookie-parser"
import cors from "cors";

const app = expres();
app.use(expres.json());
app.use("cookie-parser"());
app.use("cors"());

const port = process.env.PORT || 4000;
app.listen(port, (e) => {
  e ? console.log(e) : console.log(`app running on port ${port}`);
}); 
