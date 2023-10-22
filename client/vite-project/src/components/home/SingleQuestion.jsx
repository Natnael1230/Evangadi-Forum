import React, { useContext, useEffect, useState } from "react";
import "./SingleQuestion.css";
import { stateValue } from "./context";
import { useNavigate, useParams } from "react-router-dom";
import img from "./image/img1.png";
function SingleQuestion() {
	let navigate=useNavigate();
	//state to store question from server
	const [question, setQuestion] = useState({});

	//state to store answer from server
	const [answer, setAnswer] = useState([]);

	//state to store user answer
	const [userAnswer,setUserAnswer]= useState("");

	//state to store answer response from server
	const [postResponse,setPostResponse]=useState("");

	//get the url param to fetch the specific question
	const { questionId } = useParams();
	const token = localStorage.getItem("token");
	useEffect(() => {
		//fetch to get single question title and description
		fetch("http://localhost:1234/api/questions/single-question/" + questionId, {
			method: "GET",
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setQuestion(data?.oneQuestion[0]);
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		//fetch to get single question answers
		fetch("http://localhost:1234/api/answers/getanswer/" + questionId, {
			method: "GET",
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setAnswer(data?.allAnswer);
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	}, []);

	function questionAnswer(e) {
		e.preventDefault();
		
		let userAnswerData = {
			answer: userAnswer,
		};
		//fetch to post answer for specific question
		fetch("http://localhost:1234/api/answers/postanswer/" + questionId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + token,
			},
			body: JSON.stringify(userAnswerData),
		})
			.then((data) => data.json())
			.then((data) => {
				console.log(data.msg);
				setPostResponse(data.msg)
			e.target.reset()
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="mainQuestionWrapper">
			<div>
				<h1>single question page</h1>
			</div>
			<div>
				<h2>{question?.title}</h2>
			</div>
			<div className="singleQDescritpion">
				<h4>{question?.description}</h4>
			</div>
			<h1 className="community">Answer From The Community</h1>
			{answer?.map((singleAnswer) => {
				let theAnswers = (
					<div className="singleQAnswers">
						<div>
							<img className="questionImage" src={img} alt="" />
							<h2>{singleAnswer.username}</h2>
						</div>
						<div>
							<h2>{singleAnswer?.answer}</h2>
						</div>
					</div>
				);
				return theAnswers;
			})}

			<div className="questionAnswer">
				<h1>Answer The Top Question</h1>
				<h3>Go to Question page</h3>
				<h2 className="blue">{postResponse}</h2>

				<form onSubmit={questionAnswer}>
					<textarea
						onChange={(e) => setUserAnswer(e.target.value)}
						name=""
						id=""
						cols="121"
						rows="20"
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
