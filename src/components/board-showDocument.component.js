import React from 'react'
import Button from 'react-bootstrap/Button'
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
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
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div>;
        return (
            <Container className="justify-content-center p-2">
                <h2>All Uploaded Documents List</h2>
                <Button href="/addDocument">Back</Button>
                <div className="table-wrapper">
        <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.no.</th>
                            <th>User Name</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.userName}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td><Link to ={`document/${item.id}`}>View Details</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </Container>
        );
    }
}

export default showDocument