"use client";
import { getMovies } from "@/app/page";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { TMovie } from "./MovieArea";
import MovieCard from "./MovieCard";

export default function Loader() {
  const idRef = useRef(2);
  //ref: 요소 나타났는지 체크
  //inView: 요소의 값(나타나면 값이 바뀜)
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<TMovie[]>([]);

  useEffect(() => {
    //끝점에 도달한 순간에 loading이 false이면
    if (inView && !loading) {
      setLoading(true);
      //끝점에 도달하면 API 호출
      getMovies("popular", idRef.current++).then((res) => {
        setMovies((prev) => [...prev, ...res.results]);
      });
    }

    //한번에 여러개의 api가 호출되는 것을 방지하기 위한 시간지연
    setTimeout(() => {
      setLoading(true);
    }, 300);
  }, [inView, movies]);

  return (
    <>
      <div className="bg-black">
        <article className="bg-black px-4 xs:px-0">
          <section className="container mx-auto text-white">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-0">
              {movies &&
                movies.map((movie: TMovie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
          </section>
        </article>
        <div ref={ref} className="flex justify-center">
          <FaSpinner className="text-5xl animate-spin text-white" />
        </div>
      </div>
    </>
  );
}
