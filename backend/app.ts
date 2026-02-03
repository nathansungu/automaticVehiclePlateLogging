import expres from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/index";
import { recordAttendanceServiceYolo } from "./src/services/attendance.Service";

const app = expres();
app.use(expres.json());
app.use(cookieparser());
app.use(cors());
setInterval(recordAttendanceServiceYolo, 3000);

app.use("/api", router);

const port = process.env.PORT || 4000;
app.listen(port, (e) => {
  e ? console.log(e) : console.log(`app running on port ${port}`);
});
