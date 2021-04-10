//import React from "react";
import { NavLink } from "react-router-dom"
import { auth } from '../../firebase';

//import './App.css';
import Constact from "../Contacts.js";
import AllComplaint from "../AllComplaint.js";
import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "../../App.css";
//import { NavLink } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
const getModelStyle = ()=>{
  const top = 50;
  const left = 50;
  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper:{
    position: `absolute`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `2px slid #000`,
    boxShadow: theme.shadows[5],
    padding:theme.spacing(2, 4, 3),
  },
}))

const Common =(props)=> { 
  const classes = useStyles();
  const [modalStyle] = useState(getModelStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [ContactPage, setContactPage] = useState(true);
  //let count = 0;
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        //user LogIN
        //console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null);
        //user logOut
      }
    })
    return () =>{
      //perform cleanup action
      unsubscribe();
    }
  }, [user, username]);
  //signUp event handler 
  const signUp = (event)=>{
      // event.preventDefault();

      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) =>{
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((error)=> alert(error.message));

      setOpen(false);
  } 

//signIn event handler
  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }
  return (
  	<>
    <Modal open = {open} onClose = {() => setOpen(false)} >
          
          <div style={modalStyle} className={classes.paper}>
            <form className = "app__signup">
             <center > 
              <img 
                className="app__headerImage"
                src="http://www.instagam.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="img" />
              </center>
              <Input 
                placeholder="username"
                type="text"
                value = {username}
                onChange = {(e)=> setUsername(e.target.value)} />

              <Input 
                placeholder="email"
                type="text"
                value = {email}
                onChange = {(e)=> setEmail(e.target.value)} />

              <Input 
                placeholder="password"
                type="password"
                value = {password}
                onChange = {(e)=> setPassword(e.target.value)} />    
             
              <Button type="submit" onClick= {signUp}> Sign Up </Button>  
            </form>    
          </div>

       </Modal>

        <Modal open = {openSignIn} onClose = {() => setOpenSignIn(false)} >
          
          <div style={modalStyle} className={classes.paper}>
            <form className = "app__signup">

              <Input 
                placeholder="email"
                type="text"
                value = {email}
                onChange = {(e)=> setEmail(e.target.value)} />

              <Input 
                placeholder="password"
                type="password"
                value = {password}
                onChange = {(e)=> setPassword(e.target.value)} />    
             
              <Button type="submit" onClick= {signIn}> Sign In </Button>  
            </form>    
          </div>

        </Modal>
        <div className ="row">
                  <div className ="col-md-9 offset-md-1">
        <div className="app__header">    
            {user ? (
              <div className="twoButtonSet">
                <div className="LogoutButton">
                  <Button className="btn btn-danger" onClick={()=> auth.signOut()}>LOGOUT</Button>
                </div>
                <div className="ComplaintsButton">
                  <Button onClick={()=> setContactPage(true)}>Complaint Form</Button>
                  <Button onClick={()=> setContactPage(false)}>Complaints</Button>
                </div>
              </div>
            ):(

              <div className = "app__loginContainer">

                <Button onClick={()=> setOpenSignIn(true)}> Sign In</Button>
                <Button onClick={()=> setOpen(true)}> Sign Up</Button>
              </div>
            )}
          {/* Button which make modal appear*/}
      
        </div>
        </div></div>

        {user?.displayName ? (
          <div>
             {ContactPage?(
                <div className ="row">
                  <div className ="col-md-8 offset-md-2">
                    <Constact />
                  </div>
                </div>
              ):(
                <AllComplaint />
              )}
          </div>
        ):(
          <>
              <section id="header" className="d-flex align-items-center">
                <div className="container-fluid nav_bg">
                  <div className="row">
                    <div className="col-10 mx-auto">
                      <div className="row">

                      <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column paddUpp">
                        <h1>
                          {props.brand} <strong className="brand-name">{props.brandName}</strong>
                        </h1>
                        <h2 className="my-3">
                          {props.info}
                        </h2>
                        <div className="my-3">
                          <div >
                           {props.btn}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 order-1 order-lg-2 header-img">
                        <img src={props.IMG} className="img-fluid animated" alt="home img" />
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
            </section>
        </>
        )}
        

    </>
  );
}

export default Common;