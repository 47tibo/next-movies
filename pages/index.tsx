import Search from '../components/Search'
import { useSearch } from '../store/search'

export default function Home() {
  const { state, setSearch } = useSearch()

  return (
    <>
      <h1 className="title is-2">
        Bienvenue sur le moteur de recherche de films
      </h1>
      <Search onSearch={setSearch} search={state.search} />
    </>
  )
}
