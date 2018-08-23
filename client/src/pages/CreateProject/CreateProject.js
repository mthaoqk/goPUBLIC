import React, { Component} from "react";
import Hero from "../../components/Hero";
import { Input, FormBtn } from "../../components/Form";
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
    return (<div>
      <Hero backgroundImage="https://s8.postimg.cc/aqr93z6lx/test.jpg">
        <h1>GoPUBLk</h1>
      </Hero>
  
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="CreateProj" className="jumbotron">
              <h1 id="CProjectTitle">Create a project</h1></div>
              <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Short Description of Business Plan"
              />
              <Input
                value={this.state.financing}
                onChange={this.handleInputChange}
                name="financing"
                placeholder="Financial Need/Goal"
              />
              <Input
                value={this.state.body}
                onChange={this.handleInputChange}
                name="business plan"
                placeholder="Insert Comprehensive Business Plan Here"
              />
              
              <Input
                value={this.state.tags}
                onChange={this.handleInputChange}
                name="tags"
                placeholder="categories and tags"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.description && this.state.body && this.state.financing && this.state.tags)}
                onClick={this.handleFormSubmit}
              >
                Submit Project
              </FormBtn>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}

export default CreateProject;
