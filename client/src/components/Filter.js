import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions";

export default function Filter() {
  const [searchkey, setsearchkey] = useState("");
  const [sort, setsort] = useState("popular");
  const [category, setcategory] = useState("all");
  const dispatch = useDispatch();

  return (
    <div className="filter-nav shadow ">
      <div className="row justify-content-center">
        <div className="col-md-3">
          <input
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            type="text"
            placeholder="Search by name"
            className="form-control name-search"
          />
        </div>
        <div className="col-md-2 dropdown">
          <select
            className="filter"
            value={sort}
            onChange={(e) => setsort(e.target.value)}
          >
            <option value="popular">Popular</option>
            <option value="htl">Value: high to low</option>
            <option value="lth">Value: low to high</option>
          </select>
        </div>
        <div className="col-md-2 dropdown">
          <select
            className="filter"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="accesories">Accesories</option>
            <option value="mobiles">Mobiles</option>
          </select>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-dark filter-search"
            onClick={() => {
              dispatch(filterProducts(searchkey, sort, category));
            }}
          >
            Search
          </button>
        </div>
      </div>
      <hr className="mt-1" />
    </div>
  );
}
