import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchLocations } from '../../api/weatherService';
import './SearchBar.css';

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 2) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(async () => {
        try {
          const locations = await searchLocations(query);
          setResults(locations);
          setShowResults(true);
        } catch (error) {
          console.error(error);
        }
      }, 300);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper glass">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setShowResults(true)}
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results glass">
          {results.map((loc) => (
            <div
              key={`${loc.latitude}-${loc.longitude}`}
              className="result-item"
              onClick={() => {
                onLocationSelect(loc);
                setQuery(loc.name);
                setShowResults(false);
              }}
            >
              <MapPin size={16} />
              <div className="result-text">
                <span className="result-name">{loc.name}</span>
                <span className="result-admin">{loc.admin1}, {loc.country}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
