const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const compression = require("compression");

app.use(compression());
app.use(express.static(__dirname + "/public"));

app.get("/battery", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/battery.html`));
});

app.get("/samenwerken", (req, res) => {
  https.get(
    "https://www.cmd-amsterdam.nl/wp-json/wp/v2/pages/758",
    response => {
      res.sendFile(path.join(`${__dirname}/public/index.html`));

      let data = "";

      response.on("data", buffer => (data += buffer));

      response.on("end", () => {
        const html = JSON.parse(data).content.rendered;
        const rx = /\[.+\]/g;
        let tst = html.replace(rx, "");

        // Selects all the: [full-width] bs
        const rx1 = /\[.+\]/g;

        // Selects all white spaces
        const rx2 = /(?<=\>)[\t\n\r\s]+(?=\<)/g;

        // Selects all the useful tags
        const rx3 = /\<(p|a|form|button|h[1-6]).+?\1\>|\<img.+?\/?\>|(?<=(div|span).+\>).[^\<\>]+(?=\<\/(div|span))/g;

        //Remove empty stuff
        const rx4 = /<(\w+)(?:\s+\w+="[^"]+(?:"\$[^"]+"[^"]+)?")*>\s*<\/\1>/g;

        const normalHtml = html.replace(rx1, "");
        const minifiedHtml = normalHtml.replace(rx2, "");

        const temp = [];
        let result;

        while ((result = rx3.exec(minifiedHtml)) !== null) {
          temp.push(result[0]);
        }

        let temp2 = temp.join("");
        let actual = temp2.replace(rx4, "");
        let body = actual.replace(rx4, "");
        let head = "<head></head>";
        let total = head + body;

        fs.writeFile("public/index.html", total, err => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
      });
    }
  );
});

app.listen(port, () => console.log(`Listening to port: ${port}`));
