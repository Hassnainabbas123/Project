import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousel from '../components/Carousel';

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/FoodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    response = await response.json();
    console.log(response); // Debug log to check the response data

    setFoodData(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner">

            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/500×500/?Fertilizer" className="d-block w-100" style={{ filter: "brightness(50%)", maxHeight: "600px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/500×500/?Crops" className="d-block w-100" style={{ filter: "brightness(50%)", maxHeight: "600px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/500×500/?Pesticides" className="d-block w-100" style={{ filter: "brightness(50%)", maxHeight: "600px" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div>
                <div className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
              </div>
              {foodData.length > 0 ? (
                foodData
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodData={filterItems}
                        // foodName={filterItems.name}
                        options={filterItems.options[0]}
                      // imgSrc={filterItems.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No such data found</div>
              )}
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
