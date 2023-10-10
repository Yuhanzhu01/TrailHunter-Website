import React, {useState, useEffect, useCallback} from 'react';
import TrailDataService from "../Service/trailDataService.js";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill } from 'react-icons/bs';
import trailPicPNG from './trailpic.jpg';

import "./TrailsList.css";

const TrailsList = ({
    user,
    addWishlist,
    deleteWishlist,
    wishlists
}) => {

    const [trails, setTrails] = useState([]);
    const [searchName, setSearchName] = useState("");
    // add search state, do we need to keep search rating? 
    const [searchState, setSearchState] = useState("");
    

    const [searchRating, setSearchRating] = useState("");

    // replace ratings by states
    const [states, setStates] = useState(["All States"]);
    // const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);

    // the current entries per page is 10 - Yuhan
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    
    // const retrieveRatings = useCallback(() => {
    //     TrailDataService.getRatings()
    //         .then(res => {
    //             console.log(`Retrieved all ratings from TrailDataService`);
    //             setRatings(["All Ratings"].concat(res.data))
    //         })
    //         .catch(e => {
    //             console.log(`Failed to get all ratings from TrailDataService with error: ${e}`);
    //         });
    // }, []);
    const retrieveStates = useCallback(() => {
        TrailDataService.getStates()
            .then(res => {
                console.log(`Retrieved all states from TrailDataService`);
                setStates(["All States"].concat(res.data))
            })
            .catch(e => {
                console.log(`Failed to get all states from TrailDataService with error: ${e}`);
            });
    }, []);

    const retrieveTrails = useCallback(() => {
        setCurrentSearchMode("");
        TrailDataService.getAll(currentPage, entriesPerPage)
            .then(res => {
                console.log(`Retrieved all trails from TrailDataService`, {
                    "Current page": currentPage,
                    "Entries Per Page": entriesPerPage,
                    "Response": res
                });
                setTrails(res.data.trails);
                setCurrentPage(res.data.page);
                setEntriesPerPage(res.data.entries_per_page);
            })
            .catch(e => {
                console.log(`Failed to get all trails from TrailDataService with error: ${e}`);
            });
    }, [currentPage, entriesPerPage]);

    const find = useCallback((queryContent, queryType) => {
        TrailDataService.find(currentPage, entriesPerPage, queryContent, queryType)
            .then(res => {
                console.log(`Retrieved all trails with query from TrailDataService`, {
                    "Current page": currentPage,
                    "Entries Per Page": entriesPerPage,
                    "Query Content": queryContent,
                    "Query Type": queryType
                });
                console.log(res.data.trails)
                setTrails(res.data.trails);
            })
            .catch(e => {
                console.log(`Failed to get all trails with query, and having error: ${e}`);
            });
    }, [currentPage]);

    const findByName = useCallback(() => {
        setCurrentSearchMode("findByName");
        find(searchName, "name");
    }, [find, searchName]);


    // const findByRating = useCallback(() => {
    //     setCurrentSearchMode("findByRating");
    //     if(searchRating === "All Ratings"){
    //         retrieveTrails();
    //     } else {
    //         find(searchRating, "avg_rating");
    //     }
    // }, [find, searchRating, retrieveTrails]);

    // add finByState -- Yuhan Dec 12
    const findByState = useCallback(() => {
        setCurrentSearchMode("findByState");
        if(searchState === "All States"){
            retrieveTrails();
        } else {
            find(searchState, "state_name");
        }
    }, [find, searchState, retrieveTrails]);

    const retrieveNextPage = useCallback(() => {
        if(currentSearchMode === "findByName") {
            findByName();
        } else if (currentSearchMode === "findByState"){
            findByState(); // update to state -- Yuhan Dec12
        } else {
            retrieveTrails();
        }
    }, [currentSearchMode, findByName, findByState, retrieveTrails]);

    useEffect(() => {
        retrieveStates();
    }, [retrieveStates]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);


    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    // const onChangeSearchRating = e => {
    //     const searchRating = e.target.value;
    //     setSearchRating(searchRating);
    // }

    const onChangeSearchState = e => {
        const searchState = e.target.value;
        setSearchState(searchState);
    }

    return (
        <div className="App">
            <Container className="main-container">
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchName}
                                    onChange={onChangeSearchName}
                                />
                            </Form.Group>
                            <Button
                                variant="default"
                                type="button"
                                onClick={findByName}
                                style={{ color: "white", background: "black" }}

                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeSearchState}
                                >
                                    {states.map((state, i) => (
                                            <option 
                                                value={state}
                                                key={i}
                                            >
                                                {state}
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="default"
                                type="button"
                                onClick={findByState}
                                style={{ color: "white", background: "black" }}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="trailRow">
                    {trails.map((trail) => (
                        <Col key={trail._id}>
                            <Card className="trailListCard">
                                <Card.Img
                                    className="smallPoster"
                                    src={trail.poster + "/100px180"} 
                                    onError={(event) => {
                                        event.target.src = trailPicPNG
                                    }}    
                                />
                                {user && (
                                    wishlists.includes(trail._id) ?
                                    <BsStarFill
                                        className="star starFill"
                                        onClick={() => {
                                            deleteWishlist(trail._id);
                                        }}
                                    />
                                    :
                                    <BsStar
                                        className='star starEmpty'
                                        onClick={() => {
                                            addWishlist(trail._id);
                                        }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title style={{ color: "white"}}>{trail.name }</Card.Title>
                                    <Card.Text style={{ color: "white"}}>
                                        State: {trail.state_name}
                                    </Card.Text >
                                    <Card.Text style={{ color: "white"}}>
                                        Features: {trail.features}
                                    </Card.Text>
                                    <Link to={"/trails/id/" + trail._id}>
                                    View Reviews
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br />
                Showing page: { currentPage + 1 }.
                <Button 
                    variant="link"
                    onClick={() => { setCurrentPage(currentPage + 1)} }
                >
                    Get next {entriesPerPage} results
                </Button>
            </Container>
        </div>
    )
}
export default TrailsList;

