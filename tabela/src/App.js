import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';


function App() {

  const [characters, setCharacters] = useState([]);
  const [queryTerm, setQueryTerm] = useState('');
  const [queryType, setQueryType] = useState({
  name: false,
  species: false,
  type: false
  });


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacters(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleInputChange = (e) => {
    setQueryTerm(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setQueryType({ ...queryTerm, [e.target.name]: e.target.checked});
  }

  const filterCharacters = (character) => {
    if (queryType.name && character.name.toLowerCase().includes(queryTerm.toLowerCase())) {
      return true;
    }
    if (queryType.species && character.species.toLowerCase().includes(queryTerm.toLowerCase())) {
      return true;
    }
    if (queryType.type && character.type.toLowerCase().includes(queryTerm.toLowerCase())) {
      return true;
    }
    return false;
  };

  const filteredCharacters = characters.filter(filterCharacters)

  return (
  <div class="main">
    <input type='text' value={queryTerm} onChange={handleInputChange} className='input is-rounded'/>
    <input type='checkbox' name="name" checked={queryType.name} onChange={handleCheckboxChange}/> Name
    <input type='checkbox' name="species" checked={queryType.species} onChange={handleCheckboxChange}/> Species
    <input type='checkbox' name="type" checked={queryType.type} onChange={handleCheckboxChange}/> Type
    <table className='table is-striped'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Type</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {filteredCharacters.map(character => (
          <tr key={character.id}>
            <td>{character.id}</td>
            <td>{character.name}</td>
            <td>{character.status}</td>
            <td>{character.species}</td>
            <td>{character.type}</td>
            <td>{character.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> 
  );
};

export default App;