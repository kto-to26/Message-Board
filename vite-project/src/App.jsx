import { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import uuid from 'react-uuid';
import {randomColor} from 'randomcolor'

import './App.scss'


function App() {

  const [state,setState] = useState("")

  const [items,setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  )

  useEffect(()=>{
    localStorage.setItem("items",JSON.stringify(items))
  },[items])

  const newEl=()=>{
    
    if(state !== ""){
      const newItem={
        id: uuid(),
        text: state,
        pos:{x:500,y:-500},
        color: randomColor({})
      }
      
      setItems([...items,newItem])
      setState("")
    }else{
      alert("Enter something")
    }
  }

  const delEl=(id)=>{
    
    setItems(items.filter((i)=>i.id !== id))
  }

  const defPos = (data,index)=>{
    const newArr = [...items]
    newArr[index].pos = {x: data.x, y: data.y}
    setItems(newArr)
  }

  const keyPress = (e)=>{
    if(e.which === 13){
      newEl()
    }
  }

  return (
    <>
     <div className="app">

    <div className="wrapper">
      <input type="text" placeholder='Enter something'
      value={state}
      onChange={(e)=>setState(e.target.value)}
      onKeyDown={(e)=>keyPress(e)}
      />
      <button className="enter" onClick={newEl}>Enter</button>
    </div>

    {/* добавляем элемент */}

    {
      items.map((i,index)=>{
       return(
        <Draggable key={index} defaultPosition={i.pos} onStop={(e,data)=>{defPos(data,index)}}>
        <div className="todo__item" style={{backgroundColor : i.color}}>
          {`${i.text}`}
          <button className="delete" onClick={()=>delEl(i.id)}>X</button>
        </div>
      </Draggable>
       )
      })
    }

     </div>
    </>
  )
}

export default App
