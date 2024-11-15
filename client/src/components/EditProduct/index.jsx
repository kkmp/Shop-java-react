import React, { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Error from "../Error";
import { authorizedPutRequest, authorizedGetRequest } from "../Request";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const { id } = useParams()
    const initialValue = [];
    const [error, setError] = useState(initialValue);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const handleChange = async () => {
            const url = 'http://localhost:8080/api/product/detail/' + id;
            const callback = (response) => {
                setName(response.data.name)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setPhoto(response.data.photo)
                setCategory(response.data.category)
                setExist(true);
            }
            await authorizedGetRequest(url, callback);
        }
        handleChange()
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/product/editProduct'
        const data = {
            "id": id,
            "name": name,
            "category": category,
            "description": description,
            "photo": photo,
            "price": price
        }
        const callback = () => {
            toast.success("Zapisano zmiany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError([])
        }
        const errorCallback = (response) => {
            var newErrorArr = Object.keys(response.data.errors).map(key => response.data.errors[key]);
            setError(newErrorArr)
        }
        await authorizedPutRequest(url, data, callback, errorCallback);
    };

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    return (exist ? <Fragment>
        <div style={{ height: "50px" }}></div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div>
                        {error.map((err, idx) => <Error message={err} key={idx} />)}
                    </div>
                    <div className="mx-auto w-50 order-form-container p-5">
                        <div className="text-center">
                            <img className="detail-photo" src={photo} alt={description} />
                        </div>
                        <form onSubmit={handleSubmit} className="mt-5">
                            <div className="mb-3">
                                <h3>Nazwa przedmiotu</h3>
                                <input type="text" className="form-control" name="productName" placeholder="Nazwa dodawanego przedmiotu" value={name} onChange={({ target }) => setName(target.value)} minLength="3" maxLength="40" required />
                            </div>
                            <div className="mb-3">
                                <h3>Opis przedmiotu</h3>
                                <textarea className="form-control" name="description" placeholder="Wpisz tutaj krótki opis przedmiotu" value={description} onChange={({ target }) => setDescription(target.value)} required></textarea>
                            </div>
                            <div className="mb-3">
                                <h3>Cena przedmiotu</h3>
                                <input type="number" className="form-control" name="price" placeholder="Wpisz cenę przedmiotu" value={price} onChange={({ target }) => setPrice(target.value)} min="0.01" max="100000.0" step="0.01" required />
                            </div>
                            <div className="mb-3">
                                <h3>Zdjęcie przedmiotu (proszę podać link do grafiki)</h3>
                                <input type="text" className="form-control" name="photo" placeholder="Wklej link ze zdjęciem" value={photo} onChange={({ target }) => setPhoto(target.value)} required />
                            </div>
                            <div className="mb-3">
                                <h3>Kategoria</h3>
                                <div className="form-check">
                                    <input className="form-check-input" value="elektronika" type="radio" name="category" id="categoryElectronics" checked={category === 'elektronika'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="categoryElectronics">
                                        Elektronika
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" value="książki" type="radio" name="category" id="categoryBooks" checked={category === 'książki'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="categoryBooks">
                                        Książki
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" value="rośliny" type="radio" name="category" id="categoryPlants" checked={category === 'rośliny'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="categoryPlants">
                                        Rośliny
                                    </label>
                                </div>
                            </div>
                            <div className="mx-auto w-50">
                                <button type="submit" className="btn btn-primary btn-lg w-100">Edytuj przedmiot</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Fragment> : null
    );
}

export default EditProduct