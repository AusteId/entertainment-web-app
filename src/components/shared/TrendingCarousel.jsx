import { useEffect, useState, useRef } from "react";
import "./TrendingCarousel.css";

export const TrendingCarousel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7777/movies");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const trendingMovies = data.filter((movie) => movie.isTrending);

  const mouseDownHandler = (e) => {
    isMouseDown.current = true;
    startX.current = e.clientX;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const mouseLeaveHandler = () => {
    isMouseDown.current = false;
  };

  const mouseUpHandler = () => {
    isMouseDown.current = false;
  };

  const mouseMoveHandler = (e) => {
    if (!isMouseDown.current) return;
    const x = e.clientX;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel flex gap-4"
        ref={carouselRef}
        onMouseDown={mouseDownHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
      >
        {trendingMovies.map((Card) => (
          <div className="carousel-item " key={Card.id}>
            <div className="relative group bg-dark/25">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={Card.thumbnail.trending.small}
                  alt="thumbnail"
                />
                <source
                  media="(min-width: 1024px)"
                  srcSet={Card.thumbnail.trending.large}
                  alt="thumbnail"
                />
                <img
                  src={Card.thumbnail.trending.large}
                  alt="thumbnail"
                  className="rounded-md group-hover:brightness-50 duration-200"
                />
              </picture>
              <div className="absolute bottom-0 left-0  p-4">
                <ul className="flex font-light font-outfit text-white">
                  <li className="pr-3">{Card.year}</li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3"
                      height="3"
                      viewBox="0 0 3 3"
                      fill="none"
                    >
                      <circle
                        opacity="0.5"
                        cx="1.5"
                        cy="1.5"
                        r="1.5"
                        fill="white"
                      />
                    </svg>
                  </li>
                  <li className="flex pl-3 pr-3">
                    {Card.category === "Movie" ? (
                      <svg
                        className="mt-1 "
                        width="16"
                        height="16"
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
                        className="mt-1"
                        width="16"
                        height="16"
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
                    <li className="pl-3">{Card.category}</li>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3"
                      height="3"
                      viewBox="0 0 3 3"
                      fill="none"
                    >
                      <circle
                        opacity="0.5"
                        cx="1.5"
                        cy="1.5"
                        r="1.5"
                        fill="white"
                      />
                    </svg>
                  </li>
                  <li className="pl-3">{Card.rating}</li>
                </ul>
                <h2 className=" text-hm text-white font-bold font-medium font-outfit">
                  {Card.title}
                </h2>
              </div>
              <button
                className="absolute flex items-center opacity-0 group-hover:opacity-100 rounded-full 
                duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="ml-3 mr-4">
                  <img src="/assets/icon-play.svg" alt="play" />
                </div>
                <p className="text-hm text-white font-medium font-outfit">
                  Play
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
