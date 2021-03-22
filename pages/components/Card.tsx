export type CardProps = {
  title: string
  release_date: string
  poster_url: string
  imdb_url: string
}

export const Card: React.FC<CardProps> = ({
  poster_url,
  release_date,
  imdb_url,
  title,
}) => (
  <article className="card">
    <div className="card-image">
      <figure className="image">
        <img
          src={poster_url}
          alt="poster du film"
          className="is-rounded"
        />
      </figure>
    </div>
    <div className="content">
      <h1 className="title is-4">{title}</h1>
      <a href={imdb_url} target="_blank" rel="noreferrer">
        Page Imdb
      </a>
      <br />
      <time>{release_date}</time>
    </div>
    <style jsx>
      {`
        .card {
          width: 300px;
          margin-bottom: 1rem;
        }
        .card:nth-child(odd) {
          margin-right: 1rem;
        }
      `}
    </style>
  </article>
)
