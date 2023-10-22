import React, { useEffect, useState, useContext } from "react";
import "./AllQuestions.css";
import { stateValue } from "./context";
import { Link, useNavigate } from "react-router-dom";
import img from "./image/img1.png";

function AllQuestions() {
	let { username, setUserName } = useContext(stateValue);
	let navigate = useNavigate();
	let lastQuestions;
	const url = "http://localhost:1234/api/questions/all-questions";
	//get token from local storage
	 const token = localStorage.getItem("token");

	 //state to store the questions from the server
	let [question, setQuestion] = useState([]);

	useEffect(() => {
		fetch(url, {
			method: "GET",
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setQuestion(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	if (question) {
		lastQuestions = question.allQuestion;
	}

	function click(singleQ) {
		console.log(singleQ?.questionid);
				navigate = navigate("/SingleQuestion/"+singleQ?.questionid);
	}

	return (
		<div className="main">
			<div className="flexWrapper">
				<button className="Abutton" onClick={()=>navigate("/askQuestion")}>
					Ask Question
				</button>
				<input type="text" placeholder="Search Questions" className="Ainput" />
				<h1>Welcome {username}</h1>
			</div>

			<div className="allQuestions">
				<h1> Questions</h1>
				{lastQuestions?.map((singleQuestion) => {
					let theQuestion = (
						<div className="questions" onClick={() => click(singleQuestion)}>
							<div>
								<img className="questionImage" src={img} alt="" />
								<h2>{singleQuestion.username}</h2>
							</div>

							<h2>{singleQuestion?.title}</h2>
						</div>
					);
					return theQuestion;
				})}
			</div>
		</div>
	);
}

export default AllQuestions;
