import { Fragment, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { CiSaveDown2 } from "react-icons/ci";
import toast from "react-hot-toast";

function App() {
  const [searchText, setSearchText] = useState("porshe");
  const accesseKey = "V1QdfjowxH8WIDl4RcJQFp9msBQ4dJg-zOR8QXGjDGg";
  const [url, setUrl] = useState(
    `https://api.unsplash.com/search/photos?query=porshe&per_page=30&client_id=${accesseKey}`
  );
  const { data, error, loading } = useFetch(url);

  if (loading) {
    return (
      <>
        <div className="grid w-full h-screen place-items-center">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      </>
    );
  }

  const hendleSubmit = (e) => {
    e.preventDefault();
    if (!searchText)
      return toast.error("Xatolik iltimos biror nima kiriting !");
    setUrl(
      `https://api.unsplash.com/search/photos?query=${searchText}&per_page=30&client_id=${accesseKey}`
    );
  };

  return (
    <div className="px-3">
      <nav>
        <form
          onSubmit={hendleSubmit}
          className="flex gap-3 w-full items-center justify-center p-4"
        >
          <label className="input flex-10/12">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              value={searchText}
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
          <button className="btn btn-primary">Search</button>
        </form>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {data &&
          data.results.map((image) => {
            return (
              <Fragment key={image.id}>
                <div className="relative group w-full h-72 cursor-pointer">
                  <div className="w-full h-full group-hover:bg-black/55 absolute top-0 left-0"></div>
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className="w-full h-full object-cover"
                  />{" "}
                  <div className="absolute bottom-2 w-full px-2 group-hover:flex hidden items-center gap-2 justify-between">
                    <div className="gap-2 flex items-center">
                      <img
                        src={image.user.profile_image.medium}
                        width={50}
                        height={50}
                        className="rounded-full"
                        alt={image.user.first_name}
                      />
                      <span className="text-base font-semibold">
                        {image.user.first_name} {image.user.last_name}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 bg-white text-black py-1 px-2 rounded-2xl font-semibold cursor-pointer">
                      <CiSaveDown2 color="black" size={20} />{" "}
                      <span>Download</span>
                    </button>
                  </div>
                  <span className="absolute right-2 top-2 group-hover:flex hidden cursor-pointer">
                    <FcLike size={30} />
                  </span>
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default App;
