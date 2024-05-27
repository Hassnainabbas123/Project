import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export function Card(props) {
    let dispatch = useDispatchCart();
    const priceRef = useRef();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodData._id) {
                food = item;
                break;
            }
        }

        if (food.length > 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodData._id, price: finalPrice, qty: qty });
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodData._id, name: props.foodData.name, price: finalPrice, qty: qty, size: size });
                return;
            }
            return;
        }

        await dispatch({ type: "ADD", id: props.foodData._id, name: props.foodData.name, price: finalPrice, qty: qty, size: size });
    };

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={props.foodData.img} alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodData.name}</h5>

                        <div className='container w-100'>
                            <select
                                className='m-2 h-100'
                                style={{ backgroundColor: 'sandybrown', color: 'white' }}
                                onChange={(e) => setQty(e.target.value)}
                            >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                className='m-2 h-100 rounded'
                                style={{ backgroundColor: 'sandybrown', color: 'white' }}
                                ref={priceRef}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    );
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ${finalPrice}/-
                            </div>
                        </div>

                        <hr></hr>
                        <button
                            className='btn'
                            style={{ backgroundColor: 'sandybrown', color: 'white' }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;