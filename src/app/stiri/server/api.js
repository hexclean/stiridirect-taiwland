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

export const saveFilteredPortals = async (portal) => {
  const { apiUrl } = config;

  try {
    const response = await fetch(`${apiUrl}/api/analytics/filtered-portal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ portal }),
    });

    if (!response.ok) {
      throw new Error("Failed to save portals");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error saving portals:", error);
  }
};

export const saveFilteredTag = async (tag) => {
  const { apiUrl } = config;

  try {
    const response = await fetch(`${apiUrl}/api/analytics/filtered-tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });

    if (!response.ok) {
      throw new Error("Failed to save portals");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error saving portals:", error);
  }
};

export const savedArticle = async (id) => {
  const { apiUrl } = config;

  try {
    const response = await fetch(`${apiUrl}/api/analytics/clicked-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to save portals");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error saving portals:", error);
  }
};
