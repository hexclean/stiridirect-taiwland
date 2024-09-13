"use client";
import { useState, useEffect } from "react";
import { convertDate } from "./shared/convertPostedDate";
import Link from "next/link";
import config from "../../config/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Navbar from "./shared/navbar";
import LoadingText from "./shared/LoadingText";
import ShareButton from "./shared/ShareButton";
import Stories from "stories-react";
import "stories-react/dist/index.css";

function Head(props) {
  return (
    <div
      style={{
        // padding: "15px",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: "14px",
          marginLeft: "12px",
        }}
      >
        <p
          style={{
            color: "white",
            fontWeight: "400",
            fontSize: "14px",
            margin: 0,
            marginLeft: "12px",
          }}
        >
          {props.name} - {`${props.time} hours ago`}
        </p>
      </div>
    </div>
  );
}

function FinalComp(props) {
  return (
    <div
      className="box"
      style={{
        height: "100%",
        backgroundImage: `url('${props.story.imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Középre igazítja a tartalmat
        alignItems: "center",
        padding: "5px",
        textAlign: "center", // Szövegek középre igazítása
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "5px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "16px",
            margin: 0,
          }}
        >
          {props.story.title}
        </p>
      </div>

      <button
        onClick={() => window.open(props.story.link, "_blank")}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "5px",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: "2",
        }}
        className="font-medium text-white text-[14px] text-center"
      >
        <span className="flex items-center">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white pr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
            />
          </svg>
          TOVÁBBI INFORMÁCIÓ
        </span>
      </button>
    </div>
  );
}

const stories = [
  {
    type: "component",
    imageUrl:
      "https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTA4dHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMjQl/MkYwOSUyRjEzJTJGMjA3NDAwNV8yMDc0/MDA1X2dlb2FuYS1iYXNlLmpwZyZoYXNo/PTU1NTQzZWIxYzlmMGRjZGUwZTNhYTMxNWE0YWQ4M2Y1.jpg",
    link: "https://www.mediafax.ro/politic/ciuca-refuza-sa-spuna-pe-cine-ar-vrea-premier-daca-ar-castiga-dar-in-mentioneaza-pe-bolojan-22485140",
    duration: 6000,
    title: `Scandal Geoană-Băsescu: „E într-o zonă de degradare biologică”/ „Se pregătește pentru a doua „Mihaela, dragostea mea””`,
    component: FinalComp,
    header: (
      <Head
        name="Realitatea.net"
        url="https://www.mediafax.ro/externe/alegeri-prezidentiale-in-sua-donald-trump-refuza-o-noua-dezbatere-cu-kamala-harris-22485150"
        time="4"
      />
    ),
  },
  {
    type: "component",
    imageUrl:
      "//storage0.dms.mpinteractiv.ro/media/1/1/3614/22485150/1/kamala-harris-donald-trump.png",
    link: "https://www.mediafax.ro/politic/ciuca-refuza-sa-spuna-pe-cine-ar-vrea-premier-daca-ar-castiga-dar-in-mentioneaza-pe-bolojan-22485140",
    duration: 6000,
    title: `Alegeri prezidenţiale în SUA: Donald Trump refuză o nouă dezbatere cu Kamala Harris`,
    component: FinalComp,
    header: (
      <Head
        name="Realitatea.net"
        url="https://www.mediafax.ro/externe/alegeri-prezidentiale-in-sua-donald-trump-refuza-o-noua-dezbatere-cu-kamala-harris-22485150"
        time="4"
      />
    ),
  },
  {
    type: "component",
    imageUrl:
      "//storage0.dms.mpinteractiv.ro/media/1/1/1687/22485140/1/7944251-mediafax-foto-alexandru-dobre.jpg",
    link: "https://www.mediafax.ro/politic/ciuca-refuza-sa-spuna-pe-cine-ar-vrea-premier-daca-ar-castiga-dar-in-mentioneaza-pe-bolojan-22485140",
    duration: 6000,
    title: `Ciucă refuză să spună pe cine ar vrea premier, dacă ar câştiga, dar în menţionează pe Bolojan`,
    component: FinalComp,
    header: (
      <Head
        name="Realitatea.net"
        url="https://www.w3schools.com/howto/img_avatar.png"
        time="4"
      />
    ),
  },
  {
    type: "component",
    imageUrl:
      "https://tb.ziareromania.ro/Ciuc---parc---s-ar-dezice-de-PSD---Alian--a-cu-ei--un-moment-greu-de---n--eles---i-greu-de-explicat-/e6a8456a1b3f005584/400/225/2/100/Ciuc---parc---s-ar-dezice-de-PSD---Alian--a-cu-ei--un-moment-greu-de---n--eles---i-greu-de-explicat-.jpg",
    link: "https://ziare.com/alegeri-prezidentiale-2024/ciuca-dezice-alianta-psd-pnl-1893673",
    duration: 6000,
    title: `Ciucă parcă s-ar dezice de PSD. "Alianța cu ei, un moment greu de înţeles şi greu de explicat"`,
    component: FinalComp,
    header: (
      <Head
        name="Realitatea.net"
        url="https://www.w3schools.com/howto/img_avatar.png"
        time="4"
      />
    ),
  },
  {
    type: "component",
    imageUrl:
      "https://ivm.antenaplay.ro/thumbs/observatornews/2024/09/12/NyfnaUQRvFl_3O.jpg",
    link: "https://ziare.com/alegeri-prezidentiale-2024/ciuca-dezice-alianta-psd-pnl-1893673",
    duration: 6000,
    title: `Alfred Bulai a scăpat de arestul preventiv, după ce susţine că şi-a văzut studentele goale din întâmplare. "Nu mă aşteptam"`,
    component: FinalComp,
    header: (
      <Head
        name="Realitatea.net"
        url="https://www.w3schools.com/howto/img_avatar.png"
        time="4"
      />
    ),
  },
];

const Home = () => {
  const { apiUrl } = config;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showStories, setShowStories] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowStories(false);
      setClosing(false);
    }, 500); // Ez megegyezik a záró animáció időtartamával
  };

  return (
    <>
      <Navbar />

      {/* <div class="flex space-x-2 mx-auto max-w-2xl relative font-poppins">
        <div
          class="w-36 h-52 rounded-xl overflow-hidden flex flex-col relative group cursor-pointer"
          onClick={() => setShowStories(!showStories)}
        >
          <img
            class="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
            src="https://cdn.adh.reperio.news/image-a/aea0872a-da19-4b06-a119-7e2b6b8af790/index.jpeg?p=w%3D1000%26h%3D600%26a%3D0%26f%3Djpeg&file=image.jpeg"
            alt="MD. Shibbir Ahmed"
          />

          <div class="absolute inset-x-3 bottom-1">
            <p class="text-white font-semibold">Adevărul</p>
          </div>

          <div class="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
        </div>
        <div
          class="w-36 h-52 rounded-xl overflow-hidden flex flex-col relative group cursor-pointer"
          onClick={() => setShowStories(!showStories)}
        >
          <img
            class="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
            src="https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTA4dHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMjQl/MkYwOSUyRjEzJTJGMjA3NDYxOV8yMDc0/NjE5X0lEMjc1NDUyX0lOUVVBTV9QaG90/b3NfR2VvcmdlX0NhbGluLmpwZyZoYXNo/PTEwNWRlMjYzZmU1NDExM2VhNjM1M2E2MmYyODk1YjEw.jpg"
            alt="MD. Shibbir Ahmed"
          />

          <div class="absolute inset-x-3 bottom-1">
            <p class="text-white font-semibold">Mediafax</p>
          </div>

          <div class="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
        </div>

        <div class="absolute bg-gray-700 hover:bg-gray-600 transition-colors ease-in-out duration-200 p-2 rounded-full right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      {showStories && (
        <>
          <div
            className={`overlay ${closing ? "fade-out-overlay" : ""}`}
            onClick={handleClose}
          ></div>
          <div className="stories-wrapper">
            <div
              className={`stories-container ${
                closing ? "fade-out-content" : ""
              }`}
            >
              <Stories width="550px" height="550px" stories={stories} />
            </div>
          </div>
        </>
      )} */}

      <div className="container mx-auto p-4">
        {loading ? (
          <LoadingText />
        ) : (
          <div className="masonry">
            {items.map((item) => (
              <div
                key={item.id}
                className="masonry-item p-2 rounded shadow-xl border border-sky-500 bg-white"
              >
                <h2 className="font-poppins bg-[#e5e7eb] text-md text-center font-semibold py-1">
                  {item.name}
                </h2>
                <div className="mb-5 pt-4">
                  {item.data &&
                    Array.isArray(item.data) &&
                    item.data.map((i, idx) => (
                      <div
                        key={i.id}
                        className="relative flex flex-col w-full transition-all cursor-pointer pt-2"
                      >
                        <Link
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
                                className="object-cover w-[80px] h-[80px] mr-2"
                                alt={i.title}
                                src={i.image_url}
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
                                        {part.length > 130
                                          ? part.substring(0, 130) + "..."
                                          : part}
                                      </span>
                                    ) : part.length > 130 ? (
                                      part.substring(0, 130) + "..."
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
                <Link href={`/stiri/${item.data[0].category_link}?page=1`}>
                  <div className="flex justify-center items-center">
                    <button className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                      <span className="font-poppins relative px-3 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        Vezi mai multe
                        <span className="lowercase"> {item.name}</span> știri
                      </span>
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
