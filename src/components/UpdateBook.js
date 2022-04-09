import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import apiPath from "../Config";

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookISBN: " ",
      bookTitle: " ",
      bookAuthor: " ",
      added: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(apiPath + "/api/aziende/add", {
        method: "PUT",
        body: JSON.stringify({
          ISBN: this.state.bookISBN,
          Autore: this.state.bookAuthor,
          Titolo: this.state.bookTitle
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (res.status === 200) {
        console.log("Ok");
        this.setState({ added: true })
      } else {
        console.log("Error number:" + res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    switch(this.state.added){
      case true:
        return(
          <div>
            <Card bg='success' className="col-md-5 mx-auto text-center">
              <Card.Body>Libro aggiornato con successo</Card.Body>
            </Card> 
          </div>
        );
      default:
        return (
          <div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ISBN Libro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ISBN"
                  value={this.state.bookISBN}
                  onChange={(e) => this.setState({ bookISBN: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Autore Libro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Autore"
                  value={this.state.bookAuthor}
                  onChange={(e) => this.setState({ bookAuthor: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Titolo Libro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titolo"
                  value={this.state.bookTitle}
                  onChange={(e) => this.setState({ bookTitle: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Invio
              </Button>
            </Form>
          </div>
        );
    }
  }
}

export default UpdateBook;