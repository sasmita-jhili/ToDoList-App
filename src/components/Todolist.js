import React, { useState,useEffect } from 'react'
import "../App.css"

//to set the local items ls 

const getLocalItems = () =>{
    let list = localStorage.getItem('lists')
    console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'))
    }else{
        return []
    }
}

const Todolist = () => {
    const [inputData,setInputData] = useState("")
    const [items,setItems] =useState(getLocalItems())
    const [date,setDate] = useState()
    const [toggleSubmit,setToggleSubmit] =useState(true)
    const [isEditItem,setIsEditItem]= useState(null)
 
   const addItem=()=>{
       if(!inputData){
        alert('please fill the data')
       }else if(inputData && !toggleSubmit){
           setItems(
               items.map((elem)=>{
                   if(elem.id === isEditItem){
                       return{...elem, name:inputData}
                   }
                   return elem;
               })
           )
           setToggleSubmit(true)

           setInputData('')

            setIsEditItem(null)
       }
       else{
         const allInputData = {id: new Date().getTime().toString(),

         name:inputData}  
        setItems([...items,allInputData])
        setInputData("")
       }
        
   }   
   
  //edit items
 
   const EditItem = (id)=>{
    let newEditItem = items.find((elem)=>{
        return elem.id ===id  
    })
    console.log(newEditItem);

    setToggleSubmit(false)

    setInputData(newEditItem.name)

    setIsEditItem(id)
   }

   //delete the items
   
   const DeleteItem = (index) =>{
      const updateditems = items.filter((elem)=>{
          return index !== elem.id;
      })
      setItems(updateditems)
   }
   
   //remove all

   const RemoveAll = ()=>{
       setItems([])
   }
    
   //add data to localstorage

   useEffect(() => {    
       localStorage.setItem('lists',JSON.stringify(items))
   }, [items])

    return (
        <div className="main-div">
            <div className="child-div">
            <h1>Add your Todolist</h1> 
             
            <div className="addItems">
                <input  className='input'
                type="text" 
                placeholder = "Add items ..."
                value={inputData}
                onChange={(e)=>setInputData(e.target.value)}
                />
                <input className='date-input' type="date" onChange={e=>setDate(e.target.value)}/> 
                {
                    toggleSubmit ? <button className="btn" title='Add Item' onClick={addItem}>Add </button> :
                    <button className="far fa-edit add-btn" title='Update Item' onClick={addItem}> </button>
                }
                   
                         
             </div>

            <div className="showitems">

                {
                    items.map((currentelement)=>{
                        return (
                            <div className="eachitems" key={currentelement.id}>
                            <h3>{currentelement.name } :  {date}</h3>
                            <div className="todo-btn">
                            
                            <i className ="far fa-edit add-btn" 
                            title="Edit items"
                            onClick={()=>EditItem(currentelement.id)}></i>
                            
                            <i className ="far fa-trash-alt add-btn" 
                            title="Delete items"
                            onClick={()=>DeleteItem(currentelement.id)}></i>
                            <input type='checkbox'/>
                            </div>
                            
                       </div>
                        )
                    })
                }
                
            </div>

            <div className="showitems">
                <button className="clear-btn" onClick={RemoveAll}>clear all</button>
            </div>

            </div>
        </div>
    )
}

export default Todolist
 