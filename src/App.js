import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchApiData();
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  async function fetchApiData() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CompanyId: 'GoldenCasket',
        MaxDrawCount: 20
      })
    };
    const response = await fetch('https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults', requestOptions);
    return response;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {data.DrawResults.map(DrawResult => (
        <div key={DrawResult.DrawNumber}>
          <p>
            <h2>{DrawResult.DrawDisplayName}</h2>
            <ul>
              <li>Logo Image: <img src="{DrawResult.DrawLogoUrl}" onerror="console.log('Failed to load image')" /></li>  {/* All the logo Urls are dead */}
              <li>Draw Date: {DrawResult.DrawDate}</li>
              <li>Draw Number: {DrawResult.DrawNumber}</li>
              <li>Jackpot Value: {DrawResult.Dividends.map((item, index) =>
                item.Division === 1 ? item.CompanyDividend : '' 
              )}</li> {/* There is "div1Amount" attribute in the response, I'm just assuming it's CompanyDividend is the amount */}
            </ul>
          </p>
        </div>
      ))}
    </div>
  );
}
export default App;