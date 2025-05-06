import { useState, useEffect } from 'react';
import { parseStringPromise } from 'xml2js';

export default function MediumPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const proxyUrl = 'https://api.allorigins.win/raw?url=';
                const feedUrl = 'https://medium.com/feed/@igor.pedroso123';
                const response = await fetch(`${proxyUrl}${encodeURIComponent(feedUrl)}`);
                const xmlText = await response.text();
                const parsedData = await parseStringPromise(xmlText);
                const items = parsedData.rss.channel[0].item || [];

                const formattedPosts = items.map(item => ({
                    title: item.title[0],
                    link: item.link[0],
                    pubDate: new Date(item.pubDate[0]).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    categories: item.category || [],
                    content: item['content:encoded'][0]
                        .replace(/<[^>]+>/g, '')
                        .slice(0, 200) + '...'
                }));

                setPosts(formattedPosts);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch or parse posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="text-center py-8">Loading posts...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Stories by Igor Paslauski Pedroso de Oliveira
            </h1>
            <div className="space-y-6">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-2xl font-semibold mb-2">
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {post.title}
                            </a>
                        </h2>
                        <p className="text-gray-500 mb-2">Published on {post.pubDate}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {post.categories.map((category, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-700">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}