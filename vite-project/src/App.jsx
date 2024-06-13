
import { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable'
import './App.scss'

function App() {

// тема
const [theme,setTheme] = useState("light")

const switchTheme=()=>{
  setTheme(theme === "light"? "dark" : "light")
}

console.log(theme);
  // состояние элемента
  const [state,setState] = useState("")

// js =>json

  // состояние массива элементов
  const [items,setItems]=useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  // добавление в localStorage(json => js)

  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(items))
  }, [items])

// создание нового элемента


  const newEl=()=>{

    console.log(state);

    if(state.trim() !== ""){

      const newEl={
        id:uuid.v4(),
        text:state,
        color:randomColor({luminosity:"bright",alpha:0.6,format: 'rgba'}),
        pos:{x: 500,y: -500}
      }

      setItems((items)=>[...items,newEl])
      // очищаем input(это сработает,тк value в input = state)
      setState("")

    }else{
      alert('Enter something')
      // очищаем input(это сработает,тк value в input = state)
      setState("")
    }

  }

// удаление эл

  const delEl=(id)=>{
    
    setItems(items.filter((i)=>i.id !== id))
  }

  // оставаться на местах
  const updatePos =(data,index)=>{
    // клонируем массив
    let newPos = [...items]
    // по индексу меняем позицию
    newPos[index].pos =  {x : data.x, y : data.y}
    // обновляем массив
    setItems(newPos)
  }


  // Чтобы Enter нажимался
  const keyPress=(e)=>{
    // 13 - число enter
    if(e.which === 13){
      newEl()
    }
  }

  return (
    <>
     
   <section className="app" id={theme}>

    <button className='theme' onClick={switchTheme}>{theme} mode</button>

   <div className="wrapper">

<input type="text"
value={state}
placeholder='Enter something'
onChange={(e)=>{setState(e.target.value);}}
onKeyDown={(e)=>keyPress(e)}
/>

<button className='enter' onClick={newEl}>Enter</button>

</div>

{/* Вместо () нужно добавить return. ЭТО ВАЖНО!!!! */}

{
  items.map((i,index)=>{
    return(
      //e,data в onStop - это обязаательные параметры(без e нихуя работать не будет)
      <Draggable key={index} defaultPosition={i.pos}
      onStop={(e,data)=>{updatePos(data,index)}}>
        {/* у background еще одни {}. ЭТО ВАЖНО!!! */}
        <div className="todo__item" style={{backgroundColor: i.color}}>
          {`${i.text}`} 
          <button
           className="delete"
          //  callback - ЭТО ВАЖНО!!! 
            onClick={()=>delEl(i.id)}
           >X</button>
        </div>
      </Draggable>
    )
  })
}

   </section>

    </>
  )
}

export default App
