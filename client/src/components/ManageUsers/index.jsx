import React, { useEffect, useState } from "react";
import User from "./User"
import { authorizedGetRequest } from "../Request";

const ManageUsers = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const handleShowUsers = async () => {
            const url = 'http://localhost:8080/api/user/showUsers'
            const callback = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            await authorizedGetRequest(url, callback);
        }
        handleShowUsers()
    }, []);

    return (
        <div>
            <div style={{ height: "50px" }}></div>
            <div className="container mt-5">
                <div className="row d-flex align-items-center justify-content-between">
                    {data.map((user) => <User key={user["id"]} id={user["id"]} name={user["name"]} email={user["email"]} />)}
                </div>
            </div>
        </div>
    );
}

export default ManageUsers