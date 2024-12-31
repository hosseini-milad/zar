import React from 'react'
import "./SetOrderCol.css"
export default function SetOrderCol() {
  return (
    <div className='SetOrderCol'>
      <div className="container">
        <p className="title">سفارش زمانبندی</p>
        <div className="input-container">
          <div className="input-wrapper">
            <label htmlFor="category">نیازمندی</label>
            <select id="category"></select>
          </div>
          <div className="input-wrapper W50">
            <label htmlFor="date">تاریخ تحویل</label>
            <select id="date"></select>
          </div>
          <div className="input-wrapper W50">
            <label htmlFor="count">حجم خرید</label>
            <select id="count"></select>
          </div>
          <div className="input-wrapper">
            <label htmlFor="phone">شماره تماس</label>
            <input type="text" id="phone" style={{textAlign:"left"}}/>
          </div>
          <div className="input-wrapper W50">
            <label htmlFor="company">شرکت</label>
            <select id="company"></select>
          </div>
          <div className="input-wrapper W50">
            <label htmlFor="metod">طریقه خرید</label>
            <select id="metod"></select>
          </div>
        </div>
        <button className="submit-btn">جزئیات سفارش</button>
        <span>بعد از تایید مدیریت سفارش شما پردازش خواهد شد.</span>
      </div>
    </div>
  )
}
