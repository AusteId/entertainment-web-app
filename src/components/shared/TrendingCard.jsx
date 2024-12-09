import { useEffect, useState } from "react";
import "./TrendingCard.css";

export const TrendingCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <div className="grid grid-cols-4 gap-3">
      {data.filter((movie) => movie.isTrending).map((Card) => {
        return (
          <div className="container" key={Card.id}>
            <div className="relative group mb-2 bg-dark/25 ">
              <img
                src={Card.thumbnail.regular.large}
                alt="thumbnail"
                className="rounded-md group-hover:brightness-50 duration-200"
              />


              <button
                className="w-1/3 absolute flex items-center opacity-0 group-hover:opacity-100 rounded-full 
                duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="ml-3 mr-4">
                    <img src="/assets/icon-play.svg" alt="play" />
                </div>
                <p className="text-hm text-white font-medium font-outfit">
                  Play
                </p>
              </button>


                          <div className="absolute movie-info bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                <ul className="flex text-bs font-light font-outfit text-white">
                  <li className="pr-3">{Card.year}</li>
                  <li>&#9679;</li>
                  <li className="flex pl-3 pr-3">
                    {Card.category === "Movie" ? (
                      <img src="public/assets/icon-category-movie.svg" alt="movie" />
                    ) : Card.category === "TV Series" ? ( 
                      <img src="/assets/icon-category-tv.svg" alt="tv" />
                    ) : null}
                    <li className="pl-3">{Card.category}</li>
                  </li>
                  <li>&#9679;</li>
                  <li className="pl-3">{Card.rating}</li>
                </ul>
                <h2 className="text-hm text-white font-bold font-medium font-outfit">
                  {Card.title}
                </h2>
              </div>
            </div>



          </div>
        );
      })}
    </div>
  );
};
