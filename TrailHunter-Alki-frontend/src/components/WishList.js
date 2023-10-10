import React, {useState, useEffect, useCallback} from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import update from 'immutability-helper'

import WishlistDataService from '../services/wishlists';

import "./WishList.css";
import { suppressDeprecationWarnings } from 'moment';

const WishList = ({
    user,
    wishlists,
    deleteWishlist,
    setWishlists,
    setDoSaveWishes
}) => {

    const [cards, setCards] = useState([]);

    const deleteWishlistCard = (trailId) => {
        if (user) {
            setDoSaveWishes(true);
            setCards(wishlists.filter(f => f !== trailId));
            setWishlists(wishlists.filter(f => f !== trailId));
            //localStorage.setItem("wishTrail", JSON.stringify(wishlists));
        }   
    }

    const postTrails = useState(() => {
        console.log("List wishlists in cards")
        if (user) {
            // wishlist with trail id
            // query trails with certain id
            let wishlists = JSON.parse(localStorage.getItem("wishTrail"));
            
            console.log(wishlists);
            WishlistDataService.postWishListsByIdList(wishlists).then(
                response => {
                    // make wishlist as a map with key(TrailId) and value(TrailContent)
                    const trailMap = new Map();
                    response.data.wishlistsTrail.forEach(trail => {
                        trailMap.set(trail._id, trail);
                    });
                    const newCards = wishlists.map((wishId) => {
                        const trail = trailMap.get(wishId);
                        return {
                            "id": trail._id,
                            "title": trail.name,
                            "text": trail.area_name,
                            "image": trail.picture
                        }
                        
                    });
                    
                    // fill the cards array with favorites and ids
                    setCards(newCards);
                    
                }).catch(
                    e => {
                        console.log(e);
                    });
        }

    },[])

   

    useEffect(() => {
        if (cards && cards.length > 0) {
            console.log(cards)
            saveNewWishlist();
        }
    }, [cards])

    const saveNewWishlist = useCallback(() => {
        console.log("save new wishlist")
        let newWishlists = cards.map((card) => {
            return card.id
        });
        setWishlists(newWishlists);
        setDoSaveWishes(true);
        localStorage.setItem("wishTrail", JSON.stringify(newWishlists));
    }, [cards])


    const renderCard = useCallback((card) => {
        return (  
             
            <Card className="wishlistsCard" key={card.id}>
                
                
                <Card.Img
                    className="wishlistsPicture"
                    src={card.image + "/100px180"} 
                    onError={(event) => {
                    event.target.src = "./images/trailPic1.jpg"
                    }}    
                                />
                 <Link to="/trails">
                <span className="delete-btn"
                    onClick={() => {
                        console.log(`deleting ${card.id}` );
                        alert(`You deleted ${card.title} from your wishlist.`);
                        deleteWishlist(card.id);
                        // deleteWishlistCard(card.id);              
                    }}>&times;
                </span>
                </Link> 
                
                <Card.Body >
                <Card.Title> {card.title} </Card.Title>
                <Card.Text>
                    {card.text}
                </Card.Text>
                <Link to={"/trails/id/"+card.id}>
                    View Reviews
                </Link>
                </Card.Body>
                
             </Card>  
        
        )
    }, [cards])
    return (
        <div>
            <Container className='wishlistsContainer'>     
                <div className='wishlistsPanel'>
                    My WishList
                </div>             
                <div className='wishlistsCardBoard'>                  
                    {
                        cards.map((card) => renderCard(card))
                   }
                </div>   
            </Container>
        </div>
    )
 
}

export default WishList;