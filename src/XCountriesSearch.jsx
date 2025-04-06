import React, { useState, useEffect } from "react";
import Search from "./SearchBar"

const CountryFlags = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchCountry, setSearchCountry] = useState("");

    const fetchCountries = async () => {
        try{
            const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
            if(!response.ok){
                throw new Error("Failed to fetch Country Data!");
            }
            const data = await response.json();
            setCountries(data);
        } catch(error) {
            console.error(`Error fetching data: ${error.message}`);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const handleSearchChange = (e) => {
        setSearchCountry(e.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.common.toLowerCase().includes(searchCountry.toLowerCase())
    );



    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: "80px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#F4F4F4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Search searchCountry={searchCountry} onSearchChange={handleSearchChange}/>
            </div>
            <div 
                style={{
                    display: "grid", 
                    gridTemplateColumns: "repeat(7, 1fr)", 
                    gap: "20px", 
                    justifyContent: "center", 
                    padding: "20px",
                }}
            >

                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                        <div
                            key={country.common}
                            className="countryCard"
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "10px",
                                textAlign: "center",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <img
                                src={country.png}
                                alt={country.common}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                }}
                            />
                            <h2 style={{ marginTop: "10px" }}>{country.common}</h2>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}


            </div>
        </div>
    )
}

export default CountryFlags;