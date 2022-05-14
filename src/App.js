import './App.css';
import react from 'react';
import { useEffect, useState } from 'react';
import Entry from './components/Entry';
import OpenScreen from './components/OpenScreen';
import EntryList from './components/EntryList';

function App() {

  const emotionList = [{emotionName: "sad", emotionEmoji: "😞"}, {emotionName: "happy", emotionEmoji: "😊"}, {emotionName: "angry", emotionEmoji: "😡"}];

  const [name, setName] = useState("");
  const [entries, setEntries] = useState([]);
  const [userOption, setUserOption] = useState("");
  const [openScreenVisible, setOpenScreenVisible] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [editValue, setEditValue] = useState();
  const [editing, setEditing] = useState(false);
  const [emotion, setEmotion] = useState(emotionList[0].emotionName);

  useEffect(() => {
    if(editing === false && selectedEntry) {
      console.log(selectedEntry)
      setEditValue(selectedEntry.body)
    }
  }, [selectedEntry])

  async function createEntry(){
    console.log("submitting")
    let req = await fetch("http://localhost:9292/entries", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: "New note",
        emotion: "happy",
        user_id: name
      }),
    });
    let res = await req.json();
    setEntries(prevState => [...prevState, res])
    setSelectedEntry(res);
  }

  async function handleSaveEntry(entry){
    console.log("updating", entry)
    let req = await fetch(`http://localhost:9292/entries/${entry.id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: editValue,
        emotion: emotion,
        updated_at: Date.now(),
        user_id: name
      }),
    });
    let res = await req.json();
    setEditing(false)
    const updatedEntries = entries.map((prevEntry) => {
      if (prevEntry.id === res.id) {
        return res;
      } else {
        return prevEntry;
      }
    });
    setEntries(updatedEntries);
    console.log("success updating?", res)
  }

  async function getUserEntries(name){
    setOpenScreenVisible(false);
    try{
      let req = await fetch(`http://localhost:9292/${name}/entries`)
      let res = await req.json();
      if (req.status >= 200 && req.status <= 299) {
        setEntries(res)
        setSelectedEntry(res[0])
        console.log(selectedEntry)
    } else {
      throw Error(req.statusText);
    }
    }catch(error){
      alert("Try again", error.message)
    }
    }

  async function handleSubmit(e){
    e.preventDefault();
    if (userOption === "new"){
      try {
      let req = await fetch("http://localhost:9292/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name
        }),
      });
      let res = await req.json();
      createEntry()
      getUserEntries(res.name)
    } catch(error){
      alert(error.message)
    }
    }
    else if (userOption === "returning"){
      getUserEntries(name)
    }
  }

  function handleChange(event){
    setEditing(true)
    setEditValue(event.target.value)
  }

  async function handleDeleteEntry(entry){
    try {
      let req = await fetch(`http://localhost:9292/entries/${entry.id}`, {
        method: "DELETE"
      });
      let res = await req.json();
      setEntries(prevState => prevState.filter((prevEntry) => prevEntry.id != entry.id))
      setEditValue("")
    } catch(error){
      alert(error.message)
    }
  }

  return (
    <div className="App">
      <div className={`app-header ${openScreenVisible ? "center" : "left"}`}>
        <div className='header-text'>My</div>
        <div className='header-accent'>Secret</div>
        <div className='header-text'>Diary</div>
      </div>
      {
        (openScreenVisible) &&
        <OpenScreen setName={setName} handleSubmit={handleSubmit} userOption={userOption} setUserOption={setUserOption}/>
      }
      {
        (!openScreenVisible) &&
        <div className='app-content'>
          <EntryList createEntry={createEntry} entries={entries} setSelectedEntry={setSelectedEntry} selectedEntry={selectedEntry} />
          <Entry editValue={editValue} handleSaveEntry={handleSaveEntry} handleDeleteEntry={handleDeleteEntry} selectedEntry={selectedEntry} handleChange={handleChange} name={name} emotionList={emotionList} emotion={emotion} setEmotion={setEmotion}/>
        </div>
      }
      
    </div>
  );
}

export default App;
