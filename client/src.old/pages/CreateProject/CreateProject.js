import React, { Component} from "react";
import Hero from "../../components/Hero";
import $ from 'jquery';
import "./CreateProject.css";
import API from "../../utils/API";

class CreateProject extends Component {

    state = {
      title: "",
      decription: "",
      financing: "",
      body: "",
      tags: "",

  
    };
    componentDidMount() {
      this.loadProfile();
      this.loadProjects();
    }
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      if (this.state.title && this.state.author) {
        API.createProject({
          title: this.state.title,
          description: this.state.description,
          tags: this.state.tags
        })
          
          .catch(err => console.log(err));
      }
    };
    

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCreateProjcectSubmit = event => {
    console.log("Create project button pressed");
    event.preventDefault();

    let projectinfo = {
      
    }

    // get salt for username attempt
    $.post("/newproject", projectinfo)
      .then(function (res) {

        console.log(res.body);
      });


  }



  
  render() {
    return (
      <div>
      <Hero backgroundImage="https://s8.postimg.cc/aqr93z6lx/test.jpg">
        <h1>GoPUBLk</h1>
      </Hero>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="CreateProj" className="jumbotron">
              <h1 id="CProjectTitle">Create a project</h1>
              <form  onSubmit={this.handleCreateProjcectSubmit}>
                <div className="form-group">
                  <label htmlFor="ProjectInput">Title</label>
                  <input type="text" className="form-control" id="ProjectTitle" placeholder="Title"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="MinFunds">Goal</label>
                  <input type="number" className="form-control" id="Funds" placeholder="1,000.00"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="Tags">Tags</label>
                  <input type="text" className="form-control" id="Tags" placeholder="Technology"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="DesText">Description</label>
                  <textarea type="text" className="form-control" id="Description" placeholder="Description"></textarea>
                </div>
                <button type="submit" id="ProjectSubmit" className="btn btn-primary">Submit</button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default CreateProject;