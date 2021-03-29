import React, { SyntheticEvent, useRef } from 'react'

type SearchProps = {
  search: string
  onSearch: (search: string) => void
}

const Search: React.FC<SearchProps> = ({ search, onSearch }) => {
  const textInput = useRef(null)

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    onSearch(textInput.current.value)
  }
  return (
    <form onSubmit={onSubmit} className="field has-addons">
      <div className="control">
        <input
          className="input is-rounded"
          type="text"
          placeholder="exemple 'Speed'"
          defaultValue={search}
          ref={textInput}
          data-testid="search-input"
        />
      </div>
      <div className="control">
        <button
          className="button is-primary is-rounded"
          type="submit"
          data-testid="search-button"
        >
          Recherche
        </button>
      </div>
    </form>
  )
}
export default Search
