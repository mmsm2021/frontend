import React from "react";
import {Button, Card} from "react-bootstrap";

export class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then((response) => response.json())
            .then((json) => {
                    this.setState({
                        isLoaded: true,
                        posts: json
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const {error, isLoaded, posts} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="d-md-inline-block">
                    {posts.map(item => (
                        <Card className={"text-center"} style={{width: '18rem'}}>

                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle>Written by {item.userId}</Card.Subtitle>
                                <Card.Text>
                                    {item.body}
                                </Card.Text>
                                <Card.Footer>Post ID {item.id}</Card.Footer>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            );
        }
    }
}
