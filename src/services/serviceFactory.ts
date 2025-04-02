
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

import { API_CONFIG } from "@/config/config";

// Use the centralized config to determine if mock data should be used
const useMockData = API_CONFIG.USE_MOCK_DATA;

// Export the appropriate services based on configuration
export const projectService = useMockData ? mockProjectService : realProjectService;
export const languageService = useMockData ? mockLanguageService : realLanguageService;
export const componentService = useMockData ? mockComponentService : realComponentService;
export const guideService = useMockData ? mockGuideService : realGuideService;
