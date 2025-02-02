import { useState } from "react";
import tabletrans from "../../translate/tables";
import GalleryTableRow from "./GalleryTableRow";

function GalleryTable(props) {
  const slider = props.slider;
  const lang = props.lang;
  const [detail, showDetail] = useState(-1);
  return (
    <table>
      <thead>
        <tr>
          <th className="checkBoxStyle">
            <input type="checkbox" name="" id="" />
          </th>
          <th style={{ textAlign: "center" }}>
            <p>{tabletrans.id[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.galleryimage[lang]}</p>
            <i></i>
          </th>
          <th>
            <p>{tabletrans.productTitle[lang]}</p>
            <i></i>
          </th>

          <th>
            <p>{tabletrans.status[lang]}</p>
            <i></i>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {slider && slider.data
          ? slider.data.map((slider, i) => (
              <GalleryTableRow
                detail={detail}
                showDetail={showDetail}
                slider={slider}
                index={i}
                key={i}
                lang={lang}
              />
            ))
          : ""}
      </tbody>
    </table>
  );
}
export default GalleryTable;
