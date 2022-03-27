import React, { Component } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button'
class App extends Component {
state={
  file:null
}

  handelFile(e){
    let file =e.target.files[0]
    this.setState({file:file})
  }
 handelUpload(e){
   consol.log(this.state ,"The State -----")
 
 axios({
  method: 'POST',
  url: '/user/12345',
  headers:{
    authorization: 'your token'
  }
  }).then((res)=>{

  })
 }
  
  
  render() {
    return (
      <div className="row">
        <form className="column">
          <div className="mb-3 mt-3">
            <label forHtml="HtmlmFile" class="Htmlm-label"><h2>Choose before Pressing the Upload button</h2></label>
            <input class="form-control" type="file" id="formFile" onChange={(e)=>this.handelFile(e)} />
          </div>
          <div className="mb-3">
            <label forHtml="text" className="form-label">Title of Document:</label>
            <input type="text" className="form-control" id="#" placeholder="Give some title..." name="title" onClick={this.onFileTitle} />
          </div>
          <div className="mb-3">
            <label forHtml="text" className="form-label">Description:</label>
            <input type="text" className="form-control" id="#" placeholder="Give some description..." name="description" onClick={this.onFileTitle} />
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="publish" onClick={this.onFilePublish} /> Publish
            </label>
          </div>
          <div>
            <p>Choose file before click upload button</p>
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e)=>this.handelUpload(e)} >Upload</button>
          <br></br> <br></br>
          <Button href="/showdoc">Show Document List</Button>
        </form>
      </div>
    );
  }
}
export default App; 