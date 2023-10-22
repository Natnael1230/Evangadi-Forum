import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SharedPage from "./components/SharedPage";
import NotFound from "./components/NotFound";
import AllQuestions from "./components/home/AllQuestions";
import { stateValue } from "./components/home/context";
import SingleQuestion from "./components/home/SingleQuestion";
import AskQuestion from "./components/home/AskQuestion";

function App() {
	let [username,setUserName] = useState("");
	const token = localStorage.getItem("token");
	console.log("this is the token", token);
	let navigate = useNavigate();
	useEffect(() => {
		console.log("app.js use effect");
		fetch("http://localhost:1234/api/users/check", {
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setUserName(data.username);
				console.log("in the data function");
				console.log(data.msg);
				if (
					data.msg === "token not provide" ||
					data.msg === "Authentication Invalid"
				)
					navigate("/");
			})
			.catch((error) => {
				console.log("in the catch function");
				navigate("/");
			});
	}, []);


	return (
		<>
			<stateValue.Provider
				value={{ username, setUserName }}
			>
				<Routes>
					<Route path="/" element={<SharedPage />}>
						<Route path="/" element={<Home />} />
						<Route path="/allquestion" element={<AllQuestions />} />
						<Route path="*" element={<NotFound />} />
						<Route path="/singlequestion/:questionId" element={<SingleQuestion />} />
						<Route path="/askQuestion" element={<AskQuestion />}/>
					</Route>
				</Routes>
			</stateValue.Provider>
		</>
	);
}

export default App;
