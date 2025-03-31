
import React from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { FrameworkType } from "@/types/framework";

interface FrameworkItemProps {
  framework: FrameworkType;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const FrameworkItem: React.FC<FrameworkItemProps> = ({
  framework,
  index,
  onEdit,
  onDelete
}) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">{framework.name}</h3>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(index)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(index)}
          >
            <TrashIcon className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mt-1">{framework.description}</p>
      <p className="text-sm mt-2">
        {framework.examples.length} example{framework.examples.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default FrameworkItem;
