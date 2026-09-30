import { useState } from 'react'
import './App.css'

function App() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(null)

  function buscarCep() {
    if (cep.length !== 8) {
      alert('Digite um CEP com 8 números')
      return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado')
          setEndereco(null)
        } else {
          setEndereco(data)
        }
      })
      .catch(() => {
        alert('Erro ao consultar o CEP')
      })
  }

  return (
    <main className="container">
      <div className="card">
        <h1>Consulta de CEP</h1>

        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={e => setCep(e.target.value)}
        />

        <button onClick={buscarCep}>
          Buscar
        </button>

        {endereco && (
          <div className="resultado">
            <h2>Endereço</h2>

            <p>CEP: {endereco.cep}</p>
            <p>Rua: {endereco.logradouro}</p>
            <p>Bairro: {endereco.bairro}</p>
            <p>Cidade: {endereco.localidade}</p>
            <p>Estado: {endereco.estado}</p>
            <p>UF: {endereco.uf}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
