
import { useState, useEffect } from "react";
import { LanguageData } from "@/types/language";
import { toast } from "sonner";
import { guidelinesService } from "@/services/api/guidelinesService";

export const useLanguageData = (languageId: string | undefined) => {
  const [language, setLanguage] = useState<LanguageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getLanguageData = async () => {
      if (!languageId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await guidelinesService.getLanguageById(languageId);
        setLanguage(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to fetch language data");
        setError(error);
        toast.error("Failed to load language data");
        console.error("Language data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    getLanguageData();
  }, [languageId]);

  const saveGuidelinesContent = async (updatedContent: string) => {
    if (!language || !languageId) return false;

    try {
      // Create updated language object
      const updatedLanguage = {
        ...language,
        guidelines: {
          ...language.guidelines,
          content: updatedContent,
          lastUpdated: new Date()
        }
      };
      
      // Update the language via API
      await guidelinesService.updateLanguage(languageId, updatedLanguage);
      
      // Update local state
      setLanguage(updatedLanguage);
      
      toast.success("Guidelines updated successfully");
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update guidelines";
      toast.error(errorMessage);
      console.error("Guidelines update error:", err);
      return false;
    }
  };

  return {
    language,
    loading,
    error,
    saveGuidelinesContent
  };
};
