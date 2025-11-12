const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
};

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;

  if (filePath === "./") {
    filePath = "./experiment-0.6-real-network.html";
  }

  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(500);
        res.end("Server error: " + err.code);
      }
    } else {
      if (filePath.endsWith(".js")) {
        console.log(`[DELAY] ${filePath} - 인위적으로 1초 지연`);
        setTimeout(() => {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        }, 2000);
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`로컬 서버 실행 중: http://localhost:${PORT}`);
  console.log(`=================================\n`);
  console.log(`📝 JS 파일은 각각 1초씩 지연됩니다`);
  console.log(`   이를 통해 async/defer의 차이를 명확히 볼 수 있습니다\n`);
});
