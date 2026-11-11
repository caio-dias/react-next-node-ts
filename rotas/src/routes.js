import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from "./pages/Home"
import Sobre from "./pages/Sobre"
import Contato from "./pages/Contato"
import NotFound from "./pages/NotFound"
import Produto from "./pages/Produto"

// npm install react-router-dom < instalar para usar rotas no react

function RoutesApp() {
  return (
    <BrowserRouter>
      {/* adiciona o header do projeto, ele precisa ficar aqui para conhecer as rotas */}
      <Header />
      <Routes>
        {/* cada rota fica dentro de Routes, em um route, chamando em forma de componente com seu path */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        {/* passando um path com parâmetro dinamico */}
        <Route path="/produto/:id" element={<Produto />} />

        {/* rota para página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp