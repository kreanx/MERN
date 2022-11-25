import Container from "@mui/material/Container";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
	const dispatch = useDispatch()
	const userData = useSelector((state) => state.auth.data)

	const [id, setId] = React.useState('')

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path="/" element={<Home userId={id} />} />
					<Route path="/posts/:id" element={<FullPost />} />
					<Route path="/posts/:id/edit" element={<AddPost />} />
					<Route path="/add-post" element={<AddPost />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
