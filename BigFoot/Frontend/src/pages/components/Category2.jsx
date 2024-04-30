import React from 'react'
import './Category.css';
import { Link } from 'react-router-dom';


const Category = () => {
    return (
        <div className='category'>
            <div className="category-card">
                <Link to={'/category/Sports Shoes'}>
                    <div className="category-text">Men's Sports Shoes</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Casual Shoes'}>
                    <div className="category-text">Men's Casual Shoes</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Sandals Floaters'}>
                    <div className="category-text">Men's Sandals & Floaters</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Flip Flops'}>
                    <div className="category-text">Men's Slippers & Flip Flops</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Formal Shoes'}>
                    <div className="category-text">Men's Formal Shoes</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Ethnic Shoes'}>
                    <div className="category-text">Men's Ethnic Shoes</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Loafers Shoes'}>
                    <div className="category-text">Men's Loafers</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Boots Shoes'}>
                    <div className="category-text">Men's Boots</div>
                </Link>

            </div>

        </div>
    )
}

export default Category