import { Card, CardHeader, CardContent } from "../ui/card";

const SkillCardSkeleton = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-800 animate-pulse">
      <CardHeader>
        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mt-2"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCardSkeleton;
