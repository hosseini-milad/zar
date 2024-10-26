import { normalPriceCalc, normalPriceCount } from "../../env";
import Num2persian from 'num2persian';
var token = JSON.parse(localStorage.getItem('token-lenz'));

function OfficialPrint(props){
    const content =  props.content

    return(
        <div className="zar-print">
          <div className="header">
            <div className="image-wrapper">
              <img src="\img\zar-logo.PNG" alt="Logo" />
            </div>
            <div className="info-wrapper">
            <div className="user-info">
                <p>مهسا رنجبر</p>
                <p><span>کد:</span>3352</p>
                <p>091366002001</p>
              </div>
            </div>
            <div className="info-wrapper">
              
                <div className="container">
                  <div className="date">
                    <p>تاریخ:</p>
                    <p></p>
                  </div>
                  <div className="number">
                    <p>شماره سند:</p>
                    <p></p>
                  </div>
                
              </div>
              
            </div>
            
          </div>
          <div className="main">
            <table>
              <thead>
                <tr>
                  <th className="xsmall-td">ردیف</th>
                  <th className="larg-td">شرح</th>
                  <th className="xsmall-td">عیار</th>
                  <th className="meduim-td">وزن 750</th>
                  <th className="small-td">وزن</th>
                  <th className="small-td">فی</th>
                  <th className="larg-td">مبلغ(ریال)</th>
                </tr>
              </thead>
              <tbody className="sell-to-customer">
                {content&&content.items&&content.items.map((Item,i)=>
                <tr key={i}>
                  <td className="xsmall-td">{i+1}</td>
                  <td className="larg-td">{Item.title}</td>
                  <td className="xsmall-td"></td>
                  <td className="meduim-td"></td>
                  <td className="small-td">{Item.weight}</td>
                  <td className="small-td">{normalPriceCount(Item.unitPrice)}</td>
                  <td className="larg-td"></td>
                </tr>)}
              </tbody>
              {/* <tbody className="buy-from-customer">
                <tr>
                  <td className="xsmall-td">ردیف</td>
                  <td className="larg-td">شرح</td>
                  <td className="xsmall-td">عیار</td>
                  <td className="meduim-td">وزن 750</td>
                  <td className="small-td">وزن</td>
                  <td className="small-td">فی</td>
                  <td className="larg-td">مبلغ(ریال)</td>
                </tr>
              </tbody> */}
            </table>
            <div className="more-info">
              <div className="zar-box">
                <p className="date"></p>
                <p className="title">مانده این سند:</p>
              </div>
              <div className="zar-box"><p></p></div>
              <div className="zar-box"><p></p></div>
            </div>
            <div className="gold-info">
              <div className="date"></div>
              <div className="zar-box">
                <div className="zar-box-item">
                  <p>یک گرم طلا بدون اجرت:</p>
                  <p></p>
                </div>
                <div className="zar-box-item">
                  <p>یک مثقال طلای 17 عیار:</p>
                  <p></p>
                </div>
                <div className="zar-box-item">
                  <p>انس طلا:</p>
                  <p></p>
                </div>
              </div>
              <div className="zar-box">
                <div className="zar-box-item">
                  <div className="title"><p>قبل:</p></div>
                  <div className="content"><p></p></div>
                  <div className="content"><p></p></div>
                </div>
                <div className="zar-box-item">
                  <div className="title"><p>نهایی:</p></div>
                  <div className="content"><p></p></div>
                  <div className="content"><p></p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="title"></div>
            <div className="container">
              <div className="item"><p>صادرکننده</p></div>
              <div className="item">
                <p>Tel: 021 916 915 19</p>
                <p>Instagram: BarzegarGold</p>
                <p>WhatsApp: 09103186010</p>
              </div>
              <div className="item"><p>تحویل گیرنده اصلی</p></div>
            </div>
          </div>
        </div>
    )

  }

export default OfficialPrint