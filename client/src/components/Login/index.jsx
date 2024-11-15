import React, { useState } from "react";
import Error from "../Error";
import { postRequest } from "../Request"

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const initialValue = [];
    const [error, setError] = useState(initialValue);

    const handleSubmit = async e => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/user/authenticate'
        const data = {
            name, password
        }
        const callback = (response) => {
            localStorage.setItem('token', response.data["token"])
            window.location = '/'
        }
        const errorCallback = (response) => {
            var newErrorArr = Object.keys(response.data.errors).map(key => response.data.errors[key]);
            setError(newErrorArr)
        }
        await postRequest(url, data, callback, errorCallback);
    };

    return (
        <div className="container pt-5 mt-5">
            <div className="row">
                <section className="login-logo mb-5 text-center">
                    <h1>SKLEP INTERNETOWY</h1>
                </section>
                <div>
                    {error.map((err, idx) => <Error message={err} key={idx} />)}
                </div>
                <div className="col-4 offset-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group pb-2">
                            Nazwa użytkownika
                            <input type="text" name="name" className="form-control" placeholder="Wprowadź nazwę użytkownika" value={name} onChange={({ target }) => setName(target.value)} required />
                        </div>
                        <div className="form-group pb-2">
                            Hasło
                            <input type="password" name="password" className="form-control" placeholder="Wprowadź hasło" value={password} onChange={({ target }) => setPassword(target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 my-3 py-2">Zaloguj się</button>
                    </form>
                </div>
                <div className="text-center mt-1">
                    <p>Nie masz konta? <a className="text-decoration-none link-success fw-bold" href="register">Zarejestruj się!</a></p>
                </div>
            </div>
        </div>
    );
};
