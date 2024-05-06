import { useEffect, useState, useRef } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import getRandomNumber from './services/getRandomNumbre';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';

function App() {  
  const [locationId, setLocationId] = useState(getRandomNumber(126));
 
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [ location, getLocation, hasError ] = useFetch(url);

  useEffect (() => {
    getLocation() 
  }, [locationId]);
  
  const inputId = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setLocationId(inputId.current.value.trim())
  }

  return (  
      <div>
        <h1 className='img__id'></h1>
        <form className='submit__id' onSubmit={handleSubmit}>
          <input className='input__id' ref={inputId} type="text" />
          <button className='button'>Search</button>
        </form>
        {
          hasError
            ? <h2>❌Hey! you must provide and id to 126</h2>
            : (
            <>
              <LocationInfo location={location} />
              <div className='card__container'>
                {location?.residents.map(url => (
                <ResidentCard key={url} url={url}/>
                ))
                }
              </div>
            </>
          )
        }
        
      </div>    
  );
};

export default App;
