
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

const ProjectCardSkeleton = () => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-800 animate-pulse">
      <div className="h-48 w-full bg-gray-200"></div>
      <CardHeader>
        <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-14 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCardSkeleton;