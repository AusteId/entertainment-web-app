import "./BasicCard.css";
import { Bookmark } from "./Bookmark";

export const BasicCard = ({ Card }) => {
  return (
    <div key={Card.id}>
      <div className="relative">
        <Bookmark movieId={Card.id} bookmarks={Card.bookmarks} />
        <div className="relative group mb-2 bg-dark/25 cursor-pointer">
          <picture>
            <source
              media="(min-width: 320px) and (max-width: 767px)"
              srcSet={Card.thumbnail.regular.small}
              alt="thumbnail"
            />
            <source
              media="(min-width: 768px) and (max-width: 1023px)"
              srcSet={Card.thumbnail.regular.medium}
              alt="thumbnail"
            />
            <img
              src={Card.thumbnail.regular.large}
              alt="thumbnail"
              className="rounded-md thumbnail-img lg:group-hover:brightness-50 duration-200"
            />
          </picture>
          <button
            className="absolute  flex items-center opacity-0 group-hover:opacity-100 rounded-full 
  duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 desktop-only"
          >
            <svg
              className="play-image"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0
15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                fill="#FFF"
              />
            </svg>
            <p className="heading-xs text-white font-outfit play-text">Play</p>
          </button>
        </div>
        <div className="list-text-color">
          <ul className="flex text-bs font-ligth font-outfit">
            <li className="body-s">{Card.year}</li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3"
                height="3"
                viewBox="0 0 3 3"
                fill="none"
                className="oval-gap"
              >
                <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white" />
              </svg>
            </li>
            <li className="body-s flex">
              {Card.category === "Movie" ? (
                <svg
                  className="show-icon"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6
           6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                    fill="#FFF"
                    opacity=".75"
                  />
                </svg>
              ) : Card.category === "TV Series" ? (
                <svg
                  className="show-icon"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705
          1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
                    fill="#FFF"
                    opacity=".75"
                  />
                </svg>
              ) : null}
              {Card.category}
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3"
                height="3"
                viewBox="0 0 3 3"
                fill="none"
                className="oval-gap"
              >
                <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill="white" />
              </svg>
            </li>
            <li className="body-s">{Card.rating}</li>
          </ul>
        </div>
      </div>
      <h2 className="heading-xs text-white font-medium font-outfit title-font">
        {Card.title}
      </h2>
    </div>
  );
};
