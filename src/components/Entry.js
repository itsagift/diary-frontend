import react from "react";

function Entry ({editValue, handleSaveEntry, handleDeleteEntry,selectedEntry, handleChange, name, emotionList, emotion, setEmotion}){
  return(
    <div className="entry-content">
      <div class="entry-buttons">
        <button className="button left-button entry-button" onClick={() => handleSaveEntry(selectedEntry)}>Done</button>
        <button className="button entry-button" onClick={() => handleDeleteEntry(selectedEntry)}>🗑️</button>
      </div>
      <div className="textarea-container">
        <div className="textarea-plus">Dear Diary,</div>
        <textarea className="textarea" value={editValue} onChange={handleChange} autoComplete={false}>
        </textarea>
        <div className="textarea-plus signature">{name}</div>
       
      </div>
      <div className="emotions">
        <div className="emotion-selector">Select emotion:</div>
        {
          emotionList.map((emotionItem) => {
            return(
              <div className={`${emotion == emotionItem.emotionName ? "emotion emotion-selected" : "emotion"}`} onClick={() => {setEmotion(emotionItem.emotionName); console.log(emotion)}}>{emotionItem.emotionEmoji}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Entry