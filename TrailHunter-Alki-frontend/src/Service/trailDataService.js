import axios from "axios";

class TrailDataService{
    getAll(page = 0, trailsPerPage = 10,) {
        const axiosOptions = {
            params: {
                trailsPerPage,
                page
            }
        }
        console.log(`Use Axios to get all trails`, {
            "axiosOptions": axiosOptions
        });
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails`, axiosOptions);
    }

    find(page = 0, trailsPerPage = 10, queryContent, queryType = "name" ) {

         const axiosOptions = queryType === "name" ? {
            params: {
                trailsPerPage,
                page,
                name: queryContent
            }
        } :
        
        { 
            params: {
                trailsPerPage,
                page,
                avg_rating: queryContent
            }
        }

        if (queryType === "state_name") {
            const axiosOptions = { 
                params: {
                    trailsPerPage,
                    page
                }
            };
            return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/states/${queryContent}`, axiosOptions);
        }

        console.log(`Use Axios to find all trails with query`, {
            "axiosOptions": axiosOptions
        });
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails`, axiosOptions);
        
    }

    // get trail by Id
    getTrail(id) {
        console.log(`Use Axios to get trail by id`, {
            "id": id
        });
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/id/${id}`);
    }

    // getRatings() {
    //     console.log(`Use Axios to get all ratings`);
    //     return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/ratings`);
    // }

    // add get states to get states info from mongoDB
    getStates() {
        console.log(`Use Axios to get all states`);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/states`);
    }
}

export default new TrailDataService();