import React from 'react';
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {ProductForm} from "./ProductForm";
import {Link} from "react-router-dom";

export default function ProductCard({product}) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.attributes.picture} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{product.price} DKK</ListGroupItem>
            </ListGroup>
            <Card.Body>
                {/*<Card.Link><Link to={`/products/${product.id}`}> Details</Link></Card.Link>*/}
            </Card.Body>
        </Card>
    );
}
