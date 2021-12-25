import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "app")));

app.listen(3000, () => console.log(`Server started on port 3000`));
