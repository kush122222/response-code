import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import './SearchPage.css'; // Import the external CSS file

const SearchPage = () => {
  const [filter, setFilter] = useState('');
  const [responseCodes, setResponseCodes] = useState([]);
  const navigate = useNavigate();

  const validCodes = [
    // Informational
    '100', '101', '102', '103',
    
    // Successful
    '200', '201', '202', '203', '204', '205', '206', '207', '208', '226', '218',
    
    // Redirection
    '300', '301', '302', '303', '304', '305', '306', '307', '308',
    
    // Client Errors
    '400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', 
    '411', '412', '413', '414', '415', '416', '417', '418', '421', '422', '423', 
    '424', '425', '426', '428', '429', '431', '451',
    
    // Server Errors
    '500', '501', '502', '503', '504', '505', '506', '507', '508', '510', '511'
  ];
  

  const handleFilter = () => {
    const filterRegex = /^[1-5]\dx$|^[1-5]xx$|^[1-5]\d{2}$/;

    if (!filter || !filter.match(filterRegex)) {
      alert('Invalid filter! Use formats like 2xx, 20x, or 203.');
      return;
    }

    const dynamicRegex = new RegExp(`^${filter.replace(/x/g, '\\d')}$`);
    const filteredCodes = validCodes.filter((code) => code.match(dynamicRegex));

    if (filteredCodes.length === 0) {
      alert('No matching codes found for the filter applied.');
      setResponseCodes([]); // Clear existing results
      return;
    }

    const codeData = filteredCodes.map((code) => ({
      code,
      imageUrl: `https://http.dog/${code}.jpg`,
    }));

    setResponseCodes(codeData);
  };

  const handleSave = async () => {
    if (!responseCodes.length) {
      alert('No response codes to save. Please apply a filter first.');
      return;
    }

    const name = prompt('Enter a name for this list:');
    if (!name) {
      alert('List name cannot be empty.');
      return;
    }

    try {
      await axios.post('/api/lists', { name, responseCodes });
      alert('List saved successfully!');
      setFilter(''); // Clear filter input
      setResponseCodes([]); // Clear displayed results
    } catch (error) {
      console.error('Error saving list:', error);
      alert(`Failed to save list: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="search-page-container">
      <h1>Search Page</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter (e.g., 2xx, 20x, 203)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleFilter} className="filter-button">
          Filter
        </button>
      </div>

      <div className="response-codes-container">
        {responseCodes.length > 0 ? (
          <div>
            <h2>Filtered Response Codes</h2>
            <div className="response-codes-grid">
              {responseCodes.map((code) => (
                <div key={code.code} className="response-code-card">
                  <p><strong>{code.code}</strong></p>
                  <img
                    src={code.imageUrl}
                    alt={`Dog for ${code.code}`}
                    className="response-code-image"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No response codes available. Try applying a filter.</p>
        )}
      </div>

      <div className="actions-container">
        <button onClick={handleSave} className="save-button">
          Save List
        </button>
        <button onClick={() => navigate('/lists')} className="show-lists-button">
          Show Saved Lists
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
