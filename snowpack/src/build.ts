import { install } from "esinstall";

const run = async () => {
  await install(["react", "react-dom"]);
};

run();
