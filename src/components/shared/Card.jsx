import { useEffect, useState } from "react"

export const Card = ()=>{
  
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:7777/movies"
          );
          const data = await response.json();
          setData(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }, [],);

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
            
            <div key={Card.id} className="">
          <div className="relative group mb-2">
<img src={Card.thumbnail.regular.large} alt="thumbnail" className="rounded-md"/>
<button class="absolute bg-sky-500 mx-20 my-16 bg-dark/25 inset-0 flex items-center justify-center opacity-0 hover:opacity-100
rounded-full duration-200">
<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0
15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z" fill="#FFF"/></svg>
<p className="text-white items-center justify-center text-hm ml-8 mb-2">Play</p>
</button>
</div>
<div>
    <ul className="flex text-bm text-white font-ligth font-outfit"> 
    <li className="pr-2">{Card.year}</li>
    <li>&#9679;</li>
<li className="pl-2 pr-2">
{Card.category}</li>
<li>&#9679;</li>
<li className="pl-2">{Card.rating}</li>
    </ul>
            </div>
            <h2 className="text-hm text-white font-bold font-medium font-outfit mb-6">{Card.title}</h2>
          </div>
        );
    
      })}
    </>
    
    )
}