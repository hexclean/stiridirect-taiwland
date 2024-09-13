import { fetchNews } from "../server/index";
import SharedArticleClient from "./SharedArticleClient";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./SharedArticleClient"), { ssr: false });

export async function generateMetadata({ params }) {
  const data = await fetchNews(params.id);
  const article = data[0].data[0];

  return {
    title: article ? article.title : "Loading...",
    description: article ? article.description : "Loading...",
    openGraph: {
      title: article ? article.title : "Loading...",
      description: article ? article.description : "Loading...",
      images: [article ? article.image_url : "/default-image.jpg"],
      url: `https://stiridirect.ro/shared-article/${params.id}`,
      type: "article",
    },
  };
}

export default async function SharedArticlePage({ params }) {
  return (
    <div>
      <SharedArticleClient params={params} />
    </div>
  );
}
