import React, { useState } from "react";
import "./AskQuestion.css";
function AskQuestion() {
	//state to store question title from the user
	let [titleValue, setTitleValue] = useState("");
	//state to store discription from the user
	let [discriptionValue, setDiscriptionValue] = useState("");
	//state to store server response
	let [questionResponse, setQuestionResponse] = useState("");

	function submit(e) {
		e.preventDefault();
		const token = localStorage.getItem("token");
		let questionData = {
			title: titleValue,
			description: discriptionValue,
		};
		fetch("http://localhost:1234/api/questions/new-question", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + token,
			},
			body: JSON.stringify(questionData),
		})
			.then((response) => response.json())
			.then((data) => {
				setQuestionResponse(data.msg);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
	return (
		<>
			<div className="askQuestion">
				<h1>Steps to write a good question</h1>

				<ul className="">
					<li>Summerize your problem in a one-line title.</li>
					<li>Describe your problem in more detail.</li>
					<li>Describe what you tried and what you expected to happen.</li>
					<li>Review your question and post it to the site.</li>
				</ul>
			</div>

			<div className="askQuestion">
				<br />
				<br />
				<br />
				<br />
				<h1>Ask a public question</h1>
				<p>Go to Question page</p>
				<br />
				<h1 className="blue">{questionResponse}</h1>
			</div>

			<form onSubmit={submit}>
				<div className="askQuestion">
					<input
						onChange={(e) => setTitleValue(e.target.value)}
						type="text"
						placeholder="Title"
					/>
					<br />

					<textarea
						onChange={(e) => setDiscriptionValue(e.target.value)}
						name=""
						id=""
						cols="121"
						rows="20"
						placeholder="Question description..."
					></textarea>
					<br />
					<button className="allQuestion-button" type="submit">
						Post Your Question
					</button>
				</div>
			</form>
		</>
	);
}

export default AskQuestion;
