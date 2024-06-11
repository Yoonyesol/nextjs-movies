import Header from "@/components/Header";
import Banner from "@/components/Banner";
import MovieArea from "@/components/MovieArea";
import Loader from "@/components/Loader";

export const getMovies = async (type: string, page = 1) => {
  return await //쿼리스트링으로 두 개의 요소 넘기기
  (
    await fetch(
      "http://localhost:3000/api/movies?type=" + type + "&page=" + page
    )
  ).json();
};

export default async function Home() {
  //병렬처리
  const { results: popular } = await getMovies("popular");
  return (
    <>
      <Header />
      <Banner />
      <MovieArea title={"POPULAR"} movies={popular} />
      <Loader />
    </>
  );
}
