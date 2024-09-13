"use server";
import config from "../../../../config/config";

export const fetchNews = async (category, query, page) => {
  const { apiUrl } = config;

  try {
    const news = await fetch(
      `${apiUrl}/api/articles/${category}?${query}&page=${page}`,
      { cache: "no-store" }
    );

    const tags = await fetch(`${apiUrl}/api/tags/${category}`, {
      cache: "no-store",
    });
    const portals = await fetch(`${apiUrl}/api/portals/${category}`, {
      cache: "no-store",
    });

    if (!news.ok || !tags.ok || !portals.ok) {
      throw new Error("One or more requests failed.");
    }

    const newsData = await news.json();
    const tagsData = await tags.json();
    // const topnewsData = await topnews.json();
    const portalsData = await portals.json();

    const res = [
      {
        data: newsData,
        tags: tagsData,
        // topnews: topnewsData,
        portals: portalsData,
      },
    ];

    return res;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};
