import axios from 'axios'
import React, { useState } from 'react'
import AuthService from "../services/auth.service";
import Button from 'react-bootstrap/Button'

const API_URL = "http://localhost:8080/api/document/";
const AddProduct = ({ history }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(true)
  const [document, setImage] = useState('')

  const addProductHandler = async (e) => {
    e.preventDefault()
    const user = AuthService.getCurrentUser();
    const userID = user.id;
    const formData = new FormData()

    formData.append('document', document)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('published', published)
    await axios.post(API_URL + `adddocument/${userID}`, formData)
    //history.push('/showdoc')
    window.location.reload(true);
  }

  return (
    <>
    <div className="col-md-12">
        <div className="card card-container">
             <form onSubmit={addProductHandler} method="POST" encType='multipart/form-data'>
          <div className="mb-3 mt-3">
            <label forhtml="HtmlmFile" className="Html-label"><h2>Add Document</h2></label>
            <input className="form-control"
              type="file"
              id="formFile"
              name='image'
              onChange={(e) => setImage(e.target.files[0])}
              size="lg" />
          </div>
          <div className="mb-3">
            <label forhtml="text" className="form-label">Title of Document:</label>
            <input className="form-control"
              type="text"
              id="#"
              placeholder="Give some title..."
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label forhtml="text" className="form-label">Description:</label>
            <input className="form-control"
              type="text"
              id="#"
              placeholder="Give some description..."
              name="description"
              value={description} onChange={(e) => setDescription(e.target.value)}
              as="textarea" />
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label">
              <input className="form-check-input"
                type="checkbox"
                name="publish"
                onChange={(e) => setPublished(e.target.checked)} /> Publish
            </label>
          </div>
          <div>
            <p>Choose file before click upload button</p>
          </div>
          <button type="submit" className="btn btn-primary" >Upload</button>
          <br></br> <br></br>
          <Button href="/showdoc">Show Document List</Button>
        </form>
      
      </div>
      </div>
    </>
  );
}

export default AddProduct