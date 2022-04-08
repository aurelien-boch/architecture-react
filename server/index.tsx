import React from "react";
import express from "express";
import App from "../src/App";
import ReactDOMServer from "react-dom/server";
import { Request, Response } from "express";
import { StaticRouter } from "react-router-dom/server";
import { readFileSync } from "fs";
import { resolve } from "path";

require("dotenv").config();

const PORT = process.env.PORT || 80;
const app = express();
const clientBuildDirectory = process.env.CLIENT_BUILD || "./build/client/";
const indexFile = resolve(clientBuildDirectory, "index.html");
const indexContent = readFileSync(indexFile, "utf8");

//TODO: implement a cache with a middleware
const preRenderServe = async (req: Request, res: Response) => {
    const renderedApp = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    return res.send(
        indexContent.replace(
            "<div id=\"root\"></div>",
            `<div id="root">${renderedApp}</div>`
        )
    );
};

//maybe do this in a cleaner way lol
app.get("/", preRenderServe);
app.use(express.static(clientBuildDirectory));
app.get("*", preRenderServe);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
