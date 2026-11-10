import { useParams } from "react-router-dom";

function Produto() {
  // useParams é um hook do react-router-dom que permite pegar os parâmetros da rota, no caso o id do produto
  const { id } = useParams();
  return (
    <div className="Produto">
      <h1>Produto</h1>
      <p>Informações do produto {id}</p>
    </div>
  );
}

export default Produto;
