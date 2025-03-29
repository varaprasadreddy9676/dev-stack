
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProjectExplorer from "./pages/ProjectExplorer";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectManagement from "./pages/ProjectManagement";
import Components from "./pages/Components";
import CodingGuidelines from "./pages/CodingGuidelines";
import LanguageGuidelines from "./pages/LanguageGuidelines";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectExplorer />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="projects/:id/edit" element={<ProjectManagement />} />
              <Route path="components" element={<Components />} />
              <Route path="guidelines" element={<CodingGuidelines />} />
              <Route path="guidelines/:id" element={<LanguageGuidelines />} />
              <Route path="search" element={<SearchResults />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
