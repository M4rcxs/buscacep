import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    
    if(!input){
      alert('Necessário informar o CEP')
      return;
    }
    
    try {
      const response = await api.get(`/${input}/json`);
      setCep(response.data);
      setInput(""); 
    }catch{
      alert('CEP inválido')
      setInput("");
    }

  }

  
  return (
    <div className="container">
      <h1 className="title">BUSCACEP</h1>

      <div className="containerInput">
        <input type="text" 
        placeholder="Digite o CEP"
        required="required" 
        pattern="[0-9]+$" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch} >
          <FiSearch size={25} color="#fff" />
        </button>
        
      </div>
      <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>
        </main>
    </div>
  );
}

export default App;
