import React, { useEffect, useState } from "react";

const Footer = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        const tokenRead = localStorage.getItem("token");
        if (tokenRead) {
            setToken(tokenRead);
        }
    }, []);

    return (
        <footer className="footer-page text-center text-light bg-dark">
            <div className="container p-4 pb-0">
                <section className="footer-section py-3">
                    {token ?
                        <section className="row">
                            <section className="col-6 border-end">
                                <p className="text-start text-white-50">
                                    Na stronie można oglądać i kupować produkty. Niektóre opcje dostępne są tylko dla administratorów.
                                </p>
                            </section>
                            <section className="col-6">
                                <p className="text-start text-white-50">
                                    Projekt powstał w celu zaliczenia zajęć z programowania aplikacji internetowych w JEE.
                                </p>
                            </section>
                        </section>
                        :
                        <p className="d-flex justify-content-center align-items-center">
                            <span className="me-3">Zarejestruj się już dziś!</span>
                            <a href="register" className="btn btn-outline-light btn-rounded">
                                Rejestracja
                            </a>
                        </p>
                    }
                </section>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <b>Karol Łazaruk - Wydział Elektrotechniki i Informatyki Politechniki Lubelskiej - 2023</b>
            </div>
        </footer>
    );
}

export default Footer