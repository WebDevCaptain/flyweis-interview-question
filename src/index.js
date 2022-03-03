const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.json({
    msg: "Hello",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
