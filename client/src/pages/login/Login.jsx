import "./login.css";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);
	const history = useHistory();

	const [validE, setValidE] = useState(0);
	const [validP, setValidP] = useState(0);

	function validateEmail() {
		if (email.current.value.length === 0) {
			document.getElementById("emailError").innerHTML =
				"Please enter an email address!";
			console.log("email length is 0");
			setValidE(0);
		} else if (
			!String(email.current.value).match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			console.log("email type is invalid");
			setValidE(0);
			document.getElementById("emailError").innerHTML =
				"Please enter a valid email address!";
		} else {
			document.getElementById("emailError").innerHTML = "";
			setValidE(1);
		}
	}

	function validatePassword() {
		// add regex check
		// var re = ^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$;
		if (password.current.value.length === 0) {
			document.getElementById("passError").innerHTML = "Please enter password!";
			console.log("password length is 0");
			setValidP(0);
		} else if (
			!(
				password.current.value.length >= 8 &&
				password.current.value.length <= 16 &&
				(password.current.value.match(/(?=.*[^a-zA-Z0-9])/) &&
					!/\s/g.test(password.current.value))
			)
		) {
			document.getElementById("passError").innerHTML =
				"Please enter a valid password!";
			console.log("password is not valid type");
			setValidP(0);
		} else {
			document.getElementById("passError").innerHTML = "";
			setValidP(1);
		}
	}

	const handleClick = async e => {
		e.preventDefault();
		if (validE + validP === 2) {
			
			/*loginCall(
				{ email: email.current.value, password: password.current.value },
				dispatch
			);*/
			const userCred = {
				//TODO check to see if this is everything user needs
				email: email.current.value,
				password: password.current.value,
				
			};

			try{
				const res = await axios.post("/auth/login",userCred);
				dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
				history.push("/home");
			}catch(err){
				document.getElementById("overallError").innerHTML = 
				"Invalid credentials!";
		   		console.log("Invalid credentials!")
			}
			
			
		} else {
			document.getElementById("overallError").innerHTML =
				"Please fill all fields!";
		}
	};


	const redirect = () => {
		history.push("/register");
	};

	
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">P u r d u e C i r c l e</h3>
					<span className="loginDesc">
						Connect with others at Purdue through this brand-new social media
						app, designed just for Boilermakers!
					</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<input
							placeholder="Email"
							type="email"
							className="loginInput"
							ref={email}
							onBlur={validateEmail}
						/>
						<div id="emailError" style={{ color: "red" }}></div>
						<input
							placeholder="Password"
							type="password"
							className="loginInput"
							ref={password}
							onBlur={validatePassword}
						/>
						<div id="passError" style={{ color: "red" }}></div>
						<button className="loginButton">
							{isFetching ? (
								<CircularProgress style={{ color: "white" }} />
							) : (
								"Login"
							)}
						</button>
						{/*<span className="loginForgot">Forgot Password?</span>*/}
						<button className="loginRegisterButton" onClick={redirect}>
							Register
						</button>
						<div id="overallError" style={{ color: "red" }}></div>
					</form>
				</div>
			</div>
		</div>
	);
}
