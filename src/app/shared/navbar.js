"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import toast from "@/app/shared/toast";

import config from "../../../config/config";

const Navbar = () => {
  const { apiUrl } = config;

  const router = useRouter();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [isValidEmail, setShowValid] = useState(false);
  const [email, setEmail] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      menuRef.current.style.top = `${buttonRect.bottom + window.scrollY}px`;
      menuRef.current.style.left = `${buttonRect.left + window.scrollX}px`;
    }
  }, [isOpen]);

  useEffect(() => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      setShowValid(true);
    } else {
      setShowValid(false);
    }
  }, [email]);

  const saveEmail = () => {
    if (isValidEmail == true) {
      fetch(`${apiUrl}/api/users/subscriber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (response.status == 409) {
            setShowValid(false);
            toast(
              "error",
              "Te-ai înscris cu această adresă de e-mail",
              "top-center",
              3500
            );

            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          if (response.status == 200) {
            toast("success", "Te-ai abonat cu succes", "top-center", 3500);
            setEmail("");
            setOpen(false);
            setShowValid(false);
          }

          if (response.status == 500) {
            setShowValid(false);
            setOpen(false);
            toast("error", "Server error", "top-center", 3500);
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast("error", "E-mailul nu este valid", "top-center", 3500);
    }
  };

  const handleMobileOpen = () => setIsOpenMobile(!isOpenMobile);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSearch = () => {
    const formattedTitle = title.trim().replace(/\s+/g, "-");
    router.push(`/cautare/?title=${formattedTitle}&page=1`);
    setTitle("");
  };

  return (
    <>
      <div className="container mx-auto py-2 px-4 flex justify-end items-center">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Abonează-te pentru noutăți!
        </button>
      </div>

      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="fixed inset-0 flex items-center justify-center z-50 px-2">
          <div
            className="absolute inset-0 bg-gray-800 bg-opacity-50"
            aria-hidden="true"
          />
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-10 relative font-poppins">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <h2 className="text-md font-medium text-gray-700 mb-2">
              Merită să îți lași adresa de e-mail!
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              Așa cum observăm interesul pentru site, vom dezvolta noi
              funcționalități care vor include următoarele:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-3">
              <li className="pb-2">
                Personalizarea portalului de știri în funcție de categorii și
                tag-urile preferate
              </li>
              <li className="pb-2">Citește știrile preferate fără reclame</li>
              <li className="pb-2">Cererea de noi portaluri de știri</li>
              <li className="pb-2">
                Notificări exclusive prin e-mail cu știrile personalizate
              </li>
              <li className="pb-2">Mod negru-alb</li>
              <li>Și multe alte noutăți</li>
            </ul>

            <label
              htmlFor="email"
              className="block text-sm text-gray-700 text-gray-700 pt-5"
            >
              Adresă de email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="email@example.com"
            />
            <button
              type="submit"
              onClick={saveEmail}
              // data-bs-dismiss={isValidEmail === true ? setOpen(false) : ""}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Abonează-te
            </button>
          </div>
        </div>
      </Transition>

      <Popover className="container-fluid font-poppins mx-auto flex items-center px-6 py-2 h-14 bg-white rounded round-sm">
        <h1 className="text-[19px] tracking-wider font-semibold">
          <Link href="/" className="hover:text-blue-700">
            ştiridirect.ro
          </Link>
        </h1>

        <div className="grow">
          <div className="hidden uppercase tracking-wider text-[15px] font-semibold hamburgerMenu:flex justify-center gap-3 md:gap-4">
            <Link href="/stiri/politica?page=1" className="hover:text-blue-700">
              Politică
            </Link>
            <Link href="/stiri/externe?page=1" className="hover:text-blue-700">
              Externe
            </Link>
            <Link href="/stiri/economie?page=1" className="hover:text-blue-700">
              Economie
            </Link>
            <Link href="/stiri/interne?page=1" className="hover:text-blue-700">
              Interne
            </Link>
            <Link href="/stiri/justitie?page=1" className="hover:text-blue-700">
              Justiție
            </Link>
            <Link href="/stiri/sport?page=1" className="hover:text-blue-700">
              Sport
            </Link>
            <span
              className="flex items-center"
              ref={buttonRef}
              onClick={toggleMenu}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className="hover:text-blue-700 cursor-pointer mt-[-2px]">
                Mai multe
              </p>
              <svg
                className="w-6 h-6 text-gray-800 ml-1 "
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
            </span>
          </div>
        </div>
        {isOpen && (
          <div
            id="mega-menu-icons-dropdown"
            ref={menuRef}
            className="absolute z-10 w-auto font-medium grid-cols-2 text-[15px] bg-white border rounded-sm shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="p-4 pb-0">
              <ul
                className="space-y-4"
                aria-labelledby="mega-menu-icons-dropdown-button"
              >
                <li>
                  <Link
                    href="/stiri/social?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Social
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/educatie?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Educație
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/meteo?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Vremea
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/technologie?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Technologie
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/opinii?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Opinii
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4 pb-0">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/stiri/bani-afaceri?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Bani și afaceri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/cultura?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Cultură
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/sanatate?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Sănătate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/stiinta?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Știință
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/life?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Life
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4 text-gray-900">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/stiri/auto?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Auto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/horoscop?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Horoscop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/vedete?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Vedețe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stiri/video?page=1"
                    className="flex items-center hover:text-blue-700 group"
                  >
                    Video
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex grow items-center justify-end hamburgerMenu:hidden">
          <Popover.Button
            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
          hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset "
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition  z-50"
          >
            <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold">ştiridirect.ro</h1>
                  <div className="-mr-2">
                    <Popover.Button
                      className="inline-flex items-center justify-center rounded-md-bg-white p-2
                  text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus-ring-2 focus:ring-inset"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-3">
                    <Link
                      href="/stiri/politica?page=1"
                      className="hover:text-blue-700"
                    >
                      Politică
                    </Link>
                    <Link
                      href="/stiri/externe?page=1"
                      className="hover:text-blue-700"
                    >
                      Externe
                    </Link>
                    <Link
                      href="/stiri/economie?page=1"
                      className="hover:text-blue-700"
                    >
                      Economie
                    </Link>
                    <Link
                      href="/stiri/interne?page=1"
                      className="hover:text-blue-700"
                    >
                      Interne
                    </Link>
                    <Link
                      href="/stiri/justitie?page=1"
                      className="hover:text-blue-700"
                    >
                      Justiție
                    </Link>
                    <Link
                      href="/stiri/sport?page=1"
                      className="hover:text-blue-700"
                    >
                      Sport
                    </Link>
                    <span
                      className="flex items-center"
                      onClick={handleMobileOpen}
                    >
                      Mai multe
                      <svg
                        className="w-6 h-6 text-gray-800 ml-1 pt-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        fill="none"
                        viewBox="0 0 27 27"
                      >
                        <path
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 9-7 7-7-7"
                        />
                      </svg>
                    </span>
                    {isOpenMobile && (
                      <div className="grid gap-y-3 pl-3">
                        <Link
                          href="/stiri/social?page=1"
                          className="hover:text-blue-700"
                        >
                          Social
                        </Link>
                        <Link
                          href="/stiri/educatie?page=1"
                          className="hover:text-blue-700"
                        >
                          Educație
                        </Link>
                        <Link
                          href="/stiri/meteo?page=1"
                          className="hover:text-blue-700"
                        >
                          Vremea
                        </Link>
                        <Link
                          href="/stiri/technologie?page=1"
                          className="hover:text-blue-700"
                        >
                          Technologie
                        </Link>
                        <Link
                          href="/stiri/opinii?page=1"
                          className="hover:text-blue-700"
                        >
                          Opinii
                        </Link>
                        <Link
                          href="/stiri/bani-afaceri?page=1"
                          className="hover:text-blue-700"
                        >
                          Bani și afaceri
                        </Link>
                        <Link
                          href="/stiri/cultura?page=1"
                          className="hover:text-blue-700"
                        >
                          Cultură
                        </Link>
                        <Link
                          href="/stiri/sanatate?page=1"
                          className="hover:text-blue-700"
                        >
                          Sănătate
                        </Link>
                        <Link
                          href="/stiri/stiinta?page=1"
                          className="hover:text-blue-700"
                        >
                          Știință
                        </Link>
                        <Link
                          href="/stiri/life?page=1"
                          className="hover:text-blue-700"
                        >
                          Life
                        </Link>
                        <Link
                          href="/stiri/auto?page=1"
                          className="hover:text-blue-700"
                        >
                          Auto
                        </Link>
                        <Link
                          href="/stiri/horoscop?page=1"
                          className="hover:text-blue-700"
                        >
                          Horoscop
                        </Link>
                        <Link
                          href="/stiri/vedete?page=1"
                          className="hover:text-blue-700"
                        >
                          Vedețe
                        </Link>
                        <Link
                          href="/stiri/video?page=1"
                          className="hover:text-blue-700"
                        >
                          Video
                        </Link>
                      </div>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="w-full mt-2 flex justify-center font-poppins px-1  pb-2">
        <div className="max-w-md w-full flex search-input-shadow">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Căutați după title..."
            className="flex-grow px-2 py-1 text-sm  rounded-l-md shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
          />
          <button
            onClick={handleSearch}
            disabled={title.length === 0}
            className={`px-2 py-1 text-sm rounded-r-md ${
              title.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white focus:outline-none`}
          >
            Căutare
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
