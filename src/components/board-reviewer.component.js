import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth.service';
import { Container } from "react-bootstrap";
class showDocument extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      DataisLoaded: false
    };
  }
  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const id = user.id
    fetch(`http://localhost:8080/api/document/getuserdoc/${id}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true
        });
      })
  }
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded) return <div>
      <h1> Pleses wait some time.... </h1> </div>;
    return (
      <Container className="justify-content-center p-2">
        <h2> Uploaded Documents List</h2>
        <Button href="/addDocument">Back</Button>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Document Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td><Link to={`userdoc/${item.id}`}>View Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
     </Container>
    );
  }
}

export default showDocument