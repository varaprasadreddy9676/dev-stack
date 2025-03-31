
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LanguageNotFound = () => {
  return (
    <div className="container py-10">
      <Button variant="ghost" size="sm" className="-ml-2 mb-4" asChild>
        <Link to="/guidelines">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Guidelines
        </Link>
      </Button>
      <h1 className="text-2xl font-bold mb-4">Language Not Found</h1>
      <p>The requested language guidelines could not be found.</p>
    </div>
  );
};

export default LanguageNotFound;
