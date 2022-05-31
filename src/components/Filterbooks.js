import React from "react";
import { Table, Card, Container, Form, Button } from "react-bootstrap";
import apiPath from "../Config";
export default class Filterbooks extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            autore: "",
            prezzo: "",
            found: null,
            error: null
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();


        try {
            let res = await fetch(apiPath + "/api/book/filter" + "?Autore=" + this.state.autore + "&Prezzo=" + this.state.prezzo, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            });

            if(res.status === 200) {
                this.setState({ found: true })
                res.json().then(data => this.setState({ books: data }))
            }else{
                res.json().then(data => this.setState({ error: data }))
                this.setState({ found: false })
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        switch(this.state.found){
            case true:
                return(
                    <div>
                        <Card className="text-center">
                            <Card.Body>Libri filtrati</Card.Body>
                        </Card>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>ISBN</th>
                                <th>Autore</th>
                                <th>Titolo</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.books.map((book) => {
                                return [
                                    <tr key={book.ISBN}>
                                        <th>{book.ISBN}</th>
                                        <th>{book.Autore}</th>
                                        <th>{book.Titolo}</th>
                                        <th>{book.Quantity}</th>
                                        <th>{book.Price}</th>
                                    </tr>,
                                ];
                            })}
                            </tbody>
                        </Table>
                    </div>
                );
            case false:
                return(
                    <div>
                        <Card bg='danger' className="col-md-5 mx-auto text-center">
                            <Card.Body>Error:{this.state.error}</Card.Body>
                        </Card>
                    </div>
                );

            default:
                return(
                    <Container className="vh-100 d-flex flex-column ">
                        <div>
                            <Card className="text-center">
                                <Card.Body>Inserisci il nome dell'autore del libro che vuoi filtrare</Card.Body>
                            </Card>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Autore</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Autore"
                                        value={this.state.autore}
                                        onChange={(e) => this.setState({ autore: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Prezzo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Prezzo"
                                        value={this.state.prezzo}
                                        onChange={(e) => this.setState({ prezzo: e.target.value })}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    Invio
                                </Button>
                            </Form>
                        </div>
                    </Container>
                )
        }
    }
}