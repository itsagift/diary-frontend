import react from "react";
import {useState} from 'react';

function OpenScreen ({setName, handleSubmit, userOption, setUserOption}){

  return(
    <div className='open-screen'>
        <div className="open-header">
        <div className="open-tagline">(honor system: plz don't read other ppls diaries!!!)</div>
          <div className="open-buttons">
            <button className={`open-button ${userOption==="new" ? "selected" : ""}`} onClick={()=> setUserOption("new")}>New User</button>
            <button className={`open-button ${userOption ==="returning" ? "selected" : ""}`} onClick={()=> setUserOption("returning")}>Returning User</button>
          </div>
        </div>
      {
        (userOption === "new" || userOption === "returning") &&
          <form className="name-form" onSubmit={handleSubmit}>
            <input className="form-text" onChange={(e) => {setName(e.target.value)}} type="text" placeholder='enter name'></input>
            <button className="form-button" type='submit'>{userOption === "new" ? "Create account" : "View diary"}</button>
            
          </form>
      }
      </div>
  )
}

export default OpenScreen