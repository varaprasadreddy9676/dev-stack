
import { projectService as projectBasicService } from "./project";
import { troubleshootingService } from "./troubleshootingService";

// Export a combined service
export const projectService = {
  ...projectBasicService,
  ...troubleshootingService
};
