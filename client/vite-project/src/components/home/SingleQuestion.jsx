import React, { useContext, useEffect, useState } from "react";
import "./SingleQuestion.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "./image/img1.png";
import axios from "./axios";
function SingleQuestion() {
	let navigate = useNavigate();
	//state to store question from server
	const [question, setQuestion] = useState({});

	//state to store answer from server
	const [answer, setAnswer] = useState([]);

	//state to store user answer
	const [userAnswer, setUserAnswer] = useState("");

	//state to store answer response from server
	const [postResponse, setPostResponse] = useState("");

	//get the url param to fetch the specific question
	const { questionId } = useParams();
	const token = localStorage.getItem("token");

	useEffect(() => {
		//fetch to get single question title and description
		try {
			axios
				.get("/questions/single-question/" + questionId, {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					// console.log(response);
					// console.log(response?.data?.allQuestion);
					// setQuestion(response?.data.allQuestion);
					setQuestion(response?.data?.oneQuestion[0]);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log("in catch block");
			console.log(error);
		}



		// fetch("http://localhost:1234/api/questions/single-question/" + questionId, {
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
		// 		setQuestion(data?.oneQuestion[0]);
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});


			try {
				axios
					.get("/answers/getanswer/" + questionId, {
						headers: {
							authorization: "Bearer " + token,
						},
					})
					.then((response) => {
						// console.log(response);
						// console.log(response?.data?.allQuestion);
						// setQuestion(response?.data.allQuestion);
						setAnswer(response?.data?.allAnswer);
					})
					.catch((error) => {
						console.error("Error:", error);
						navigate("/");
					});
			} catch (error) {
				console.log("in catch block");
				console.log(error);
			}







		//fetch to get single question answers
		// fetch("http://localhost:1234/api/answers/getanswer/" + questionId, {
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
		// 		setAnswer(data?.allAnswer);
		// 	})
		// 	.catch((error) => {
		// 		console.log("Error:", error);
		// 	});
	}, []);

	// useEffect(()=>{
	//
	// },[answer])

	function questionAnswer(e) {
		e.preventDefault();
		if (userAnswer) {
			setUserAnswer("");
			// let userAnswerData = {
			// 	answer: userAnswer,
			// };
				console.log("token ", token);
				axios
					.post(
						"/answers/postanswer/" + questionId,
						{
							answer: userAnswer,
						},
						{
							headers: {
								authorization: "Bearer " + token,
							},
						}
					)
					.then((response) => {
						console.log(response);
						setPostResponse(response.data.msg);
						e.target.reset();
					})
					.catch((err) => {
						console.log(err);
					});
		}else {
			return setPostResponse("answer can't be empty");
		}




			//fetch to post answer for specific question
		// 	fetch("http://localhost:1234/api/answers/postanswer/" + questionId, {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			authorization: "Bearer " + token,
		// 		},
		// 		body: JSON.stringify(userAnswerData),
		// 	})
		// 		.then((data) => data.json())
		// 		.then((data) => {
		// 			setPostResponse(data.msg);
		// 			e.target.reset();
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// } else {
		// 	return setPostResponse("answer can't be empty");
		// }

		// fetch("http://localhost:1234/api/answers/getanswer/" + questionId, {
		// 	method: "GET",
		// 	headers: {
		// 		authorization: "Bearer " + token,
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log("fetch again");
		// 		setAnswer(data?.allAnswer);
		// 	})
		// 	.catch((error) => {
		// 		console.log("Error:", error);
		// 	});
	}

	return (
		<div className="mainQuestionWrapper container">
			<div>
				<h1>Question</h1>
			</div>
			<div>
				<h4>{question?.title}</h4>
			</div>
			<div className="singleQDescritpion">
				<p>{question?.description}</p>
			</div>
			<h2 className="community">Answer From The Community</h2>
			{answer?.map((singleAnswer) => {
				let theAnswers = (
					<div className="singleQAnswers">
						<div>
							<img className="questionImage" src={img} alt="" />
							<p>{singleAnswer.username}</p>
						</div>
						<div>
							<h4>{singleAnswer?.answer}</h4>
						</div>
					</div>
				);
				return theAnswers;
			})}

			<div className="questionAnswer">
				<h2>Answer The Top Question</h2>
				<Link to="/allquestion">
					<p>Go to Question page</p>
				</Link>

				<h2 className="blue">{postResponse}</h2>

				<form onSubmit={questionAnswer}>
					<textarea
						className="textArea"
						onChange={(e) => setUserAnswer(e.target.value)}
						name=""
						id=""
						cols=""
						rows=""
						placeholder="Answer description..."
					></textarea>
					<button className="questionAnswer-button" type="submit">
						Post Your Answer
					</button>
				</form>
			</div>
		</div>
	);
}

export default SingleQuestion;
