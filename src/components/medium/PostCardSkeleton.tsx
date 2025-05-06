import { Card, CardHeader, CardContent } from "../ui/card";

const PostCardSkeleton = () => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-800 animate-pulse">
            <CardHeader>
                <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="flex flex-wrap gap-2">
                        {[1, 2].map((_, index) => (
                            <div
                                key={index}
                                className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"
                            ></div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PostCardSkeleton;