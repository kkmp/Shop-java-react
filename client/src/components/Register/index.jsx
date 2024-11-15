import React, { useState } from "react";
import Error from "../Error";
import { postRequest } from "../Request"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const initialValue = [];
    const [error, setError] = useState(initialValue);

    const handleSubmit = async e => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/user/register'
        const data = {
            name, email, password1, password2
        }
        const callback = () => {
            window.location = '/login';
        }
        const errorCallback = (response) => {
            console.log(response)
            const newDataArr = Object.keys(response.data.errors).map(key => response.data.errors[key]);
            setError(newDataArr)
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
                            <input type="text" name="username" className="form-control" placeholder="Wprowadź nazwe użytkownika" value={name} onChange={({ target }) => setName(target.value)} minLength="3" maxLength="25" required />
                        </div>
                        <div className="form-group pb-2">
                            Adres email
                            <input type="email" name="email" className="form-control" placeholder="Wprowadź email" value={email} onChange={({ target }) => setEmail(target.value)} minLength="2" maxLength="64" required />
                        </div>
                        <div className="form-group pb-2">
                            Hasło
                            <input type="password" name="password" className="form-control" placeholder="Wprowadź hasło" value={password1} onChange={({ target }) => setPassword1(target.value)} minLength="6" maxLength="25" required />
                        </div>
                        <div className="form-group pb-2">
                            Potwierdź hasło
                            <input type="password" name="password2" className="form-control" placeholder="Wprowadź hasło" value={password2} onChange={({ target }) => setPassword2(target.value)} minLength="6" maxLength="25" required />
                        </div>
                        <div className="text-center mt-1">
                            <p>Masz już konto? <a className="text-decoration-none link-success fw-bold" href="login">Zaloguj się</a></p>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 my-3 py-2">Rejestruj</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register