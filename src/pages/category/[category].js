import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import useMoviesData from "@/hooks/movieData";
import Head from "next/head";
import { useRouter } from "next/router";

const CategoryMoviesPage = () => {
  const moviesData = useMoviesData();
  const router = useRouter();
  const { category } = router.query;

  const categoryMovies =
    moviesData.find((cat) => cat.title === category)?.data || [];

  return (
    <>
      <Head>
        <title>Browse</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black w-full h-screen">
        <Navbar type="home" />
        <h1>{category} Movies</h1>
        <div className="flex flex-wrap gap-12 justify-center">
          {categoryMovies.map((movie, index) => (
            <div key={index}>
              <Card
                image={movie.poster_path_full_path}
                title={movie.title}
                time={movie.runtime}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoryMoviesPage;
