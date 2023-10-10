import axios from "axios";

class ReviewDataService{
    createReview(trail_id, user_id, name, review) {
        const axiosBody = {
            trail_id,
            user_id,
            name,
            review
        }
        console.log(`Use axios to post a review`, {
            "axiosBody": axiosBody
        });
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/review`, axiosBody);
    }

    updateReview(review_id, user_id, review) {
        const axiosBody = {
            review_id,
            user_id,
            review
        }
        console.log(`Use axios to put a review`, {
            "axiosBody": axiosBody
        });
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/review`, axiosBody);
    }

    deleteReview(review_id, user_id) {
        const axiosOptions = {
            data: {
                review_id,
                user_id
            }
        }
        console.log(`Use axios to delete a review`, {
            "axiosOptions": axiosOptions
        });
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/review`, axiosOptions);
    }
}

export default new ReviewDataService();