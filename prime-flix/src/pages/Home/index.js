import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import './index.css'

function Home() {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmes() {
      setLoading(true)
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: '8e4f8d089e8c3b40ff43b75fe886a7e5',
          language: 'pt-BR',
          page: 1,
        }
      })
      setFilmes(response.data.results.slice(0, 10))
      setLoading(false)
    }

    loadFilmes()
  }, [])
  
  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="Home">
      <div className="container">
        <div className="filmes">
          {filmes.map(filme => (
            <article key={filme.id} className="filme">
              <h2>{filme.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home
