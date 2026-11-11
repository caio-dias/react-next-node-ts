import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './index.css'
import { toast } from 'react-toastify'

function Filme() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      setLoading(true)
      await api.get(`/movie/${id}`, {
        params: {
          api_key: '8e4f8d089e8c3b40ff43b75fe886a7e5',
          language: 'pt-BR',
        }
      }).then((response) => {
        setFilme(response.data)
        setLoading(false)
      }).catch(() => {
        setFilme({})
        setLoading(false)
        navigate('/', { replace: true })
      })
    }
    loadFilme()


    return () => {
      setFilme({})
    }
    // dependencias usadas de fora
  }, [id, navigate])


  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeflix')
    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if (hasFilme) {
      toast.error('Esse filme já está na sua lista!')
      return
    }
    
    filmesSalvos.push(filme)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso!')
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filme...</h2>
      </div>
    )
  }

  return (
    <div className="Filme">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <p>{filme.overview}</p>
      <p>Nota: {filme.vote_average}</p>
      <p>Ano de lançamento: {filme.release_date.slice(0, 4)}</p>
      <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="_blank" rel="noreferrer">Ver Trailer</a>
      <button onClick={salvarFilme}>
        Favoritar
      </button>
    </div>
  );
}

export default Filme
