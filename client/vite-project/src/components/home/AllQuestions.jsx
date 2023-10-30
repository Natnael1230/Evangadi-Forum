import React, { useEffect, useState, useContext } from "react";
import "./AllQuestions.css";
import axios from "./axios";
import { stateValue } from "./context";
import { Link, useNavigate } from "react-router-dom";
import img from "./image/img1.png";

function AllQuestions() {
	let { username, setusername } = useContext(stateValue);
	let navigate = useNavigate();
	const url = "http://localhost:1234/api/questions/all-questions";
	//get token from local storage
	const token = localStorage.getItem("token");

	//state to store the questions from the server
	let [question, setQuestion] = useState([]);

	//state to store user search input
	// let [userSearch, setUserSearch] = useState("");

	useEffect(() => {
		// console.log("use effect");
		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					console.log(response);
					console.log(response?.data?.allQuestion);
					setQuestion(response?.data.allQuestion);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log("in catch block");
			console.log(error);
		}

		// fetch(url, {
		// 	method: "GET",
		// 	headers: {
		// 		authorization: "Bearer " + token,
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		if (
		// 			data.msg === "token not provide" ||
		// 			data.msg === "Authentication Invalid"
		// 		) {
		// 			console.log("not provide");
		// 			navigate("/");
		// 		}

		// 		console.log(data.allQuestion);
		// 		setQuestion(data.allQuestion);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});
	}, []);

	function click(singleQ) {
		console.log(singleQ?.questionid);
		navigate = navigate("/Singlequestion/" + singleQ?.questionid);
	}

	function search(e) {
		console.log(e?.target.value);

		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
						search: e.target.value,
					},
				})
				// .then((response) => response.json())
				.then((response) => {
					console.log(response.data.serachQuestions);

					if (response.data.serachQuestions) setQuestion(response.data.serachQuestions);
					else setQuestion(response.data.allQuestion);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} catch (error) {
			console.log("in catch block");
			console.log(error);
		}






		// fetch(url, {
		// 	method: "GET",
		// 	headers: {
		// 		authorization: "Bearer " + token,
		// 		search: e.target.value,
		// 	},
		// 	// body: userSearch,
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data.serachQuestions);

		// 		if (data.serachQuestions) setQuestion(data.serachQuestions);
		// 		else setQuestion(data.allQuestion);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});
	}

	return (
		<div className="main container">
			<div className="flexWrapper row justify-content-between">
				<button
					className="Abutton col-12 col-sm-3"
					onClick={() => navigate("/askquestion")}
				>
					Ask Question
				</button>
				<input
					type="text"
					placeholder="Search Questions"
					className="Ainput col-12 col-sm-3"
					onChange={search}
				/>
				<h4 className="col-12 col-sm-3">Welcome: {username}</h4>
			</div>

			<div className="allQuestions">
				<h2>Questions</h2>
				{question?.map((singleQuestion) => {
					let theQuestion = (
						<div className="questions" onClick={() => click(singleQuestion)}>
							<div className="">
								<img className="questionImage" src={img} alt="" />
								<p>{singleQuestion?.username}</p>
							</div>

							<h4>{singleQuestion?.title}</h4>
						</div>
					);
					return theQuestion;
				})}
			</div>
		</div>
	);
}

export default AllQuestions;
