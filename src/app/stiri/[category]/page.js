"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { convertDate } from "@/app/shared/convertPostedDate";
import { fetchNews } from "../server/api";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingText from "@/app/shared/LoadingText";
import Loading from "@/app/shared/Loading";
import Navbar from "@/app/shared/navbar";
import ShareButton from "@/app/shared/ShareButton";

const CategoryDetail = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [portals, setPortals] = useState([]);
  const [tags, setTags] = useState([]);
  // const [topNews, setTopNews] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [portalFilter, setPortalFilter] = useState(true);
  const [tagFilter, setTagFilter] = useState(true);

  const openPortalFilter = () => setPortalFilter(!portalFilter);
  const openTagFilter = () => setTagFilter(!tagFilter);

  //Filter
  const [activeTags, setActivetags] = useState([]);
  const [activePortals, setActivePortals] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  const [finalFilterData, setFinalFilterData] = useState([]);

  const fetchData = async () => {
    try {
      if (!page || isNaN(parseInt(page, 10))) {
        router.push(`/stiri/${params.category}?page=1`);
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
      // setTopNews(res[0].topnews[0].data);
      setPortals(res[0].portals.portals);
      setTags(res[0].tags.tags[0].Tags);
      // console.log(res[0].tags.tags[0].Tags);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [finalFilterData, currentPage]);

  const filterTag = (type, id) => {
    if (type === "tag") {
      const updatedTags = activeTags.includes(id)
        ? activeTags.filter((tagId) => tagId !== id)
        : [...activeTags, id];

      setActivetags(updatedTags);
    } else if (type === "portals") {
      const updatedPortals = activePortals.includes(id)
        ? activePortals.filter((portalId) => portalId !== id)
        : [...activePortals, id];

      setActivePortals(updatedPortals);
    }
    setFilterData();
    setCurrentPage(1);
  };

  const setFilterData = () => {
    setFinalFilterData((prevFilterData) => ({
      ...prevFilterData,
      tags: activeTags,
      portals: activePortals,
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;

      if (isMobile == true) {
        setPortalFilter(false);
        setTagFilter(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-[0.8fr,2fr,1.5fr] gap-4 pt-3"> */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[0.7fr,2.5fr,0.5fr] gap-4 pt-4 px-4">
        <div className="grid gap-4">
          <div>
            <div className="bg-white pl-3 pt-4 rounded-sm shadow-xl border border-sky-500">
              {loading && portals !== undefined ? null : (
                <span
                  className="flex justify-between cursor-pointer"
                  onClick={openPortalFilter}
                >
                  <h3 className="font-poppins text-sm font-semibold mb-4">
                    Căutare după portal
                  </h3>
                  {portalFilter == true ? (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 30 30"
                    >
                      <path
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 9-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 30 30"
                    >
                      <path
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 15 7-7 7 7"
                      />
                    </svg>
                  )}
                </span>
              )}
              {portalFilter == true && (
                <ul className="text-sm">
                  {loading && portals !== undefined ? (
                    <Loading />
                  ) : (
                    portals.map((i) => {
                      const isChecked = activePortals.includes(i.id);
                      return (
                        <li className="mb-2" key={i.id}>
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              className="form-checkbox text-blue-600"
                              onChange={() => filterTag("portals", i.id)}
                            />
                            <span className="ml-2">{i.portal}</span>
                          </label>
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
            {loading && tags !== undefined ? null : tags.length > 0 ? (
              <div className="bg-white pl-3 pt-4 rounded-b-sm shadow-xl border border-sky-500 border-t-0">
                <span
                  className="flex justify-between cursor-pointer"
                  onClick={openTagFilter}
                >
                  <h3 className="font-poppins text-sm font-semibold mb-4">
                    Căutare după tag
                  </h3>
                  {tagFilter == true ? (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 30 30"
                    >
                      <path
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 9-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 30 30"
                    >
                      <path
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 15 7-7 7 7"
                      />
                    </svg>
                  )}
                </span>
                {tagFilter == true && (
                  <ul className="text-sm">
                    {loading ? (
                      <Loading />
                    ) : (
                      tags.map((i) => {
                        const isChecked = activeTags.includes(i.id);
                        return (
                          <li className="mb-2" key={i.id}>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                className="form-checkbox text-blue-600"
                                onChange={() => filterTag("tag", i.id)}
                              />
                              <span className="ml-2">{i.display_name}</span>
                            </label>
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </div>
            ) : null}
          </div>
        </div>
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
                        </Link>
                        <ShareButton id={i.id} />
                        <hr className="border-none bg-sky-500 h-[1px] mt-2" />
                      </div>
                    ))}
                </div>
              </div>

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
                        router.push(
                          `/stiri/${params.category}?page=${prevPage}`
                        );
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
                        router.push(`/stiri/${params.category}?page=${1}`);
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
                      router.push(`/stiri/${params.category}?page=${nextPage}`);
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
            </div>
          )}
        </div>
        {/* <div className="grid gap-4">
          <div>
            <div className="p-2 rounded shadow-xl border border-sky-500 bg-white">
              <h2 className="font-poppins bg-[#e5e7eb] text-md text-center font-semibold py-1 mb-4">
                Știri din ultima oră
              </h2>
              {loading == true && topNews != undefined ? (
                <Loading />
              ) : (
                topNews.map((i) => {
                  return (
                    <a
                      key={i.id}
                      href={i.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col md:flex-row mb-4 bg-white rounded shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div
                        key={i.id}
                        className="relative flex flex-col w-full hover:shadow-md transition-all cursor-pointer"
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
                            <img
                              src={i.image_url}
                              alt={i.title}
                              className="object-cover w-[80px] h-[80px] mr-2"
                            />
                          )}
                          <div className="flex-1">
                            <h5 className="font-poppins text-[15px] font-medium">
                              {i.title.split(/(a murit)/i).map((part, index) =>
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
                    </a>
                  );
                })
              )}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CategoryDetail;
