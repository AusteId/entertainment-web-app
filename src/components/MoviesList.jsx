import { BasicCard } from "./shared/BasicCard";

const MoviesList = ({ movies = [], heading }) => {

    if (movies.length === 0) {
        return (
            <section>
                <h1>{heading}</h1>
                <p>{heading} is empty</p>
            </section>
        )
    }

    return (
        <section className="flex flex-col">
            <h1 className="p-0 text-white font-outfit text-[1.25rem] font-medium tracking-[-0.0195rem] pb-[1.5rem] self-start">{heading}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[0.94rem] md:gap-x-[1.81rem] xl:gap-x-[2.5rem] gap-y-[1rem] md:gap-y-[1.5rem] xl:gap-y-[2rem] self-center">
                {movies.map((movie) => (
                    <BasicCard key={movie.id} card={movie} />
                ))}
            </div>
        </section>

    )
}

export default MoviesList;