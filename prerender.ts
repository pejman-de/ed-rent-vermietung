import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  console.log("🚀 Starting static pre-rendering (SSG)...");

  // 1. Create a Vite dev server in SSR mode to load our React app on the fly
  // We load the main vite.config.ts to resolve aliases and plugins correctly
  const vite = await createServer({
    configFile: path.resolve(__dirname, "vite.config.ts"),
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const routes = [
      { path: "/", file: "index.html" },
      { path: "/impressum", file: "impressum/index.html" },
      { path: "/datenschutz", file: "datenschutz/index.html" },
    ];

    const distPath = path.resolve(__dirname, "dist/public");
    const templateHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

    for (const route of routes) {
      console.log(`Prerendering route: ${route.path}...`);

      // Load the SSR entry point
      const { render } = await vite.ssrLoadModule("/src/entry-ssr.tsx");
      
      // Render the app to an HTML string
      const appHtml = await render(route.path);

      // Inject the rendered HTML into our index.html template
      const html = templateHtml.replace(
        `<div id="root"></div>`,
        `<div id="root">${appHtml}</div>`
      );

      // Ensure directory exists and write file
      const targetFile = path.resolve(distPath, route.file);
      fs.mkdirSync(path.dirname(targetFile), { recursive: true });
      fs.writeFileSync(targetFile, html, "utf-8");
      console.log(`✅ Wrote static HTML to: ${targetFile}`);
    }

    console.log("🎉 Pre-rendering completed successfully!");
  } catch (error) {
    console.error("❌ Pre-rendering failed:", error);
    process.exit(1);
  } finally {
    await vite.close();
  }
}

prerender();
