import React,{ useState } from "react";
import "./Header.css"
import logo from "../../assets/logo.svg"
import {Button,Paper,Tabs,Tab,FormControl,InputLabel,Input, FormHelperText, Typography} from "@material-ui/core"
import Modal from "react-modal"
import { Link } from "react-router-dom";

const Header = (props) =>{ 

        const [loginModelState,setOpen] = useState(false);
        const [value,setVal] =useState(0);
        const [sessionLogged, setSessionState] = useState(sessionStorage.getItem("access-token")== null ? false : true);

        //Login 
        const [username, setUserName] = useState([]);
        const [logpassword, setPassword] = useState([]);

        //Register
        const [firstname, setFirstName] = useState([]);
        const [lastname, setLastName] = useState([]);
        const [email, setEmail] = useState([]);
        const [regPassword, setRegPassword] = useState([]);
        const [contact, setContact] = useState([]);

        //Required helper text - set classname 
        const [unameReq, setCNameForUname] = useState("noneClass");
        const [passwordReq, setCNameforPassword] = useState("noneClass");
        const [fnameReq, setCNameforFName ] =useState("noneClass");
        const [lnameReq, setCNameforLName] = useState("noneClass");
        const [emailReq, setCNameforEmail] = useState("noneClass");
        const [regPasswordReq, setCNameforRegPassword] = useState("noneClass");
        const [contactReq, setCNameforContact] = useState("noneClass");

        const [loginSuccess, setLoginSuccess] = useState([0]);
        const [registerSuccess, setRegisterSuccess] = useState([0]);

        const tabsHandler = (e,val) => {
            //console.warn(val)
            setVal(val);
        }

        const logoutSessionHandler = (e) => {
            sessionStorage.removeItem("uuid");
            sessionStorage.removeItem("access-token");
            setSessionState(false);
        }

        const openPopupModalHandler = () => {
            setOpen(true);

            //clear modal
            setUserName("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setRegPassword("");
            setContact("");

            //clear required for new modal 
            setCNameForUname("noneClass");
            setCNameforPassword("noneClass");
            setCNameforFName("noneClass");
            setCNameforLName("noneClass");
            setCNameforEmail("noneClass");
            setCNameforRegPassword("noneClass");
            setCNameforContact("noneClass");

            setLoginSuccess(0);
            setRegisterSuccess(0);

        }

        const closePopupModalHandler = () => {
            setOpen(false);

            //clear modal after close
            setUserName("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setRegPassword("");
            setContact("");

            setCNameForUname("noneClass");
            setCNameforPassword("noneClass");
            setCNameforFName("noneClass");
            setCNameforLName("noneClass");
            setCNameforEmail("noneClass");
            setCNameforRegPassword("noneClass");
            setCNameforContact("noneClass");

            setLoginSuccess(0);
            setRegisterSuccess(0);
        }

        // Handlers

        const  userNameHandler = (e) => {
            setUserName( e.target.value);
        }

        const passwordChangeHandler = (e) => {
            setPassword(e.target.value);
        }

        const firstNameHandler = (e) => {
            setFirstName( e.target.value);
        }

        const lastNameHandler = (e) => {
            setLastName( e.target.value);
        }

        const emailHandler = (e) => {
            setEmail( e.target.value);
        }

        const regPasswordHandler = (e) => {
            setRegPassword( e.target.value);
        }

        const contactHandler = (e) => {
            setContact( e.target.value);
        }

        //Login
        const loginAuthenticationHandler = (e) => {
            let dataLog = null;
            
            username === "" ? setCNameForUname("blockClass") : setCNameForUname("noneClass");
            //console.log(unameReq)
            logpassword === "" ? setCNameforPassword("blockClass") : setCNameforPassword("noneClass");

            if(username!==null && username!=="" && logpassword!==null && logpassword!==""){
                e.preventDefault();
                //const loginParameters = window.btoa(username + ":" + password);
                //console.log(window.btoa(logpassword))
                
                fetch(props.baseUrl+"auth/login",{
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: "Basic " + window.btoa(username+ ":" +logpassword),
                        },
                    body: dataLog,
                }).then(async(response) => response.json()).then((data) => {
                    if(!data.message){
                        closePopupModalHandler();
                        setUserName("");
                        setPassword("");
                        sessionStorage.setItem("access-token",data.id);
                        setLoginSuccess(2);
                        setSessionState(true);
                    }else{
                        setLoginSuccess(1);
                    }
                }).catch((error) => {alert(error)})
            }
        }

        //Register
        const registerUserHandler = async(e) => {
            firstname === "" ? setCNameforFName("blockClass" ) : setCNameforFName("noneClass");
            lastname === "" ? setCNameforLName("blockClass") : setCNameforLName("noneClass");
            email === "" ? setCNameforEmail("blockClass") : setCNameforEmail("noneClass");
            regPassword === "" ? setCNameforRegPassword("blockClass") : setCNameforRegPassword("noneClass");
            contact === "" ? setCNameforContact("blockClass") : setCNameforContact("noneClass");
            
            if(firstname!=="" && firstname!==null && 
            lastname!=="" && lastname!==null && 
            email!=="" && email!==null && 
            regPassword!=="" && regPassword!==null && 
            contact!=="" && contact!==null)
            {
                let registerData = JSON.stringify({
                    email_address:email,
                    first_name : firstname,
                    last_name : lastname,  
                    mobile_number : contact,
                    password : regPassword
                })
                console.log(registerData);
                e.preventDefault();
                fetch(props.baseUrl+"signup",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            },
                        body: registerData}).then((response) => response.json()).then((data) => {
                        if(!data.message){
                            setRegisterSuccess(2);
                            //console.log(data.message);
                        }else{
                            setRegisterSuccess(1);
                            console.log(data.message);
                        }
                    }).catch((error) =>{
                        alert(error);
                    })
            }        
        }

        return(
            <div className="header">
                <img src={logo} alt="logo" className="app-logo"/>
                {/* session logged - value based on access token to tell user state */}
                {(sessionLogged===false) ? 
                    <Button className="headerButton" color="default" variant="contained" onClick={openPopupModalHandler}>Login</Button>
                   : <Button className="headerButton" color="default" variant="contained" onClick={logoutSessionHandler}>Logout</Button>
                }
                
                {/* Book Show button for not logged in user */}
                {
                    (sessionLogged==false && props.isDetailsPage==="true") ?
                        <Button className="headerButton" variant="contained" color="primary" onClick={() => setOpen(!loginModelState)}>Book Show</Button>  : ""
                }
                {/* Book show button for logged in user */}
                {
                    (sessionLogged==true && props.isDetailsPage==="true") ?
                    <Link to={"/bookshow/"+props.id}>
                        <Button className="headerButton" variant="contained" color="primary">Book Show</Button>
                    </Link> : ""
                }

                <Modal isOpen={loginModelState} className="modal" onRequestClose={closePopupModalHandler} ariaHideApp={false}>
                        <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={tabsHandler}>//default tab login
                            <Tab label="LOGIN" />
                            <Tab label="REGISTER" />
                        </Tabs>
                        
                    {/* Login Form */}
                    <TabPanel value={value} index={0}>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" username={username} onChange={userNameHandler}/>
                        <FormHelperText className={unameReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <form>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="logpassword">Password</InputLabel>
                        <Input autoComplete="off" id="logpassword" type="password" logpassword={logpassword} onChange={passwordChangeHandler}/>
                        <FormHelperText className={passwordReq}>required</FormHelperText>
                    </FormControl></form>
                    <br/>
                    <br/>
                    {loginSuccess==1 ? 
                        <Typography className="logRegMessage">Unsuccessful Login Attempt</Typography>
                        :""
                    }
                    
                    <Button className="modalButton" color="primary" variant="contained" onClick={loginAuthenticationHandler}>Login</Button>
                    </TabPanel>
                    
                    {/* Register Form */}
                    <TabPanel value={value} index={1}>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="firstname">First Name</InputLabel>
                        <Input id="firstname" type="text" firstname={firstname} onChange={firstNameHandler}/>
                        <FormHelperText className={fnameReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="lastname">Last Name</InputLabel>
                        <Input id="lastname" type="text" lastname={lastname} onChange={lastNameHandler}/>
                        <FormHelperText className={lnameReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" type="email" email={email} onChange={emailHandler}/>
                        <FormHelperText className={emailReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <form>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="regPassword">Password</InputLabel>
                        <Input autoComplete="off" id="regPassword" type="password" regpassword={regPassword} onChange={regPasswordHandler}/>
                        <FormHelperText className={regPasswordReq}>required</FormHelperText>
                    </FormControl>
                    <br/></form>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="contact">Contact No.</InputLabel>
                        <Input id="contact" type="text" contact={contact} onChange={contactHandler}/>
                        <FormHelperText className={contactReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    {registerSuccess==2 ? 
                        <Typography className="logRegMessage">Registration Successful. Please Login!</Typography>
                        :""
                    }
                    <Button className="modalButton" color="primary" variant="contained" onClick={registerUserHandler}>REGISTER</Button>
                    
                    </TabPanel>
                </Modal>
            </div>
        )
    }

function TabPanel(props){
    const {children,value,index} = props;
    //console.log(value,index,children)
    return(<div>
        {value===index && (
            <h1>{children}</h1>
        )}
    </div>)
}

export default Header;