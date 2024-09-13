"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { convertDate } from "@/app/shared/convertPostedDate";
import { fetchNews } from "../server/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingText from "@/app/shared/LoadingText";
import Navbar from "@/app/shared/navbar";
import toast from "@/app/shared/toast";
import Link from "next/link";

const SharedArticleClient = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchNews(params.id);
      setData(res[0].data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data && !toastShown) {
      toast(
        "info",
        "Redirecționarea către pagina articolului original în termen de 1 secunde",
        "top-center",
        1000
      );
      setToastShown(true);
    }
    if (loading == false) {
      setTimeout(() => {
        if (data) {
          router.push(data.link);
        }
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 grid gap-4 pt-3">
        <div className="grid gap-4">
          {loading ? (
            <LoadingText />
          ) : data ? (
            <div className="masonry-item p-2 rounded shadow-xl border border-sky-500 bg-white">
              <div className="pt-4">
                <Link key={data.id} href={data.link} target="_blank">
                  <div className="relative flex flex-col w-full hover:shadow-md transition-all cursor-pointer">
                    <div
                      className={`flex items-start ${
                        data.title.toLowerCase().includes("a murit") ||
                        data.title.toLowerCase().includes("rip")
                          ? "bg-[#e4e4e7]"
                          : ""
                      } rounded-sm`}
                    >
                      {data.image_url && (
                        <LazyLoadImage
                          alt={data.title}
                          src={data.image_url}
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
                          {data.title.split(/(a murit)/i).map((part, index) =>
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
                        {data.description.length > 50 && (
                          <p className="font-poppins text-[13px] font-light mt-2">
                            {data.description.slice(0, 110)}...
                          </p>
                        )}
                        <p className="font-poppins text-[13px] font-light pt-1">
                          {data.portal} -{" "}
                          <span className="font-medium">
                            {convertDate(data.created_at)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SharedArticleClient;
