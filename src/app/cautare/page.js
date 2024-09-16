"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { convertDate } from "../shared/convertPostedDate";
import Navbar from "../shared/navbar";
import LoadingText from "../shared/LoadingText";
import { fetchNews } from "./server";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ShareButton from "../shared/ShareButton";
import { savedArticle } from "../stiri/server/api";

import Link from "next/link";
const SearchedArticle = () => {
  // const location = useLocation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!page || isNaN(parseInt(page, 10))) {
        router.push(`/cautare?title=iohannis?page=1`);
        setCurrentPage(1);
      }
      setLoading(true);
      const res = await fetchNews(title, currentPage);

      setNews(res[0].data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, title, searchParams]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 grid gap-4 pt-3">
        {loading ? (
          <LoadingText />
        ) : (
          <div className="">
            <div className="masonry-item p-2 rounded shadow-xl border border-sky-500 bg-white">
              {news.length > 0 ? (
                <h2 className="font-poppins bg-[#e5e7eb] text-md text-center font-semibold py-1">
                  Rezultate pentru căutarea '{title}'
                </h2>
              ) : (
                <>
                  <h2 className="text-md text-center font-semibold py-1">
                    Nu există rezultate pentru căutarea '{title}'
                  </h2>
                  <div className="mt-5 mb-2 flex items-center justify-center gap-x-6">
                    <Link
                      href="/"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Mergeți la prima pagină
                    </Link>
                  </div>
                </>
              )}

              {news.length > 0 && (
                <div className="mb-5 pt-4">
                  {news &&
                    news.map((i, idx) => (
                      <div
                        key={i.id}
                        className="relative flex flex-col w-full transition-all cursor-pointer pt-2"
                      >
                        <Link
                          key={i.id}
                          href={i.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col md:flex-row mb-4 bg-white rounded transition-all cursor-pointer"
                          onClick={() => savedArticle(i.id)}
                        >
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
                                  .split(new RegExp(`(${title})`, "gi"))
                                  .map((part, index) => {
                                    const normalizedPart = part
                                      .normalize("NFD")
                                      .replace(/[\u0300-\u036f]/g, "")
                                      .toLowerCase();
                                    const normalizedTitle = title
                                      .normalize("NFD")
                                      .replace(/[\u0300-\u036f]/g, "")
                                      .toLowerCase();

                                    return normalizedPart ===
                                      normalizedTitle ? (
                                      <span
                                        key={index}
                                        className="pl-0.5 pr-0.5 bg-sky-100 text-black border border-blue-200 rounded font-semibold"
                                      >
                                        {part}
                                      </span>
                                    ) : (
                                      part
                                    );
                                  })}
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
                        </Link>
                        <ShareButton id={i.id} />
                        <hr className="border-none bg-sky-500 h-[1px] mt-2" />
                      </div>
                    ))}
                </div>
              )}
            </div>
            {news.length > 0 && (
              <div className="flex flex-col items-center font-poppins mb-5 pt-1">
                <span className="text-sm text-gray-800 pb-1">
                  Pagina curentă:
                  <span className="font-semibold"> {page}</span>
                </span>
                <div className="inline-flex mt-2 xs:mt-0 gap-5">
                  <button
                    onClick={() => {
                      let prevPage = currentPage;
                      prevPage = currentPage - 1;
                      if (prevPage >= 1) {
                        setCurrentPage(prevPage);
                        router.push(`/cautare?title=${title}&page=${prevPage}`);
                      }
                    }}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-800 bg-white border border-sky-500 rounded-s hover:bg-gray-100 dark:bg-white dark:border-sky-500 dark:text-gray-800 dark:hover:bg-gray-100"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Pagina anterioară
                  </button>
                  {page > 1 && (
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        router.push(`/cautare?title=${title}&page=1`);
                      }}
                      className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-800 bg-white border border-sky-500 rounded hover:bg-gray-100 dark:bg-white dark:border-sky-500 dark:text-gray-800 dark:hover:bg-gray-100"
                    >
                      Pagina 1
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const nextPage = currentPage + 1;
                      setCurrentPage(nextPage);
                      router.push(`/cautare?title=${title}&page=${nextPage}`);
                    }}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-800 bg-white border border-sky-500 rounded-s hover:bg-gray-100 dark:bg-white dark:border-sky-500 dark:text-gray-800 dark:hover:bg-gray-100"
                  >
                    Pagina următoare
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchedArticle;
