import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { CardProps, Card } from '../components/Card/Card'
import { useSearch } from '../store/search'
import Search from '../components/Search/Search'

type MovieExternalIds = {
  imdb_id: string
}

type MovieFromApi = {
  title: string
  release_date: string
  poster_path: string | null
  id: number | null
}

type MoviesProps = {
  cards: CardProps[]
  search: string
}

const movieExternalIdsUrl =
  'https://api.themoviedb.org/3/movie/[id]/external_ids?api_key=ea19850e51eedeaee6ecc4618ffbda6a'
const imdbUrl = 'https://www.imdb.com/title/[id]'
const getImdbUrl = async (movieId: number): Promise<string> => {
  const response = await fetch(
    movieExternalIdsUrl.replace('[id]', movieId.toString()),
  )
  const movie: MovieExternalIds = await response.json()
  return imdbUrl.replace('[id]', movie.imdb_id)
}
const getAllImdbUrls = async (movieIds: number[]) =>
  Promise.all(movieIds.map((movieId) => getImdbUrl(movieId)))

export const getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ea19850e51eedeaee6ecc4618ffbda6a&language=en-US&query=${query.search}&page=1&include_adult=false`,
  )
  // console.log(response)
  const data = await response.json()
  const movies: MovieFromApi[] = data.results.filter(
    (movie: MovieFromApi) =>
      movie.id !== null && movie.poster_path !== null,
  )
  const imdbUrls = await getAllImdbUrls(
    movies.map((movie) => movie.id),
  )
  const cards: CardProps[] = movies.map((movie, index) => ({
    ...movie,
    poster_url: `https://image.tmdb.org/t/p/w780/${movie.poster_path}`,
    imdb_url: imdbUrls[index],
  }))
  return {
    cards,
    search: query.search,
  }
}

const Movies: NextPage<MoviesProps> = ({ cards, search }) => {
  const { state, setSearch } = useSearch()
  useEffect(() => setSearch(search), [])

  return (
    <main className="container">
      <div className="centered my my-6">
        <nav className="level">
          <div className="level-left">
            <Search onSearch={setSearch} search={state.search} />
          </div>
          <div className="level-right">
            <Link href="/">
              <a>Retour à l'accueil</a>
            </Link>
          </div>
        </nav>
      </div>
      <div className="centered is-flex is-flex-wrap-wrap">
        {cards.length ? (
          cards.map((card: CardProps) => (
            <Card
              key={card.poster_url}
              imdb_url={card.imdb_url}
              title={card.title}
              release_date={card.release_date}
              poster_url={card.poster_url}
            />
          ))
        ) : (
          <p>:( pas de résultat pour cette recherche</p>
        )}
      </div>
      <style jsx>
        {`
          .centered {
            max-width: 5o%;
            margin: 0 auto;
          }
        `}
      </style>
    </main>
  )
}

Movies.getInitialProps = getInitialProps
export default Movies
