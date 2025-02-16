import { useState } from "react";

function OrderTab(props) {
  //const [tab,setTab] = useState(0)
  return (
    <nav className="slidemenu">
      {props.TabList &&
        props.TabList.map((tabItem, i) => (
          <>
            <input
              type="radio"
              name="slideItem"
              id={`slide-item-${i + 1}`}
              className="slide-toggle"
            />
            <label
              htmlFor={`slide-item-${i + 1}`}
              onClick={() => {
                props.setFilters((prevState) => ({
                  ...prevState,
                  shop: tabItem.type,
                }));
                props.setTab(i);
              }}
              className={props.tab === i ? "sliderMenuSelect" : "sliderMenu"}
            >
              <span>{tabItem.title}</span>
              <div className="sliderMenu"></div>
            </label>
          </>
        ))}
    </nav>
  );
}
export default OrderTab;
