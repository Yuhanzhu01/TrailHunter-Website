import React, { useEffect, useState } from "react";
import ReviewDataService from "../Service/reviewDataService";
import { useNavigate, useParams } from "react-router-dom";
import Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useLocation } from "react-router-dom";

const AddReview = ({ user }) => {
    const navigate = useNavigate()
    let params = useParams();
    let location = useLocation();

    let initialReviewState = "";
    
    const [editing, setEditing] = useState(false);
    const [review, setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        if (editing && location.state && location.state.currentReview) {
            ReviewDataService.updateReview(location.state.currentReview._id, location.state.currentReview.user_id, review)
                .then(res => {
                    console.log(`Updated an existing review successfully via ReviewDataService!`, {
                        "reivew id": location.state.currentReview._id,
                        "user id": location.state.currentReview.user_id,
                        "review": review,
                        "response": res
                    });
                    navigate("/trails/id/" + params.id); // update /id/ by Yuhan Dec13 
                })
                .catch(e => {
                    console.log(`Failed to update an existing review via ReviewDataService with error: ${e}`, {
                        "review id": location.state.currentReview._id,
                        "user id": location.state.currentReview.user_id,
                        "review": review
                    });
                });
        } else {
            ReviewDataService.createReview(params.id, user.googleId, user.name, review)
                .then(res => {
                    console.log(`Added a new review successfully via ReviewDataService!`, {
                        "trail id": params.id,
                        "user id": user.googleId,
                        "user name": user.name,
                        "review": review,
                        "response": res
                    });
                    navigate("/trails/id/" + params.id); // update /id/ by Yuhan Dec13
                })
                .catch(e => {
                    console.log(`Failed to add a new review via ReviewDataService with error: ${e}`, {
                        "trail id": params.id,
                        "user id": user.googleId,
                        "user name": user.name,
                        "review": review
                    });
                });
        }
    }

    useEffect(() => {
        if (location.state && location.state.currentReview) {
            const existingReview = location.state.currentReview;
            console.log(`User start editing this existing review`, {
                "Review Id": existingReview._id,
                "Name": existingReview.name,
                "User ID": existingReview.user_id,
                "Date": existingReview.date,
                "Review": existingReview.review,
            });
            setEditing(true);
            setReview(existingReview.review);
        } else {
            setEditing(false);
        }
    }, [location]);

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{ editing ? "Edit" : "Create" } Review </Form.Label>
                    <Form.Control 
                        as="textarea"
                        type="text"
                        required
                        review={ review }
                        onChange={ onChangeReview }
                        defaultValue={ editing ? review : ""}
                    />
                </Form.Group>
                <Button variant="primary" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;