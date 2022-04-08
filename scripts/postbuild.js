require("dotenv").config();
const fs = require("fs");
const path = require("path");
const clientBuildDirectory = process.env.CLIENT_BUILD || "build/client/";

try {
    const content = fs.readdirSync("build/").filter(e => e !== "server" || !fs.lstatSync(e).isDirectory());

    if (!fs.existsSync(clientBuildDirectory))
        fs.mkdirSync(clientBuildDirectory);
    content.forEach(e => fs.renameSync(path.resolve("build/", e), path.resolve(clientBuildDirectory, e)));
} catch (e) {
    console.error("An error occurred during the post-build step: ");
    console.error(e);
}
