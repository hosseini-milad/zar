import React from "react";
import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="ul-wrapper">
          <div className="ul-list">
            <div className="ul-header">درباره ما</div>
            <ul>
              <li>
                <a href="#">About eWorldTrade</a>
              </li>
              <li>
                <a href="#">Representative Offices</a>
              </li>
              <li>
                <a href="#">Countries</a>
              </li>
              <li>
                <a href="#">Learning Center</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="ul-list">
            <div className="ul-header">قوانین و مقررات</div>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">IPR Policy</a>
              </li>
              <li>
                <a href="#">Product Listing Policy</a>
              </li>
              <li>
                <a href="#">鄂ICP备19025023号</a>
              </li>
            </ul>
          </div>
          <div className="ul-list">
            <div className="ul-header">تماس با ما</div>
            <ul>
              <li>
                <a href="#">Post your Requirement</a>
              </li>
              <li>
                <a href="#">+1 (469) 551-5690</a>
              </li>
              <li>
                <a href="#">support@eworldtrade.com</a>
              </li>
              <li>
                <a href="#">
                  1910 Pacific Avenue, <br />
                  Suit No. 8025, Dallas, Texas United States{" "}
                </a>
              </li>
              
            </ul>
          </div>
          <div className="ul-list ul-pic">
            <ul>
              <li>
                <a href="#">
                  <img src="./img/Banner-1.webp" alt="Banner1" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="./img/Banner-2.webp" alt="Banner2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="./img/Banner-3.webp" alt="Banner3" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="./img/Banner-4.webp" alt="Banner4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="icon-wrapper">
          <a href="#">
            <img src="./img/flogo.svg" alt="logo" style={{minWidth:"240px"}}/>
          </a>
          <a href="#">
            <img src="./img/google-play.webp" alt="google play" style={{minWidth:"140px"}}/>
          </a>
          <ul className="ul-icon">
            <li>
              <a href="#">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="description-wrapper">
          <p>
            All Offers/Products/Company Profiles/Images and other user-posted
            contents are posted by the user and eWorldTrade.com shall not be
            detained accountable for any such content.
          </p>
        </div>
      </div>
      <div className="copyright">
        <p> Copyrights © 2024 eworldtrade.com, All Rights Reserved </p>
      </div>
    </footer>
  );
}
