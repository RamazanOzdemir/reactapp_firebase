import React, { Component } from 'react'
import {connect} from "react-redux"
import {addUser} from "../store/actions"


class AddUser extends Component {
    state = {
        visible : false,
        name : "",
        department :"",
        salary : "",
        addError : false
    }
    
 changeInput = (e)=>{
     this.setState({
        [ e.target.name] : e.target.value
     });
 }

 addUser =  (e) =>{
     const {addLoading,firebase} = this.props;
     const {name,department,salary} = this.state;
     const uid = firebase.auth.uid;
     const newUser ={
        
        name : name,
        department : department,
        salary : salary,
        creationDate : Date.now(),
        updatedDate : 0,
        isTrash : false
     };
     if(!addLoading)
    this.props.addUser(uid,newUser);
     this.props.history.push("/");
 
 }
 control = (e) =>{
     e.preventDefault()
     const {name} = this.state;
     if(name === "")
        this.setState({addError : true});
     else{
        this.setState({addError : false});
        this.addUser();
        }
 }
  render() {
    const {name,department,salary,addError} = this.state;
    const {addLoading} = this.props;
                    return (
      
                        <div className= "col-sm-6 col-12 mb-4 mx-auto">
                            <div className="card">
                                <div className ="card-header">
                                    <h4>ADD USER</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        {
                                            addError?
                                            <div className = "alert alert-danger">
                                                <p className="my-auto">Name section cannot be empty</p>
                                            </div>
                                            :null
                                        }
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                            type = "text"
                                            name = "name"
                                            id = "id"
                                            placeholder = "Enter Name"
                                            className = "form-control"
                                            value = {name}
                                            onChange ={this.changeInput}
                                            
                                            />                        
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="department">Department</label>
                                            <input
                                            type = "text"
                                            name = "department"
                                            id = "department"
                                            placeholder = "Enter Deparment"
                                            className = "form-control"
                                            value = {department}
                                            onChange ={this.changeInput}
                                            />                        
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="salary">Salary</label>
                                            <input
                                            type = "text"
                                            name = "salary"
                                            id = "salary"
                                            placeholder = "Enter Salary"
                                            className = "form-control"
                                            value = {salary}
                                            onChange ={this.changeInput}
                                            />                        
                                        </div>
                                           
                                        <button className="btn btn-danger btn-block" onClick ={this.control}
                                        disabled={addLoading}>ADD USER</button>
                                    </form>
                                </div>
                
                            </div>
                        </div>
                      
                    )
    
  }
}
const mapStateToProps = state => ({
    addLoading : state.loading["ADD"],
    firebase : state.firebase
  })
  
  const mapDispatchToProps = dispatch => ({
    addUser : (uid,newUser)=> dispatch(addUser(uid,newUser))
  
  })
export default connect(mapStateToProps,mapDispatchToProps)(AddUser);




