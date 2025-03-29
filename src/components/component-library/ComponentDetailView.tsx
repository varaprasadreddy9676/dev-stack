
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ComponentPreview } from "@/components/ComponentPreview";

interface ComponentDetailViewProps {
  component: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentVariant: number;
  onVariantChange: (variant: number) => void;
  onEdit: (component: any) => void;
  formatDate: (dateString: string) => string;
}

const ComponentDetailView = ({
  component,
  isOpen,
  onOpenChange,
  currentVariant,
  onVariantChange,
  onEdit,
  formatDate
}: ComponentDetailViewProps) => {
  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {component.name}
            <Badge className="ml-2">
              {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
            </Badge>
          </DialogTitle>
          <DialogDescription>{component.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Usage Guidelines</h3>
            <p className="text-sm text-muted-foreground">{component.usage}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Last Updated</h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(component.updatedAt)}
            </p>
          </div>
          
          <ComponentPreview 
            name={component.name}
            variants={component.variants}
            currentVariant={currentVariant}
            onVariantChange={onVariantChange}
          />
        </div>
        
        <DialogFooter>
          <Button onClick={() => onEdit(component)}>Edit Component</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentDetailView;
