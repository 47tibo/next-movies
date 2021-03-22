import { useState, ChangeEvent, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'

const Search: React.FC = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    router.push({
      pathname: '/movies',
      query: {
        search,
      },
    })
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <form onSubmit={onSubmit} className="field has-addons">
      <div className="control">
        <input
          className="input is-rounded"
          type="text"
          placeholder="exemple 'Speed'"
          value={search}
          onChange={onChange}
        />
      </div>
      <div className="control">
        <button
          className="button is-primary is-rounded"
          type="submit"
        >
          Recherche
        </button>
      </div>
    </form>
  )
}
export default Search
