"use server";

import config from "../../../../config/config";

export const fetchNews = async (id) => {
  const { apiUrl } = config;
  console.log(`${apiUrl}/api/articles/shared-article/detail/${id}`);
  try {
    const news = await fetch(
      `${apiUrl}/api/articles/shared-article/detail/${id}`,
      {
        cache: "no-store",
      }
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
