import { Card, CardHeader, CardContent } from "../ui/card";

const ExperienceCardSkeleton = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-800 animate-pulse">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2">
            <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-200 rounded"></div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </li>
              <li>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </li>
              <li>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-14 bg-gray-200 rounded"></div>
            <div className="h-6 w-18 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCardSkeleton;
