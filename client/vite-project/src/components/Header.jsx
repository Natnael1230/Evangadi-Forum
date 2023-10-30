import React, { useContext, useState } from 'react';
import "./Header.css";
import img from "./home/image/img2.png";
import { Link, useNavigate } from 'react-router-dom';
import { stateValue } from './home/context';

function Header() {
	let navigate=useNavigate();
	let { username, setusername } = useContext(stateValue);
	function logoutHandler(){
		localStorage.setItem("token", "");
		setusername("");
		navigate("/");
		// window.location.reload();
	}
  return (
		<div>
			<div className="mainHeaderWrapper container">
				<div className="row">
					<div className="col-6">
						<Link to="/allquestion">
							<img className="evangadiImage" src={img} alt="evangadi logo" />
						</Link>
					</div>
					<div className="d-none d-md-block col-md-6">
						<ul className="lists">
							<li className="">Home</li>
							<li className="">How it works</li>
							<div>
								<li>
									{username ? (
										<button className="button" onClick={logoutHandler}>
											logout
										</button>
									) : (
										<button className="button">login</button>
									)}
								</li>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
