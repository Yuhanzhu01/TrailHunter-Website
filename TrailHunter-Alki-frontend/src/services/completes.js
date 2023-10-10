import axios from "axios";

class CompleteDataService {

    get(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/completes/${userId}`);
    }

    updateCompletesList(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/completes`, data);
    }

    postCompletesByIdList(idList) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/trails/completes/idList/`, {
                idList: idList
            }
        );
    }

}

export default new CompleteDataService();