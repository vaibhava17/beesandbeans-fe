const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");
const ejs = require("ejs");

app.set("port", process.env.PORT || 3001);

app.set("views", "build");
app.engine("html", ejs.renderFile);

app.use(compression());

app.use("/manifest.json", express.static(path.join(__dirname, "build", "manifest.json")));

app.get("/*", (req, res) => {
  res.render("index.html");
});

app.listen(app.get("port"), () => {
  console.log("Server running on port %s", app.get("port"));
});
