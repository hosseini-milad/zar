import React, { useState } from "react";
import Status from "../Components/Status";
import env, { normalPriceCount, rxFindCount } from "../../env";

function GalleryTableRow(props) {
  const [openOption, setOpenOption] = useState(0);
  const [checkState, setCheckState] = useState(false);
  const activeAcc = props.index === props.detail;
  const slider = props.slider;
  return (
    <React.Fragment>
      <tr className={activeAcc ? "activeAccordion" : "accordion"}>
        <td className="checkBoxStyle">
          <input
            type="checkbox"
            name=""
            id=""
            checked={checkState}
            onChange={(e) => setCheckState(checkState ? false : true)}
          />
        </td>
        <td>
          <div style={{ fontSize: "1rem", fontWeight: "600" }}>
            {slider.gCode}
          </div>
        </td>
        <td>
          <div>
            <img
              src={slider ? env.siteApiUrl + slider.thumbUrl : ""}
              alt={slider ? slider.title : "default"}
              style={{ width: "60px" }}
            />
          </div>
        </td>

        <td>
          <div className="cu-product">
            {slider &&
              slider.productList &&
              slider.productList.map((product, p) => (
                <p key={p} className="product-list">
                  {product.title}
                </p>
              ))}
          </div>
        </td>

        <td>
          <Status
            status={slider.active ? "Active" : "deActive"}
            class={"order-status"}
            lang={props.lang}
          />
        </td>
        <td>
          <div className="more-btn">
            <i
              className="tableIcon fas fa-edit"
              onClick={() =>
                (window.location.href = "/gallery/detail/" + slider._id)
              }
            ></i>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}
export default GalleryTableRow;
