import { Fragment, useState } from "react";
import { toast } from 'react-toastify';
import { authorizedDeleteRequest } from "../Request";

const User = (user) => {
    const [show, setShow] = useState(true);

    const handleDeleteUser = async (id) => {
        const url = 'http://localhost:8080/api/user/deleteUser/' + id;
        const callback = () => {
            toast.success("Użytkownik został usunięty!", { position: toast.POSITION.BOTTOM_RIGHT });
            setShow(false)
        }
        await authorizedDeleteRequest(url, callback);
    }

    return (
        show ?
            <Fragment>
                <hr className="dropdown-divider my-5 bg-dark"></hr>
                <div className="col-4 border-end">
                    <h2>{user.name}</h2>
                    <h4>{user.email}</h4>
                </div>
                <div className="col-3">
                    <div className="mx-auto w-75">
                        <button className="btn btn-danger w-100" onClick={() => handleDeleteUser(user.id)}>Skasuj użytkownika</button>
                    </div>
                </div>
                <hr className="dropdown-divider my-5 bg-dark"></hr>
            </Fragment> : null
    );
}
export default User