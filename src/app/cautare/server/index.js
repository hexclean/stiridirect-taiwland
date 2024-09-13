"use server";
import config from "../../../../config/config";

export const fetchNews = async (title, page) => {
  const { apiUrl } = config;

  try {
    const news = await fetch(
      `${apiUrl}/api/articles/search/title?title=${title}&page=${page}`,
      { cache: "no-store" }
    );

    if (!news.ok) {
      throw new Error("One or more requests failed.");
    }

    const newsData = await news.json();

    const res = [
      {
        data: newsData,
      },
    ];

    return res;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};
