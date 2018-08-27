import React, { Component } from "react";
import Hero from "../../components/Hero"
import API from "../../utils/API";
import "./ProjectDesc.css";
import "../Search/Search.js";
import ListItem from "../../components/List/ListItem";


class ProjectDescription extends Component {
  state = {
    Title: "",
    tagList: "",
    Author: "",
    Description: "",
    projects: [],

  };
  
  componentDidMount() {
    this.loadProjects();
  }

  loadProjects = () => {

    console.log(window.location.pathname);
    let path = window.location.pathname;
    var projectId= path.replace("/Projects/", "");
    console.log(projectId);
    API
    .getUnoProject(projectId)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
  }

  render() {
    return (

      <div>
        <Hero backgroundImage="https://s8.postimg.cc/m1z0cxyud/business_Angel.png">
          <h1>GoPUBLk</h1>
        </Hero>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron">
                <h5><ul className="list-group">
                {
                  this.state.projects.map((projects) =>
                    <ListItem
                      title={projects.title}

                    />
                  )
                }
              </ul></h5>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
                {
                  this.state.projects.map((projects) =>
                    <ListItem
                      title={projects.title}
                      description={projects.description}
                      financing={projects.financing}
                      body={projects.body}
                      favorite={projects.favorite}
                      key={projects._id}

                    />
                  )
                }
              </ul>
            </div>
          </div>


        </div>
      </div>

    )
  }
}

export default ProjectDescription;