import { Card, CardContent, CardHeader } from "../ui/card";

export const CertificationCardSkeleton = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-800 animate-pulse">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-2">
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
