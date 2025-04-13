
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const usePageDataBase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleError = (err: unknown) => {
    const message = err instanceof Error ? err.message : "An error occurred";
    setError(message);
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    return message;
  };

  return {
    loading,
    setLoading,
    error,
    setError,
    toast,
    handleError
  };
};
