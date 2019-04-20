#!/usr/bin/env node

const open = require("open");
const qs = require("qs");
const path = require("path");
const finalhandler = require("finalhandler");
const http = require("http");
const serveStatic = require("serve-static");

const program = require("commander");
const { parse } = require("@open-rpc/schema-utils-js");

program
  .version(require("./get-version"))
  .usage("[options]")
  .option(
    "-s, --schema [schema]",
    "JSON string or a Path/Url pointing to an OpenRPC document"
  )
  .option(
    "-ui, --uiSchema [uiSchema]",
    "JSON string of an OpenRPC playground uiSchema"
  )
  .option("-p, --port [port]", "Port to run the static server on")
  .option(
    "--open [open]",
    "Open the resulting playground in your default browser"
  )
  .action(async clientName => {
    const schema = await parse(program.schema);
    let uiSchema = {};
    if (program.uiSchema) {
      uiSchema = JSON.parse(program.uiSchema);
    }

    // Serve up public/ftp folder
    const serve = serveStatic(path.resolve(__dirname, "../build"));

    // Create server
    const server = http.createServer(function onRequest(req, res) {
      serve(req, res, finalhandler(req, res));
    });

    const port = program.port || 3000;
    // Listen
    server.listen(port);
    const url = `http://localhost:${port}?${qs.stringify({ uiSchema, schema })}`;
    console.log(`Server listening on port: ${port}`);
    if (program.open) {
      open(url);
    }
  })
  .parse(process.argv);
