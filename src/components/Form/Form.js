import "./Form.css";
import { useState } from "react";

const Form = ({ addSighting }) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submitSightings = (event) => {
    event.preventDefault();
    if (!title.length || !description.length) {
      setErrorMessage("Form is incomplete. All fields need to be filled in.");
      return;
    }

    const newSighting = {
      id: Date.now(),
      location: title,
      description: description,
    };
    addSighting(newSighting);
    clearInput();
    setErrorMessage("")
  };

  const clearInput = () => {
    setTitle("");
    setDescription("");
 
  };
  return (
    <form>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button onClick={(event) => submitSightings(event)}>SUBMIT</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default Form;

