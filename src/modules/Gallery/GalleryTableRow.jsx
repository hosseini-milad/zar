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
          <div className="order-id">{slider.gCode}</div>
        </td>
        <td>
          <div>
            <img
              src={slider ? env.siteApiUrl + slider.thumbUrl : ""}
              alt={slider ? slider.title : "default"}
            />
          </div>
        </td>

        <td>
          <div className="cu-avatar">
            <div className="cu-name">
              <p className="name">{slider.title}</p>
              <p className="email">{slider.sku}</p>
            </div>
          </div>
        </td>

        <td>
          <Status
            status={slider.status}
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
