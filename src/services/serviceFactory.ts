
import { projectService as realProjectService } from "./api/projectService";
import { languageService as realLanguageService } from "./api/languageService";
import { componentService as realComponentService } from "./api/componentService";
import { guideService as realGuideService } from "./api/guideService";

import { 
  mockProjectService, 
  mockLanguageService, 
  mockComponentService, 
  mockGuideService 
} from "./mock/mockService";

// Check if we should use mock data
// This can be controlled via environment variable or other configuration
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true" || true; // Default to true for development

// Export the appropriate services based on configuration
export const projectService = useMockData ? mockProjectService : realProjectService;
export const languageService = useMockData ? mockLanguageService : realLanguageService;
export const componentService = useMockData ? mockComponentService : realComponentService;
export const guideService = useMockData ? mockGuideService : realGuideService;
