import React, { useEffect, useState } from "react";
import { ListGroup, Placeholder } from "react-bootstrap";
import { ListGroupItem } from 'react-bootstrap';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [tasks, setTask] = useState([])
	
	function handleAdd () {
		setTask ([inputValue,...tasks])
		setInputValue ("")
	}

	function handleDelete (index) {
		let deleteTask = [...tasks]
		deleteTask.splice (index,1)
		setTask (deleteTask)
	}

	return (
		<div className="container">
			<h1>To Do List</h1>
			<div className="text-center">
				<input type="text" placeholder='New task' value={inputValue} onChange={(event)=>setInputValue(event.target.value)} />
				<button onClick={handleAdd}>Add</button>
			</div>
			<h1 className= {tasks.length == 0 ? "": "vacio"}>No Homework</h1>
			<ListGroup>
				{
					tasks.map((task,index) => {
						return (
							<ListGroup.Item  key={index}>
								<div className=" taskbar d-flex justify-content-between">
									<div>{task}</div>
									<div>
										<button className="botondelete" onClick={()=>handleDelete (index)}> Delete </button>
									</div>
								</div>
							</ListGroup.Item>
						)
					})
				}
			</ListGroup>
		</div>
	);
};

export default Home;
