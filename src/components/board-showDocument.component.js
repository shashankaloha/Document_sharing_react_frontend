import React from 'react'

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

            <div className="column">
                <h2> Uploaded Documents List</h2>
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>S.no.</th>
                            <th>Title</th>
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
                                <td><a href={item.linkurl}> Click Here</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        );
    }
}

export default showDocument