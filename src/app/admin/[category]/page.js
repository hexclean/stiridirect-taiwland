"use client";

import { useState, useEffect } from "react";
import { fetchNews } from "../server/api";
import { useRouter, useSearchParams } from "next/navigation";
import { convertDate } from "@/app/shared/convertPostedDate";

import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingText from "@/app/shared/LoadingText";

const Admin = ({ params }) => {
  const searchParams = useSearchParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTags, setActivetags] = useState([]);
  const [activePortals, setActivePortals] = useState([]);
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const router = useRouter();

  const fetchData = async () => {
    try {
      if (!page || isNaN(parseInt(page, 10))) {
        router.push(`/admin/${params.category}?page=1`);
        setCurrentPage(1);
      }
      setLoading(true);
      const queryParams = new URLSearchParams({
        tags: activeTags,
        portals: activePortals,
        titleSearch: "",
      }).toString();

      const res = await fetchNews(params.category, queryParams, currentPage);

      setNews(res[0].data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-16">
        <div className="grid gap-4">
          {loading ? (
            <LoadingText />
          ) : (
            <div className="">
              <div className="masonry-item p-2 rounded shadow-xl border border-sky-500 bg-white">
                <h2 className="font-poppins bg-[#e5e7eb] text-md text-center font-semibold py-1">
                  {news.length > 0
                    ? news[0].category
                    : "Nu există niciun rezultat"}
                </h2>
                <div className="mb-5 pt-4">
                  {news &&
                    news.map((i, idx) => (
                      <>
                        <span className="flex flex-col md:flex-row mb-4 bg-white rounded shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <div className="relative flex flex-col w-full hover:shadow-md transition-all cursor-pointer">
                            <div
                              className={`flex items-start ${
                                i.title.toLowerCase().includes("a murit") ||
                                i.title.toLowerCase().includes("rip")
                                  ? "bg-[#e4e4e7]"
                                  : ""
                              } rounded-sm`}
                            >
                              {i.image_url && (
                                <LazyLoadImage
                                  alt={i.title}
                                  src={i.image_url}
                                  className="object-cover w-[80px] h-[80px] mr-2"
                                  onError={(e) => {
                                    console.error(
                                      "Image failed to load:",
                                      e.target.src
                                    );
                                  }}
                                />
                              )}
                              <div className="flex-1">
                                <h5 className="font-poppins text-[15px] font-medium">
                                  {i.title
                                    .split(/(a murit)/i)
                                    .map((part, index) =>
                                      part.toLowerCase() === "a murit" ? (
                                        <span
                                          key={index}
                                          className="text-red-500 font-bold"
                                        >
                                          {part}
                                        </span>
                                      ) : (
                                        part
                                      )
                                    )}
                                </h5>
                                {i.description.length > 50 && (
                                  <p className="font-poppins text-[13px] font-light mt-2">
                                    {i.description.slice(0, 110)}...
                                  </p>
                                )}
                                <p className="font-poppins text-[13px] font-light pt-1">
                                  {i.portal} -{" "}
                                  <span className="font-medium">
                                    {convertDate(i.created_at)}
                                  </span>
                                </p>
                                {i.tags && i.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    {i.tags.map((tag, index) => (
                                      <p
                                        className="font-poppins text-[12px] font-medium border border-sky-500 px-1 py-0.5 rounded-sm"
                                        key={index}
                                      >
                                        #{tag.tag}
                                      </p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <hr className="border-none bg-sky-500 h-[1px] mt-2" />
                          </div>
                        </span>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 mb-4">
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Share to FB: {i.title}
                          </span>
                        </button>
                      </>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
