import React, { useState, useEffect } from 'react';
import ColorContext from './ColorContext';


function Henkilot(props) {
  const [data, setData] = useState([]);
  const [causeError, setErrorCause] = useState(false);
  const [nimi, setNimi] = useState('');
  const [osoite, setOsoite] = useState('');
  const [url, setUrl] = useState('http://localhost:3004/henkilot');
  const [isLoading, setIsLoading] = useState(false); // json-server --watch db.json --port 3004 --delay 2000

  var {color} = React.useContext(ColorContext);

  useEffect(() => {

    const fetchData = async () => {

      setIsLoading(true);
      const response = await fetch(url);
      setData(await response.json());
      setIsLoading(false);

    };

    fetchData();

  }, [url]);

  if (causeError)
      throw new Error("VIRHE!");

  return (
    
    <div>

      Nimi: <input type="text" onChange={event => setNimi("nimi=" + event.target.value + "&")}/>
      Osoite: <input type="text" onChange={event => setOsoite("osoite=" + event.target.value)}/>
      <button type="button" onClick={() => setUrl('http://localhost:3004/henkilot?' + nimi + osoite)}>Hae</button>

      {isLoading ? <div>Loading ...</div> : 
      (<table>
        <tbody>
          {data.map((item) => (
          <tr key={item.id}>
            <td style={{background:color}}>{item.nimi}</td><td style={{background:color}}>{item.osoite}</td><td style={{background:color}}>{item.postinumero}</td><td style={{background:color}}>{item.postitoimipaikka}</td><td style={{background:color}}>{item.puhelinnumero}</td>
          </tr>))}
        </tbody>
      </table>)}

      {(data.length === 0) && (isLoading === false) ? <div>Annetuilla hakuehdoilla ei löytynyt dataa.</div> : null}
      <button type="button" onClick={() => setErrorCause(true)}>Aiheuta virhe!</button>

    </div>
  );
}

export default Henkilot