const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      '<html><form action="/create-user" method="POST"><input type="text" name="username"><button type ="submit">SEND</button></input></form></html>'
    );
    return res.end();
  }

  if (url === "/users") {
    res.write("<html><ul><li>User 1</li><li>User 2</li></ul></html>");
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

module.exports = requestHandler;
