import React,{ useState } from "react";
import "./Header.css"
import logo from "../../assets/logo.svg"
import {Button,Paper,Tabs,Tab,FormControl,InputLabel,Input, FormHelperText} from "@material-ui/core"
import Modal from "react-modal"

const Header = (props) =>{ 

        const [loginModelState,setOpen] = useState(false);
        const [value,setVal] =useState(0);
        const [sessionLogged, setSessionState] = useState(sessionStorage.getItem("access-token")== null ? false : true);

        //Login 
        const [username, setUserName] = useState([]);
        const [password, setPassword] = useState([]);

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

        const tabsHandler = (e,val) => {
            //console.warn(val)
            setVal(val);
        }

        const logoutSessionHandler = (e) => {
            sessionStorage.removeItem("uuid");
            sessionStorage.removeItem("access-token");
            setSessionState(false);
        }

        const directToBookShowPage = (id) => {
            props.history.push('/bookshow/' + id);
        }

        const openPopupModalHandler = () => {
            setOpen(true);
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

        }

        const closePopupModalHandler = () => {
            setOpen(false);
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
        }

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

        const loginAuthenticationHandler = () => {
            username === "" ? setCNameForUname("blockClass") : setCNameForUname("noneClass");
            //console.log(unameReq)
            password === "" ? setCNameforPassword("blockClass") : setCNameforPassword("noneClass");
        }

        const registerUserHandler = () => {
            firstname === "" ? setCNameforFName("blockClass" ) : setCNameforFName("noneClass");
            lastname === "" ? setCNameforLName("blockClass") : setCNameforLName("noneClass");
            email === "" ? setCNameforEmail("blockClass") : setCNameforEmail("noneClass");
            regPassword === "" ? setCNameforRegPassword("blockClass") : setCNameforRegPassword("noneClass");
            contact === "" ? setCNameforContact("blockClass") : setCNameforContact("noneClass");
        }

        return(
            <div className="header">
                <img src={logo} alt="logo" className="app-logo"/>
                {(sessionLogged==false) ? <Button className="headerButton" variant="contained" onClick={openPopupModalHandler}>Login</Button>
                   : <Button className="headerButton" variant="contained" onClick={logoutSessionHandler}>Logout</Button>
                }
                
                {
                    (sessionLogged==false && props.isDetailsPage==="true") ?
                    <Button className="headerButton" variant="contained" color="primary" onClick={() => setOpen(!loginModelState)}>Book Show</Button> : ""
                }

                {
                    (sessionLogged==true && props.isDetailsPage==="true") ?
                    <Button className="headerButton" variant="contained" color="primary" onClick={() => directToBookShowPage(props.id)}>Book Show</Button> : ""
                }

                <Modal isOpen={loginModelState} className="modal" onRequestClose={closePopupModalHandler} ariaHideApp={false}>
                        <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={tabsHandler}>//default tab login
                            <Tab label="LOGIN" />
                            <Tab label="REGISTER" />
                        </Tabs>

                    <TabPanel value={value} index={0}>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" username={username} onChange={userNameHandler}/>
                        <FormHelperText className={unameReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" password={password} onChange={passwordChangeHandler}/>
                        <FormHelperText className={passwordReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>

                    <Button className="modalButton" color="primary" variant="contained" onClick={loginAuthenticationHandler}>Login</Button>
                    </TabPanel>

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
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="regPassword">Password</InputLabel>
                        <Input id="regPassword" type="password" regpassword={regPassword} onChange={regPasswordHandler}/>
                        <FormHelperText className={regPasswordReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <FormControl className="formC" required>
                        <InputLabel htmlFor="contact">Contact No.</InputLabel>
                        <Input id="contact" type="text" contact={contact} onChange={contactHandler}/>
                        <FormHelperText className={contactReq}>required</FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
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