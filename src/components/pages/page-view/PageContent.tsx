
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface PageContentProps {
  content: string;
}

export const PageContent = ({ content }: PageContentProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};
