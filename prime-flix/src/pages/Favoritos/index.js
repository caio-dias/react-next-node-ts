import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { toast } from 'react-toastify'

function Favoritos() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    const minhaLista = localStorage.getItem('@primeflix')
    let filmesSalvos = JSON.parse(minhaLista) || []
    setFilmes(filmesSalvos)
  }, [])

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((filme) => {
      return (filme.id !== id)
    })
    setFilmes(filtroFilmes)
    localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
    toast.success('Filme excluído com sucesso!')
  }

  return (
    <div className="Favoritos">
      <h1>Meus Favoritos</h1>
      {filmes.length > 0 ? (
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id}>
              <h2>{filme.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
              <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Você não tem filmes favoritos.</h1>
      )}
    </div>
  );
}
export default Favoritos