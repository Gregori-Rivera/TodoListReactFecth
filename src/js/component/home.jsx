import React, { useEffect, useState } from "react";
import { ListGroup, Placeholder } from "react-bootstrap";
import { ListGroupItem } from 'react-bootstrap';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [tasks, setTask] = useState([])
	
	const getToDo = async () =>{
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/grivera",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
		setTask(data)
	}

	useEffect(() => {
	
		getToDo()

	},[]);


	// useEffect(() => {
	
	// 	const postToDo = async () =>{
	// 		let response = await fetch(`${URL_API}/grivera`,{
	// 			headers:{
	// 				"Content-Type":"application/json"
	// 			},
	// 			method:"POST",
	// 			body: JSON.stringify( []) 
	// 		})
	// 		let data = await response.json()
	// 		console.log(data)
	// 		}
	// 		postToDo()

	// },[]);


	const putToDo = async (newTasks) =>{
		console.log(newTasks)
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/grivera",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(newTasks) 
		})
		let data = await response.json()
		if (response.ok){
			console.log(data)
			getToDo()
		}
	}

	function handleAdd () {
		let newTask = [{label:inputValue,done:false},...tasks] 
		putToDo(newTask)
		setInputValue ("")
	}

	function handleDelete (index) {
		let deleteTask = [...tasks]
		deleteTask.splice (index,1)
		setTask (deleteTask)
		deletelist(deleteTask)
	}

	const deletelist= async (deleteTask)=>{
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/grivera",{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(deleteTask)
		})
		let data = await response.json()
		if (response.status == 200){
			console.log("Eliminado")
		}
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
									<div>{task.label}</div>
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
