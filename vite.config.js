import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import process from "process";

function saveUsersMiddleware() {
  return {
    name: "save-users-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === "POST" && req.url === "/api/saveUsers") {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            try {
              const users = JSON.parse(body);
              const dbPath = path.join(process.cwd(), "dbUsers.json");

              fs.writeFileSync(
                dbPath,
                JSON.stringify({ users }, null, 2),
                "utf-8"
              );

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  message: "Usuários salvos com sucesso!",
                })
              );
            } catch (error) {
              console.error("Erro ao salvar usuários:", error);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: error.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), saveUsersMiddleware()],
});
