import React from "react";
import authService from "../services/auth.service";
class home extends React.Component {

  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      items: [],
      DataisLoaded: false
    };
  }

  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    const user = authService.getCurrentUser();
    if(user){
      this.setState({
        currentUser: user,
      })
    }
    fetch("http://localhost:8080/api/document/alldocuments")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          
          items: json,
          DataisLoaded: true
        });
      })
  }
  render() {
    const { DataisLoaded, items, currentUser } = this.state;
    if (!DataisLoaded) return <div>
      <h1> Pleses wait some time.... </h1> </div>;

    return (
      <div className="container mt-3">
        <h2>Documents List</h2>
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>S.no.</th>
              <th>User Name</th>
              <th>Document</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{currentUser.username}</td>
                <td>{item.document}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default home