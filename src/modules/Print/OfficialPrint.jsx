import { normalPriceCalc, normalPriceCount } from "../../env";
import Num2persian from 'num2persian';
var token = JSON.parse(localStorage.getItem('token-lenz'));

function OfficialPrint(props){
    

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
                  <th>ردیف</th>
                  <th>شرح</th>
                  <th>عیار</th>
                  <th>وزن 750</th>
                  <th>وزن</th>
                  <th>فی</th>
                  <th>مبلغ(ریال)</th>
                </tr>
              </thead>
              <tbody className="sell-to-customer">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tbody className="buy-from-customer">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
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