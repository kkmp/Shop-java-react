import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode'
import { Fragment } from "react";
import { authorizedGetRequest } from "../Request";

const Header = (props) => {
    const [token, setToken] = useState("")
    const [role, setRole] = useState("")
    const [count, setCount] = useState("")
    const [query, setQuery] = useState("")

    const handleAction = async () => {
        const tokenRead = localStorage.getItem("token");
        if (tokenRead) {
            setToken(tokenRead)
            const decoded = jwt(tokenRead);
            setRole(decoded["role"])
            const url = 'http://localhost:8080/api/cart/cartItem'
            const callback = (response) => {
                setCount(response.data)
            }
            await authorizedGetRequest(url, callback);
        }
    }

    useEffect(() => {
        handleAction()
    }, [props.input]);


    const handleSearch = (query) => {
        window.location = '/search/' + query
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location = '/login'
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark fixed-top py-3">
            <div className="container-fluid nav-main">
                <a className="navbar-brand link-light" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-bitcoin" viewBox="0 0 16 16">
                        <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
                    </svg> Sklep internetowy
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className='bx bx-menu'></i>
                </button>

                {token ?
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item px-3">
                                <a className="nav-link link-light" href="/myOrders">Zamówienia</a>
                            </li>

                            {role === "Admin" ?
                                <Fragment>
                                    <li className="nav-item px-3">
                                        <a className="nav-link link-light" href="/addProduct">Dodaj produkt</a>
                                    </li>
                                    <li className="nav-item px-3">
                                        <a className="nav-link link-light" href="/deleteProducts">Usuń produkt</a>
                                    </li>
                                    <li className="nav-item px-3">
                                        <a className="nav-link link-light" href="/manageUsers">Zarządzaj klientami</a>
                                    </li>
                                </Fragment> : ""
                            }

                            <li className="nav-item px-3 ms-5">
                                <div className="d-flex">
                                    <input className="form-control me-2" name="query" type="search" placeholder="Szukaj" value={query} onChange={({ target }) => setQuery(target.value)} />
                                    <button className="btn btn-primary" type="submit" onClick={() => handleSearch(query)}>Szukaj</button>
                                </div>
                            </li>
                        </ul>
                        <a className="nav-link link-light" href="/cartList">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#24a0ed" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                </div>
                                <div>
                                    Koszyk({count})
                                </div>
                            </div>
                        </a>
                        <button className="btn link-light" onClick={handleLogout}>Wyloguj się</button>
                    </div>
                    :
                    <a className="nav-link link-light" href="/login">Zaloguj się</a>
                }
            </div>
        </nav>

    );
}

export default Header