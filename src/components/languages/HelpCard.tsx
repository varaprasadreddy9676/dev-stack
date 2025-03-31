
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HelpCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Guidelines define how we write code across the organization. They help maintain consistency and quality.
        </p>
        <p className="text-sm text-muted-foreground">
          Contact your team lead if you have questions about implementing these guidelines.
        </p>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
