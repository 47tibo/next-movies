import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="title is-2">
        Bienvenue sur le moteur de recherche de films
      </h1>
      <Link href="/movies?search=shrek">
        <a>Recherche "shrek"</a>
      </Link>
    </>
  )
}
