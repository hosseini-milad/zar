import { normalPriceCalc, normalPriceCount } from "../../env";
import Num2persian from "num2persian";
var token = JSON.parse(localStorage.getItem("token-lenz"));

function OfficialPrint(props) {
  const content = props.content.data;
  const sale = props.content.saleItems;
  const buy = props.content.purchaseItems;
  const TransData = props.content.transactions;
  const Total = props.content.calcFaktor;
  const user = props.user;
  const date = new Date(content.initDate);
  console.log(content);
  return (
    <div className="zar-print">
      <div className="header">
        <div className="image-wrapper"></div>
        <div className="info-wrapper col4">
          <div className="container">
            <div className="date">
              <p>تاریخ:</p>
              <p>{date.toLocaleDateString("fa")}</p>
            </div>
            <div className="number">
              <p>شماره سند:</p>
              <p>{content.Sh_Faktor}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="user-info">
        مشتری گرامی:
        <p>{user.username}</p>
        <p>
          <span>کد:</span>
          {user.cCode}
        </p>
        <p>{user.phone}</p>
      </div>

      <div className="main">
        <table>
          <thead>
            <tr>
              <th className="xsmall-td">ردیف</th>
              <th className="larg-td">شرح</th>
              <th className="xsmall-td">عیار</th>
              <th className="small-td">وزن 750</th>
              <th className="small-td">وزن</th>

              <th className="larg-td">مبلغ(ریال)</th>
            </tr>
          </thead>
          {sale && sale.data && (
            <tbody className="sale-table">
              {sale.data.map((Item, i) => (
                <tr key={i} className="sale-tr">
                  <td className="xsmall-td">{Item.index}</td>
                  <td className="larg-td">{Item.title}</td>
                  <td className="xsmall-td">{Item.ayar}</td>
                  <td className="small-td"></td>
                  <td className="small-td">{Item.weight}</td>

                  <td className="larg-td">{normalPriceCount(Item.price)}</td>
                </tr>
              ))}
              <tr className="sale-tr-total">
                <td className="xsmall-td"></td>
                {/* <td className="larg-td">{`مجموع کل اجناس [+9% مالیات بر ارزش افزوده(${normalPriceCount(
                  sale.saleDetail.tax
                )})]`}</td> */}
                <td className="larg-td">
                  <p className="tax-p">
                    <span>مجموع کل اجناس</span>
                    <span>
                      {"[+9% مالیات بر ارزش افزوده" +
                        "(" +
                        normalPriceCount(Total.totalTax) +
                        ")]"}
                    </span>
                  </p>
                </td>
                <td className="xsmall-td"></td>
                <td className="small-td"></td>
                <td className="small-td">{Total.totalSaleWeight}</td>

                <td className="larg-td">{normalPriceCount(Total.totalSale)}</td>
              </tr>
            </tbody>
          )}
          {buy && buy.data && (
            <tbody className="buy-table">
              {buy.data.map((Item, i) => (
                <tr key={i} className="buy-tr">
                  <td className="xsmall-td">{Item.index}</td>
                  <td className="larg-td">{Item.title}{Item.count&&"(تعداد:"+Item.count+")"}</td>
                  <td className="xsmall-td">{Item.ayar}</td>
                  <td className="small-td"></td>
                  <td className="small-td">{Item.weight}</td>

                  <td className="larg-td">
                    {normalPriceCount(Item.fullPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {TransData && (
            <tbody className="buy-table">
              {TransData.map((Item, i) => (
                <tr key={i} className="buy-tr">
                  <td className="xsmall-td"></td>
                  <td className="larg-td">{Item.title}</td>
                  <td className="xsmall-td"></td>
                  <td className="small-td"></td>
                  <td className="small-td"></td>

                  <td className="larg-td">{normalPriceCount(Item.payValue)}</td>
                </tr>
              ))}
            </tbody>
          )}
          <tbody className="buy-table">
            <tr className="add-tr">
              <td className="xsmall-td"></td>
              <td className="larg-td">تخفیف</td>
              <td className="xsmall-td"></td>
              <td className="small-td"></td>
              <td className="small-td"></td>

              <td className="larg-td">{normalPriceCount(Total.totalDiscount)}</td>
            </tr>
            <tr className="add-tr">
              <td className="xsmall-td"></td>
              <td className="larg-td">بدهی</td>
              <td className="xsmall-td"></td>
              <td className="small-td"></td>
              <td className="small-td"></td>

              <td className="larg-td">{normalPriceCount(Total.totalDebit)}</td>
            </tr>
          </tbody>
        </table>
        <table className="more-info">
          <tr>
            <td className="zar-box first-box">
              <p className="title">مانده این سند:</p>
            </td>
            <td className="zar-box">
              <p></p>
            </td>
            <td className="zar-box">
              <p>{normalPriceCount(Total.totalRemain)}</p>
            </td>
          </tr>
        </table>
        <div className="gold-info">
          <div className="zar-box gold-day">
            <div className="zar-box-item">
              <p>یک گرم طلا بدون اجرت:</p>
              <p>{normalPriceCount(content.unitPrice)}</p>
            </div>
            <div className="zar-box-item">
              <p>یک مثقال طلای 17 عیار:</p>
              <p></p>
            </div>
          </div>
          <div className="zar-box history">
            <div className="zar-box-item">
              <div className="content title">
                <p>قبل:</p>
              </div>
              <div className="content">
                <p></p>
              </div>
              <div className="content">
                <p></p>
              </div>
            </div>
            <div className="zar-box-item">
              <div className="content title">
                <p>نهایی:</p>
              </div>
              <div className="content">
                <p></p>
              </div>
              <div className="content">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="title">اشتباه از طرفین قابل برگشت هست</div>
        <div className="container">
          <div className="item sign-item">
            <p>صادرکننده</p>
          </div>
          <div className="item ">
            <p>Tel: 021 916 915 19</p>
            <p>Instagram: BarzegarGold</p>
            <p>WhatsApp: 09103186010</p>
          </div>
          <div className="item sign-item">
            <p>تحویل گیرنده اصلی</p>
          </div>
        </div>
      </div>
      <button className="print-btn noprint" onClick={() => window.print()}>
        چاپ
      </button>
    </div>
  );
}

export default OfficialPrint;
