import React, { useEffect, useState } from "react";
import "./components/css/bootstrap.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SharedPage from "./components/SharedPage";
import NotFound from "./components/NotFound";
import AllQuestions from "./components/home/AllQuestions";
import { stateValue } from "./components/home/context";
import SingleQuestion from "./components/home/SingleQuestion";
import AskQuestion from "./components/home/AskQuestion";
import axios from "./components/home/axios";

function App() {
	let [username, setusername] = useState("");
	const token = localStorage.getItem("token");
	console.log("this is the token", token);
	let navigate = useNavigate();
	// useEffect(() => {
	// console.log("app.js use effect");

	try {
		axios
			.get("/users/check/", {
				headers: {
					authorization: "Bearer " + token,
				},
			})
			.then((response) => {
				if (response.data.username) {
					setusername(response.data.username);
					console.log("user name", username);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				// navigate("/");
			});
	} catch (error) {
		console.log("in catch block");
		console.log(error);
	}

	// fetch("http://localhost:1234/api/users/check", {
	// 	headers: {
	// 		authorization: "Bearer " + token,
	// 	},
	// })
	// 	.then((data) => data.json())
	// 	.then((data) => {
	// 		// console.log(data);
	// 		if(data.username){
	// 			setusername(data.username);
	// 			console.log("user name",username);
	// 		}

	// 		console.log("in the data function");
	// 		console.log(data.msg);
	// 		// if (
	// 		// 	data.msg === "token not provide" ||
	// 		// 	data.msg === "Authentication Invalid"
	// 		// ){
	// 		// 	console.log("not provide");
	// 		// 	navigate("/");
	// 		// }

	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 		// console.log("in the catch function");
	// 		// navigate("/");
	// 	});
	// }, []);

	return (
		<>
			<stateValue.Provider value={{ username, setusername }}>
				<Routes>
					<Route path="/" element={<SharedPage />}>
						<Route path="/" element={<Home />} />
						<Route path="/allquestion" element={<AllQuestions />} />
						<Route path="*" element={<NotFound />} />
						<Route
							path="/singlequestion/:questionId"
							element={<SingleQuestion />}
						/>
						<Route path="/askquestion" element={<AskQuestion />} />
					</Route>
				</Routes>
			</stateValue.Provider>
			
		</>
	);
}

export default App;
