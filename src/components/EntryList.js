import react from "react"

function EntryList({entries, setSelectedEntry, selectedEntry, createEntry}){

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return(
    <div className="entry-list-container">
      <ul className="entry-list">
        {
          entries.map((entry) => {
            return(
              <li className={`entry-item ${selectedEntry.id === entry.id ? "entry-selected" : ""}`} onClick={()=> {setSelectedEntry(entry)}}>
                <div className="entry-date">{formatDate(entry.created_at)}</div>
                <div className="entry-preview">{entry.body.split('\n')[0]}</div>
              </li>
            )
          })
        }
      </ul>
      <button className=" button entry-list-button" onClick={createEntry}>Add new entry</button>
    </div>
  )

}

export default EntryList