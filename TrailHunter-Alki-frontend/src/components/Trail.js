import React, { useState, useEffect } from 'react';
import TrailDataService from '../Service/trailDataService';
import ReviewDataService from '../Service/reviewDataService';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import trailPosterJPG from './trailpic.jpg';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import './Trail.css';

// Modified by Sifan 12/13
const Trail = ({ user }) => {
    let params = useParams();    
    const [trail, setTrail] = useState({
        id: null,
        name: "",
        state: "",
        reviews: [],
    });

    useEffect(() => {
        const getTrail = (id) => {
            TrailDataService.getTrail(id)
                .then(res => {
                    console.log(`Retrieved trail with id: ${id} from TrailDataService`);
                    setTrail(res.data);
                })
                .catch(e => {
                    console.log(`Failed to get the trail with id: ${id} from TrailDataService, with error: ${e}`);
                });
        }
        getTrail(params.id)
    },[params.id]);

    const onReviewDelete = (reviewObj, index) => {
        ReviewDataService.deleteReview(reviewObj._id, reviewObj.user_id)
            .then(res => {
                console.log(`Deleted an existing review successfully via ReviewDataService!`, {
                    "reivew id": reviewObj._id,
                    "user id": reviewObj.user_id,
                    "review": reviewObj.review,
                    "response": res
                });
                setTrail((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(`Failed to delete an existing review via ReviewDataService with error: ${e}`, {
                    "review id": reviewObj._id,
                    "user id": reviewObj.user_id,
                    "review": reviewObj.review
                });
            });
    }

    return (
        <div className="trailContainer">
            <Container>
                <Row>
                    <Col>
                        <div className="poster">
                            <Image
                                className="bigPicture"
                                src={trail.poster + "/100px250"}
                                fluid
                                onError={(event) => {
                                    event.target.src = trailPosterJPG
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="text-center">
                            <Card.Header as="h5">{trail.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {trail.plot}
                                </Card.Text>
                                {user && (
                                    <Link to={"/trails/" + params.id + "/review"}>
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                            <h4>Reviews</h4>
                        <br></br>
                        {trail.reviews.map((review, index) => (
                            <div className="d-flex" key={`trail-review-${index}`}>
                                <div className="flex-shrink-0 reviewText">
                                    <h5>{review.name + " reviewed on " + moment(review.date).format("Do MMMM YYYY")}</h5>
                                    <div className="review">{review.review}</div>
                                    {user && user.googleId === review.user_id && (
                                        <Row>
                                            <Col>
                                                <Link 
                                                    to={{
                                                        pathname: "/trails/" + params.id + "/review"
                                                    }}
                                                    state={{
                                                        currentReview: review
                                                    }}
                                                >
                                                    Edit
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Button 
                                                    variant="link" 
                                                    onClick={() => {
                                                        onReviewDelete(review, index);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                            </div>
                        ))}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}    



export default Trail;