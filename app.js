
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const galleryRoutes = require("./routes/gallery.routes");
app.use("/", galleryRoutes);

const comunityRoutes = require("./routes/comunity.routes");
app.use("/", comunityRoutes);

const detailsRoutes = require("./routes/details.routes");
app.use("/", detailsRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/", adminRoutes);

const submitRoutes = require("./routes/submit.routes");
app.use("/", submitRoutes);

const submitedRoutes = require("./routes/submited.routes");
app.use("/", submitedRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);

const checkRoutes = require("./routes/check.routes");
app.use("/", checkRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
