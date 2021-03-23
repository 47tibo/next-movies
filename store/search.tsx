import {
  createContext,
  ReactNode,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import { useRouter } from 'next/router'

type State = { search: string }
type Action = { type: 'SET SEARCH'; payload: string }
type Dispatch = (action: Action) => void
type SearchProviderProps = { children: ReactNode }
type SearchContext = {
  state: State
  dispatch: Dispatch
}

const initialState: State = { search: '' }

const SearchContextInstance = createContext<SearchContext>({
  state: initialState,
  dispatch: () => null,
})

const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET SEARCH': {
      return { ...state, search: action.payload }
    }
    default: {
      throw new Error(`Unsupported action type : ${action.type}`)
    }
  }
}

export const SearchProvider: React.FC = ({
  children,
}: SearchProviderProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const router = useRouter()
  useEffect(() => {
    if (state.search) {
      router.push({
        pathname: '/movies',
        query: {
          search: state.search,
        },
      })
    }
  }, [state.search])

  return (
    <SearchContextInstance.Provider value={{ state, dispatch }}>
      {children}
    </SearchContextInstance.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContextInstance)
  if (!context) {
    throw new Error('not in SearchProvider')
  }
  const { state, dispatch } = context
  const setSearch = (search: string) =>
    dispatch({ type: 'SET SEARCH', payload: search })
  return {
    state,
    setSearch,
  }
}
