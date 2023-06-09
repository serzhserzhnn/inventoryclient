import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8087/inventory",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-type": "application/json"
    }
});