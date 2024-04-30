import React from 'react'
import './Category.css';
import { Link } from 'react-router-dom';

const Category = () => {

    return (
        <div className='category'>
            <div className="category-card">
                <Link to={'/category/Sports Shoes'}>
                    <div className="category-img">
                        <img src='https://th.bing.com/th?id=OIP.d-7UFbAaPsT2y3dYpaKm1AHaFb&w=291&h=214&c=8&rs=1&qlt=30&o=6&dpr=1.3&pid=3.1&rm=2' />
                    </div>
                    <div className="category-text">Men's Sports Shoes</div>
                </Link>
            </div>

            <div className="category-card">
                <Link to={'/category/Casual Shoes'}>
                    <div className="category-img">
                        <img src='https://th.bing.com/th?id=OIP.1RfKeDjiffAd7MnXDykgcQAAAA&w=285&h=219&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' />
                    </div>
                    <div className="category-text">Men's Casual Shoes</div>
                </Link>
            </div>

            <div className="category-card">
                <Link to={'/category/Sandals Floaters'}>

                    <div className="category-img">
                        <img src='https://th.bing.com/th/id/OIP.-hvGrOXnJImD0nc2vBKvTgAAAA?w=384&h=384&rs=1&pid=ImgDetMain' />
                    </div>
                    <div className="category-text">Men's Sandals & Floaters</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Flip Flops'}>

                    <div className="category-img">
                        <img src='https://th.bing.com/th/id/OIP.lTrfbb9ZNecrLv7zHMdToAHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7' />
                    </div>
                    <div className="category-text">Men's Slippers & Flip Flops</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Formal Shoes'}>

                    <div className="category-img">
                        <img src='https://th.bing.com/th?q=Formal+Shoes+for+Men+India&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247' />
                    </div>
                    <div className="category-text">Men's Formal Shoes</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Ethnic Shoes'}>

                    <div className="category-img">
                        <img src='https://5.imimg.com/data5/WQ/EO/MY-409102/mens-black-sherwani-shoes-punjabi-juti-for-men-ethnic-mojari.jpg' />
                    </div>
                    <div className="category-text">Men's Ethnic Shoes</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Loafers Shoes'}>

                    <div className="category-img">
                        <img src='https://th.bing.com/th?id=OIP.XBW5Xz1nMB8hii2FDpP_uQAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' />
                    </div>
                    <div className="category-text">Men's Loafers</div>
                </Link>

            </div>

            <div className="category-card">
                <Link to={'/category/Boots Shoes'}>

                    <div className="category-img">
                        <img src='https://th.bing.com/th?id=OIP.hkYo9ZWeaSACXRkciFkCDwHaFs&w=284&h=219&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' />
                    </div>
                    <div className="category-text">Men's Boots</div>
                </Link>

            </div>

        </div>
    )
}

export default Category