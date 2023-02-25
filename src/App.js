import React, { useState, useEffect } from "react";
import StarButton from "./Components/StarButton";
import "./App.css";

function App() {
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");
  const [trash, setTrash] = useState([]);
  const [starred, setStarred] = useState([]);
  
  //const [flag,setFlag]=useState(0);
  const [flag1,setFlag1]=useState(0);
  const [flag2,setFlag2]=useState(0);
  useEffect(() => {
    fetch("https://mocki.io/v1/d1f16339-9aec-4696-b302-7fd0cb0db28b")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  
 

  const filteredUserData = userData.filter((user) => {
    if (filter === "All") {
      return true;
    } else {
      return user.gender === filter;
    }
  });

  const searchedUserData = filteredUserData.filter((user) => {
    const firstName = `${user.first_name}`;
    const lastName = `${user.last_name}`;
    return (
      firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      lastName.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  // const handleShowStarred = () => {
  //   setShowStarred(!showStarred);
  // };
  const handleStar = (id) => {
    const starredUser = userData.find((user) => user.id === id);
    setStarred([...starred, starredUser]);
  };
  const starredList = starred.map((user) => (
    <li key={user.id}>
      {user.id} {user.first_name} {user.last_name} {user.email} {user.gender}{" "}
      {user.ip_address}
    </li>
  ));
  
  var x=0;
 const starClicked=()=>{
  x++;
  setFlag2(x%2);
 }
 const handleDelete = (id) => {
  const deletedUser = userData.find((user) => user.id === id);
  const newUserData = userData.filter((user) => user.id !== id);
  setUserData(newUserData);
  setTrash([...trash, deletedUser]);
};
// const handleShowDeletedata = () => {
//   setShowDeletedata(!showDeletedata);
// };
const deleteList = trash.map((user) => (
  <li key={user.id}>
    {user.id} {user.first_name} {user.last_name} {user.email} {user.gender}{" "}
    {user.ip_address}
  </li>
));
 var y=0;
 const deleteClicked=()=>
 {
  y++;
  setFlag1(y%2);
 }
  return (
    <div className="App">
      <h1 className="appname">User Data Table</h1>
      <header className="header">
        <button className="home">HOME</button>
        <div className="filters" id="dropdown">
          <select value={filter} onChange={handleFilter}>
            <option value="All">All</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="starred">
          <div>
            {/* <button onClick={handleShowStarred}>Show Starred</button>
            {showStarred && <ul className="starredList">{starredList}</ul>} */}
            <button onClick={starClicked}>Show Starred</button>
          </div>
          <div className="delete">
            {/* <button onClick={handleShowDeletedata}>Trash </button>
            {showDeletedata && <ul className="deletelist">{deleteList}</ul>} */}
            <button onClick={deleteClicked}>Trash</button>
          </div>
        </div>
      </header>
      <div className="search">
        <label>Search : </label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
     {(!flag1 && !flag2)?
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>First_Name</th>
            <th>Last_Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>IP Address</th>
            <th>DELETE</th>
          </tr>
        </thead>
        
        <tbody>
          {searchedUserData.map((user, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleStar(user.id)}>
                  {" "}
                  <StarButton />
                </button>
              </td>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.ip_address}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      :<div></div>}
      {flag1 ?<table>
        <tbody>
       <ul>
        {deleteList }
       </ul>
        </tbody>
      </table>
      :<div></div>}
      {flag2 ? <table>
        <tbody>
          <ul>
            
            {starredList}
              
            
          </ul>
        </tbody>
      </table>:<div></div>}
    </div>
  );
}
export default App;
