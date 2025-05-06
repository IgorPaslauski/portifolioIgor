import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  
  export interface PostProps {
    id: string;
    title: string;
    description: string;
    pubDate: string;
    categories: string[];
    link: string;
  }
  
  const PostCard = ({ id, title, description, pubDate, categories, link }: PostProps) => {
    return (
      <Card key={id} className="card-hover">
        <CardHeader>
          <CardTitle>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {title}
            </a>
          </CardTitle>
          <CardDescription>Published on {pubDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">{description}</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default PostCard;