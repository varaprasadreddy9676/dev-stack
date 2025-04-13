
import { projectCreateService } from "./projectCreateService";
import { projectRetrievalService } from "./projectRetrievalService";
import { projectUpdateService } from "./projectUpdateService";
import { projectDeleteService } from "./projectDeleteService";

// Combine all project services into one unified API
export const projectService = {
  ...projectCreateService,
  ...projectRetrievalService,
  ...projectUpdateService,
  ...projectDeleteService
};
