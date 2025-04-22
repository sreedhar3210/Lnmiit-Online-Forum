import React from "react"
import { useParams } from "react-router-dom"

const Test = () => {

	const normalParam = "234098"
	const { query } = useParams();
	return(
		<div>
			<p>Hello from test component</p>
			<p>query is {query}, normal parameter is {normalParam}</p>
		</div>
	);
}

export default Test;