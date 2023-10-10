import axios from "axios";

class WishlistDataService {

    get(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/wishlists/${userId}`);
    }

    updateWishList(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/wishlists`, data);
    }

    postWishListsByIdList(idList) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/wishlists/idList/`, {
                idList: idList
            }
        );
    }

}

export default new WishlistDataService();