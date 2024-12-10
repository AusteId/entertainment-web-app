import axios from "axios";
import { BasicCard } from "./shared/BasicCard";
import { useEffect, useState } from "react";

const MoviesList = () => {
    // const neededScope = movies.filter((movie) => movie.category === scope);

    // if (neededScope.length === 0) {
    //     return (
    //         <section>
    //             <h1>{scope}</h1>
    //             <p>{scope} category is empty</p>
    //         </section>
    //     )
    // }

    const [moviesList, setMoviesList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
           const res = await axios.get("http://localhost:7777/movies")
            setMoviesList(res.data);
        } catch (error) {
            setError(error.message);
        }
    };



    // return (
    //     <section>
    //         <div className="flex col">
    //             {data.map((movie)=>(
    //                 <div key={movie.id}>
    //                 {console.log(movie)}
                    
    //                     <div><img src={movie.thumbnail.regular.small} /></div>
    //                 </div>
    //             ))}
    //         </div>
    //     </section>
    // )

    return (
        <section>
            {moviesList.map((movie)=>(
                <div key={movie.id}>
                    <img src={movie.thumbnail.regular.small} alt={movie.title} />
                </div>
            ))}
        </section>
    )
}

export default MoviesList;