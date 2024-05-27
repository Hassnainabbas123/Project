import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }




    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:4000/api/orderData", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type='button'
                                        className='btn p-0'
                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                        onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                                    > Delete
                                        <img
                                            src="data:image/png;base64,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" // Replace this URL with the actual URL of your delete image
                                            alt='delete'
                                            style={{ width: '40px', height: '40px' }} // Adjust width and height as needed
                                        />
                                    </button>
                                </td>
                                {/* <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-danger mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>
    )
}