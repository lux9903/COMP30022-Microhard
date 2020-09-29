import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from '../../../helpers/axiosConfig';

class Course extends Component{
	constructor(props) {
		super(props);
		this.createCourse = this.createCourse.bind(this);
		this.updateCourse = this.updateCourse.bind(this);
		this.getOneCourse = this.getOneCourse.bind(this);
		this.getAllCourse = this.getAllCourse.bind(this);
		this.deleteCourse = this.deleteCourse.bind(this);
	}

	createCourse(e){
		e.preventDefault();
		var checked = document.forms.namedItem("createCourse")["core"].checked;
		let formD = {
			"code" : document.forms.namedItem("createCourse")["code"]["value"],
			"name" : document.forms.namedItem("createCourse")["name"]["value"],
			"description": document.forms.namedItem("createCourse")["description"]["value"],
			"related_skills": document.forms.namedItem("createCourse")["related_skills"]["value"].split(","),
			"state": document.forms.namedItem("createCourse")["state"]["value"],
			"grades" : parseInt(document.forms.namedItem("createCourse")["grades"]["value"]),
			"link" : document.forms.namedItem("createCourse")["link"]["value"],
			"year" : parseInt(document.forms.namedItem("createCourse")["year"]["value"]),
			"sem" : document.forms.namedItem("createCourse")["sem"]["value"],
			"core" : checked,
			"score": parseInt(document.forms.namedItem("createCourse")["score"]["value"])
		}
		axios.post('/course/create',formD);
	}

	updateCourse(e){
		e.preventDefault();
		let formD = {};
		if(document.forms.namedItem("updateCourse")["code"]["value"].trim() != ""){
			const url = '/course/' + document.forms.namedItem("updateCourse")["code"]["value"].trim();
			if(document.forms.namedItem("updateCourse")["name"]["value"].trim() !=""){
				formD["name"] = document.forms.namedItem("updateCourse")["name"]["value"].trim();
			}
			if(document.forms.namedItem("updateCourse")["description"]["value"].trim()!=""){
				formD["description"] = document.forms.namedItem("updateCourse")["description"]["value"].trim();
			}
			formD["state"] = document.forms.namedItem("updateCourse")["state"]["value"];
			if(document.forms.namedItem("updateCourse")["related_skills"]["value"].trim() !=""){
				formD["related_skills"]  = document.forms.namedItem("updateCourse")["related_skills"]["value"].split(",");
			}
			if(parseInt(document.forms.namedItem("updateCourse")["grades"]["value"])){
				formD["grades"] = parseInt(document.forms.namedItem("updateCourse")["grades"]["value"]);
			}
			if(document.forms.namedItem("updateCourse")["link"]["value"].trim()!=""){
				formD["link"] = document.forms.namedItem("updateCourse")["link"]["value"].trim();
			}
			if(parseInt(document.forms.namedItem("updateCourse")["year"]["value"])){
				formD["year"] = parseInt(document.forms.namedItem("updateCourse")["year"]["value"]);
			}
			formD["sem"] = document.forms.namedItem("updateCourse")["sem"]["value"];
			formD["core"] = document.forms.namedItem("updateCourse")["core"]["value"].checked;
			if(parseInt(document.forms.namedItem("updateCourse")["score"]["value"])){
				formD["score"] = parseInt(document.forms.namedItem("updateCourse")["score"]["value"]);
			}
			axios.post(url,formD);
		}
	}

	getOneCourse(e){
		e.preventDefault();
		const url = '/course/'+ document.forms.namedItem("oneCourse")["code"]["value"];
		axios.get(url).then((res)=>{
			if(res.data.course){
				alert(JSON.stringify(res.data.course));
			}else{
				alert("No Such course");
			}
		});
	}

	getAllCourse(e){
		e.preventDefault();
		axios.get('/course/').then((res)=>{
			if(res.data.course){
				alert(JSON.stringify(res.data.course))
			}else{
				alert("No Course found");
			}
		});
	}

	deleteCourse(e){
		e.preventDefault();
		const url = "/course/" + document.forms.namedItem("deleteCourse")["code"]["value"];
		axios.delete(url);
	}
	render(){
		return(
		<div>
		
		<div>
		<h1> Create a crouse</h1>
		<form onSubmit = {this.createCourse} name = "createCourse">
			<input type = "text" name = "code" placeholder="courseCode"/>
			<input type = "text" name = "name" placeholder= "courseName"/>
			<input type = "text" name = "description" placeholder="courseDescription"/>
			<select name = "state">
				<option value = "Finished"> Finished </option>
				<option value = "OnGoing"> OnGoing </option>
				<option value = "Planned"> Planned </option>
			</select>
			<input type ="text" name = "related_skills" placeholder="related skills sperate in comma"/>
			<input type = "number" name ="grades" min="0" max = "100"/>
			<input type = "string" name="link" placeholder="link to handbook"/>
			<input type = "number" name = "year" min = "1853"/>
			<select name="sem">
				<option value = "Winter"> Winter </option>
				<option value = "Summer"> Summer </option>
				<option value = "Sem1"> Sem1 </option>
				<option value = "Sem2"> Sem2 </option>
			</select>
			Core Subject?
			<input type = "checkbox" name = "core" value = "Core Subject?"/>
			<input type = "number" name ="score" min="1" max = "4"/>
			<input type ="submit" value = "test"/>
		</form>
		</div>

		<div>
		<h1> Update a course</h1>
		<form onSubmit={this.updateCourse} name = "updateCourse">
			<input type = "text" name = "code" placeholder="courseCode"/>
			<input type = "text" name = "name" placeholder= "courseName"/>
			<input type = "text" name = "description" placeholder="courseDescription"/>
			<select name = "state">
				<option value = "Finished"> Finished </option>
				<option value = "OnGoing"> OnGoing </option>
				<option value = "Planned"> Planned </option>
			</select>
			<input type ="text" name = "related_skills" placeholder="related skills sperate in comma"/>
			<input type = "number" name ="grades" min="0" max = "100"/>
			<input type = "string" name="link" placeholder="link to handbook"/>
			<input type = "number" name = "year" min = "1853"/>
			<select name="sem">
				<option value = "Winter"> Winter </option>
				<option value = "Summer"> Summer </option>
				<option value = "Sem1"> Sem1 </option>
				<option value = "Sem2"> Sem2 </option>
			</select>
			Core Subject?
			<input type = "checkbox" name = "core" value = "Core Subject?"/>
			<input type = "number" name ="score" min="1" max = "4"/>
			<input type ="submit" value = "test"/>
		</form>
		</div>

		<div>
		<h1>
			Get a specific Course by Course Code
		</h1>
		<form onSubmit = {this.getOneCourse} name = "oneCourse">
			<input type = "text" name = "code"/>
			<input type = "submit" value = "test"/>
		</form>
		</div>

		<div>
			<h1>
				Get all course by year/sem
			</h1>
			<form onSubmit={this.getAllCourse} name = "allCourse">
			<input type = "submit" value = "test"/>
			</form>
		</div>

		<div>
			<h1>
				Delete one Course By code
			</h1>
			<form onSubmit={this.deleteCourse} name = "deleteCourse">
				<input type = "text" name = "code"/>
				<input type = "submit" value = "test"/>
			</form>
		</div>
		</div>
		)
	}
}

export default Course;