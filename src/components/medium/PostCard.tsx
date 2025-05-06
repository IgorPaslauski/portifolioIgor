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
    image?: string;
}

const PostCard = ({ id, title, description, pubDate, categories, link, image }: PostProps) => {
    image = image || (import.meta.env.VITE_API_URL + "/post-placeholder.png");
    return (
        <Card key={id} className="card-hover dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
                <div className="mb-4">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto rounded-lg object-cover max-h-80 mx-auto"
                    />
                </div>
                <CardTitle>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {title}
                    </a>
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                    Publicado em {pubDate}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded"
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