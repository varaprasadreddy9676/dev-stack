
import { projectBasicService } from "./projectBasicService";
import { troubleshootingService } from "./troubleshootingService";

// Export a combined service
export const projectService = {
  ...projectBasicService,
  ...troubleshootingService
};
