
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ComponentPreview } from "@/components/ComponentPreview";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ComponentForm, { ComponentFormValues } from "./ComponentForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  if (!component) return null;

  const handleSaveEdit = (data: ComponentFormValues) => {
    const updatedComponent = {
      ...component,
      name: data.name,
      description: data.description,
      variants: parseInt(data.variants),
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
      updatedAt: new Date().toISOString()
    };
    
    onEdit(updatedComponent);
    setIsEditDialogOpen(false);
  };

  const content = (
    <ScrollArea className="max-h-[75vh]">
      <div className="space-y-4 py-1 px-1">
        <div>
          <h3 className="text-sm font-medium mb-1">Tags</h3>
          <div className="flex flex-wrap gap-1">
            {component.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Usage Guidelines</h3>
          <p className="text-sm text-muted-foreground">{component.usage}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Last Updated</h3>
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
    </ScrollArea>
  );

  const dialogFooter = (
    <DialogFooter>
      <Button onClick={() => setIsEditDialogOpen(true)}>Edit Component</Button>
    </DialogFooter>
  );

  if (isMobile) {
    return (
      <>
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent className="px-3 pt-2 max-h-[85vh]">
            <DrawerHeader className="px-0 pt-0 pb-3">
              <DrawerTitle className="flex justify-between items-center text-lg">
                {component.name}
                <Badge className="ml-2 text-xs">
                  {component.variants} {component.variants === 1 ? 'variant' : 'variants'}
                </Badge>
              </DrawerTitle>
              <DrawerDescription className="text-sm">{component.description}</DrawerDescription>
            </DrawerHeader>
            {content}
            <DrawerFooter className="px-0 pt-2 pb-4">
              <Button onClick={() => setIsEditDialogOpen(true)}>Edit Component</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        
        <ComponentForm 
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleSaveEdit}
          initialValues={{
            name: component.name,
            description: component.description,
            variants: component.variants.toString(),
            tags: component.tags.join(", ")
          }}
        />
      </>
    );
  }

  return (
    <>
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
          
          {content}
          
          {dialogFooter}
        </DialogContent>
      </Dialog>
      
      <ComponentForm 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleSaveEdit}
        initialValues={{
          name: component.name,
          description: component.description,
          variants: component.variants.toString(),
          tags: component.tags.join(", ")
        }}
      />
    </>
  );
};

export default ComponentDetailView;
