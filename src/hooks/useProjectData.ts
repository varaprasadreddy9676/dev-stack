
import { useState, useEffect } from 'react';
import { projectService } from '@/services/serviceFactory';
import { ProjectData } from '@/types/project';
import { toast } from 'sonner';

export interface ProjectDataHookResult {
  project: ProjectData | null;
  loading: boolean;
  error: Error | null;
  saveProject: (updatedData: Partial<ProjectData>) => Promise<ProjectData | void>;
}

export const useProjectData = (projectId: string | undefined): ProjectDataHookResult => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching project with ID: ${projectId}`);
        const data = await projectService.getProjectById(projectId);
        console.log(`Project data received:`, data);
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err instanceof Error ? err : new Error('Failed to fetch project'));
        toast.error("Failed to load project. Please try again later.");
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const saveProject = async (updatedData: Partial<ProjectData>) => {
    if (!project || !projectId) return;
    
    try {
      const updatedProject = await projectService.updateProject(projectId, updatedData);
      setProject(updatedProject);
      return updatedProject;
    } catch (err) {
      console.error("Error saving project:", err);
      setError(err instanceof Error ? err : new Error('Failed to save project'));
      throw err;
    }
  };

  return { project, loading, error, saveProject };
};
