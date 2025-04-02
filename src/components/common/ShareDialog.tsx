
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share, Copy, Check, Mail, Twitter, Linkedin, Link2 } from "lucide-react";
import { APP_CONFIG } from '@/config/config';
import { toast } from '@/hooks/use-toast';

interface ShareDialogProps {
  title: string;
  type: string;
  id: string;
  path: string;
  description?: string;
  children?: React.ReactNode;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ 
  title, 
  type, 
  id, 
  path, 
  description = "Share this with your team or colleagues.", 
  children 
}) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${APP_CONFIG.SHARE_BASE_URL}${path}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Link has been copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this ${type}: ${title}`);
    const body = encodeURIComponent(`I thought you might be interested in this ${type}:\n\n${title}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };
  
  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out this ${type}: ${title} ${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };
  
  const handleLinkedinShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {type}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="font-mono text-sm"
            />
          </div>
          <Button size="sm" onClick={handleCopy} className="px-3">
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={handleEmailShare}
            title="Share via Email"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={handleTwitterShare}
            title="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={handleLinkedinShare}
            title="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={handleCopy}
            title="Copy Link"
          >
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
