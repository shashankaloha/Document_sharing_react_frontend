import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'

const EditDocument = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState('false')

    useEffect(() => {
        const getDataById = async () => {
            const { data } = await axios.get(`/api/document/${id}`)
            setTitle(data.title)
            setDescription(data.description)
            setPublished(data.published)
        }
        getDataById()
    }, [id])
    const updateHandler = async (e) => {
        e.preventDefault()

        // update by put request

        const data = {
            title: title,
            description: description,
            published: published
        }
        await axios.put(`/api/document/${id}`, data)

        history.push('/rev')

    }

    return (
        <>
            <div className="col-md-12">
        <div className="card card-container">
                <h1>Edit Details</h1>
                              <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="publishedCheckedid">
                        <Form.Check
                            type="checkbox"
                            value={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                        />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update Details
                    </Button>
                </Form>
            </div>
            </div>
        </>
    )
}
export default EditDocument
