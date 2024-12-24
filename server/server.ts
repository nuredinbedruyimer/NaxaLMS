import dotenv from "dotenv";
import app from "./index";

dotenv.config();

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
