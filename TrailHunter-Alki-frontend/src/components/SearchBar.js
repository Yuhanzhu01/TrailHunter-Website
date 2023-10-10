import React,{useState} from "react";
// import SearchIcon from '@material-ui/icons/Search';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import "./SearchBar.css";


function SearchBar({placeholder,data}){

  const [filterData,setFilteredData] = useState([]);
  const [wordEntered,setWordEntered] = useState("");
  const handleFilter = (event) =>{
    const searchWord = event.target.value;
    setWordEntered(searchWord)
    const newFilter = data.filter((value) =>{
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if(searchWord === ""){
      setFilteredData([]);
    }
    else{
    setFilteredData(newFilter);
    }
  }

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  }

  return(
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
        <div className="searchIcon">
          {filterData.length === 0 ? (
          <SearchIcon /> 
          ) : (
          <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filterData.length !=0 && (
        <div className="dataResult">
        {filterData.slice(0,15).map((value,key) => {
          return(
            <a className="dataItem"  target="_blank" rel="noreferrer">
             <p>{value.name}</p>
            </a>
          );
        })}
        </div>
      )}
      </div>
  );
}


export default SearchBar;