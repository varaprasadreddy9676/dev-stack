
import { getTroubleshootingIssues } from "./getIssues";
import { createTroubleshootingIssue } from "./createIssue";
import { updateTroubleshootingIssue } from "./updateIssue";
import { deleteTroubleshootingIssue } from "./deleteIssue";

export const troubleshootingService = {
  getTroubleshootingIssues,
  createTroubleshootingIssue,
  updateTroubleshootingIssue,
  deleteTroubleshootingIssue
};
