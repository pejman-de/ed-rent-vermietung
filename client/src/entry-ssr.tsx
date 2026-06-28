import React from "react";
import ReactDOMServer from "react-dom/server";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import { Router, Route, Switch } from "wouter";
// Custom memory location hook for wouter v3 SSR
const createMemoryHook = (initialPath: string) => {
  return () => {
    const navigate = (to: string) => {};
    return [initialPath, navigate] as [string, typeof navigate];
  };
};

// Custom router setup for SSR using memory location hook
function SSRRouter({ path }: { path: string }) {
  const memoryHook = React.useMemo(() => createMemoryHook(path), [path]);
  return (
    <Router hook={memoryHook}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export function render(path: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SSRRouter path={path} />
        </TooltipProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
