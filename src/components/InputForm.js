import React,{useState} from "react";
import './InputForm.css';

const InputForm =()=>{
const [title, setTitle] = useState('');
const [openingText, setOpeningText] = useState('');
const [date,setDate] = useState('')
const [handleTitle , setHandleTitle] = useState('')
const [handletext , setHandleText] = useState('')
const [handledate , setHandledate] = useState('')


const titleHandler = (event) =>{
    console.log(event.target.value)
    setTitle(event.target.value)
}

const textHandler = (event) =>{
    setOpeningText(event.target.value)
}

const dateHandler = (event) =>{
   setDate(event.target.value)
}

const submitHandler = (event) =>{
    event.preventDefault();
    setHandleTitle(title)
    setHandleText(openingText)
    setHandledate(date)
    console.log(title);
    console.log(openingText);
    console.log(date);
    
}

  return (
    <>
    <form onSubmit={submitHandler} >
        <section>
    <label>Title &nbsp;&nbsp;
        <input type="text" onChange={titleHandler}  value = {title} />
    </label>
    <br />
    <br/>

    <label>Release Date &nbsp;
        <input type="date" onChange={dateHandler} value ={date} />
    </label>
    <br />
    <br/>

    <label>Heading Text
        <input type="text" onChange={textHandler} value={openingText} />
    </label>
   
   
    </section>

    <br />
    <button type="submit" onClick={submitHandler}>Add Movie</button>

    </form>

  {/* <h1>{handleTitle}</h1> */}

    </>
  )
}

export default InputForm;