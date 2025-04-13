
import { authService } from "./api/authService";
import { componentService } from "./api/componentService";
import { guideService } from "./api/guideService";
import { guidelinesService } from "./api/guidelinesService";
import { languageService } from "./api/languageService";
import { projectService } from "./api/projectService";
import { pageService } from "./api/pageService";
import { mockService } from "./mock/mockService";

// Select appropriate implementation based on environment
const useMock = import.meta.env.VITE_USE_MOCK === "true";

// Export the service factory
export const services = {
  auth: useMock ? mockService.auth : authService,
  components: useMock ? mockService.components : componentService,
  guides: useMock ? mockService.guides : guideService,
  guidelines: useMock ? mockService.guidelines : guidelinesService,
  languages: useMock ? mockService.languages : languageService,
  projects: useMock ? mockService.projects : projectService,
  pages: useMock ? mockService.pages : pageService,
};

// Export individual services directly
export { authService, componentService, guideService, guidelinesService, languageService, projectService, pageService };
