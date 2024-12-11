import { useEffect, useState } from "react";
import "./BasicCard.css";

export const BasicCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7777/movies');
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
    <>
      {data.map((Card) => {
        return (
          <div key={Card.id}>
            <div className="relative group mb-2 bg-dark/25 ">
            <picture>
            <source media="(max-width: 768px)" srcSet={Card.thumbnail.regular.small} alt="thumbnail" />
            <source media="(max-width: 1023px)" srcSet={Card.thumbnail.regular.medium} alt="thumbnail" />
            <source media="(min-width: 1024px)" srcSet={Card.thumbnail.regular.large} alt="thumbnail" />
              <img
                src={Card.thumbnail.regular.large}
                alt="thumbnail"
                className="rounded-md group-hover:brightness-50 duration-200"
              />
              </picture>
              <button
                className='absolute  flex items-center opacity-0 group-hover:opacity-100 rounded-full 
  duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              >
                <svg
                  className='mr-4 ml-3'
                  width='40'
                  height='40'
                  viewBox='0 0 30 30'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0
15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z'
                    fill='#FFF'
                  />
                </svg>
                <p className='text-hm text-white font-medium font-outfit'>
                  Play
                </p>
              </button>
          
              <Bookmark />
           
            </div>
            <div className='list-text-color'>
              <ul className='flex text-bs font-ligth font-outfit'>
                <li className='pr-3'>{Card.year}</li>
                <li>&#9679;</li>
                <li className='pl-3 pr-3 flex'>
                  {Card.category === 'Movie' ? (
                    <svg
                      className='mt-1 mr-2'
                      width='16'
                      height='16'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6
           6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z'
                        fill='#FFF'
                        opacity='.75'
                      />
                    </svg>
                  ) : Card.category === 'TV Series' ? (
                    <svg
                      className='mt-1 mr-2'
                      width='16'
                      height='16'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705
          1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z'
                        fill='#FFF'
                        opacity='.75'
                      />
                    </svg>
                  ) : null}
                  {Card.category}
                </li>
                <li>&#9679;</li>
                <li className='pl-3'>{Card.rating}</li>
              </ul>
            </div>
            <h2 className='text-hm text-white font-bold font-medium font-outfit'>
              {Card.title}
            </h2>
          </div>
        );
      })}
    </>
  );
};
