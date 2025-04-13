
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProjectExplorer from "./pages/ProjectExplorer";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectManagement from "./pages/ProjectManagement";
import NewProject from "./pages/NewProject";
import Components from "./pages/Components";
import CodingGuidelines from "./pages/CodingGuidelines";
import LanguageGuidelines from "./pages/LanguageGuidelines";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserManagement from "./pages/UserManagement";
import { AuthProvider } from "./contexts/auth";
import Pages from "./pages/Pages";
import NewPage from "./pages/NewPage";
import EditPage from "./pages/EditPage";
import PageDetail from "./pages/PageDetail";

// Create a client with production-ready defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Development flag - set to true to skip authentication during development
const SKIP_AUTH_FOR_DEV = true;

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider delayDuration={isMobile() ? 500 : 300}>
            <Toaster />
            <Sonner position="top-right" closeButton richColors 
                   className="toaster-mobile sm:toaster-desktop" />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected routes within MainLayout */}
                {SKIP_AUTH_FOR_DEV ? (
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="projects" element={<ProjectExplorer />} />
                    <Route path="projects/new" element={<NewProject />} />
                    <Route path="projects/:id" element={<ProjectDetail />} />
                    <Route path="projects/:id/edit" element={<ProjectManagement />} />
                    <Route path="components" element={<Components />} />
                    <Route path="guidelines" element={<CodingGuidelines />} />
                    <Route path="guidelines/:id" element={<LanguageGuidelines />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="pages" element={<Pages />} />
                    <Route path="pages/create" element={<NewPage />} />
                    <Route path="pages/:id" element={<PageDetail />} />
                    <Route path="pages/:id/edit" element={<EditPage />} />
                    <Route path="projects/:id/new-page" element={<NewPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                ) : (
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="projects" element={<ProjectExplorer />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="settings" element={<Settings />} />
                      
                      <Route element={<ProtectedRoute allowedRoles={["admin", "content_manager"]} />}>
                        <Route path="projects/new" element={<NewProject />} />
                        <Route path="projects/:id/edit" element={<ProjectManagement />} />
                      </Route>
                      
                      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                        <Route path="users" element={<UserManagement />} />
                      </Route>
                      
                      <Route path="projects/:id" element={<ProjectDetail />} />
                      <Route path="components" element={<Components />} />
                      <Route path="guidelines" element={<CodingGuidelines />} />
                      <Route path="guidelines/:id" element={<LanguageGuidelines />} />
                      <Route path="search" element={<SearchResults />} />
                      
                      <Route path="pages" element={<Pages />} />
                      <Route path="pages/create" element={<NewPage />} />
                      <Route path="pages/:id" element={<PageDetail />} />
                      <Route path="pages/:id/edit" element={<EditPage />} />
                      <Route path="projects/:id/new-page" element={<NewPage />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Route>
                )}
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Helper function for mobile detection
function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

export default App;
