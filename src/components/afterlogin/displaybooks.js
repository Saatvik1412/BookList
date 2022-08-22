import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import "./styles.css"
import Toast from "./Toast"
import Update from "./update"

export default function Displaybooks() {
    const [show,setShow]=useState(false);
    const [change,setChange]=useState(false);
    // const [bookItem,setItem]=useState();
    const [books, setBooks]=useState(([{
        title:"",
        username:"",
        uid:"",
        read: "",
        sDate: "",
        eDate: "",
        rating: ""
    }]))

    const [uname1, setUname]=useState();
    useEffect(() => {
        fetch("http://localhost:3000/viewbooks")
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(jsonRes => setBooks(jsonRes));
        setUname(localStorage.getItem("user"));
    }, [])

   function Delete(id){
                setBooks(books.filter(function (w){
                    if(w._id!==id)
                        return w;
                }));
                axios.delete(`http://localhost:3000/deletebook/${id}`)
                .then(res=>
                    console.log(res)
                    
                )
        
    }
    return(
        <>
        <div className="viewlist-element" >
        <div className="view"></div>
        <div className="view"> <h1>Title</h1></div> 
        <div className="view"><h1>Author</h1></div>
        <div className="view"><h1>Status</h1></div>
        <div className="view"><h1>Started on</h1></div>
        <div className="view"><h1>Ended on</h1></div>
        <div className="view"><h1>Rating</h1></div>
        
        </div>
        {
    books.map((book) =>{
        let thumbnail = book.uid;
        let title=book.title;
        let readt="Completed";
        if(book.read==="false"){
            readt="Completed";
        }
        if(book.read==="true"){  
            readt="Want to read"
        }
        if(book.username===uname1){
        return(
            <>
        <div className="viewlist-element" >
                 <div className="view"><h1>{thumbnail}</h1></div>
                 <div className="view"> <h1>{title}</h1></div> 
                 <div className="view"><h1>{book.author}</h1></div>
                 <div className="view"><h1>{readt}</h1></div>
                 <div className="view"><h1>{book.sDate}</h1></div>
                 <div className="view"><h1>{book.eDate}</h1></div>
                 <div className="view"><h1>{book.rating}</h1></div>
                 <div className="view"><button className="btn-view" onClick={()=>{setShow(true)}}><i class="fas fa-edit fa-lg"></i></button></div>
                 <div className="view"><button className="btn-view1" onClick={() => { Delete(book._id)}}><i height="30" width="30" class="fa fa-trash" aria-hidden="true"></i></button></div>
                 </div>
            <Update show={show} item={book} onClose={()=>setShow(false)}/>
            </>
    )
        }
    })

    }
    </>
    )
}

