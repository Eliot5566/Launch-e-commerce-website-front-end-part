import './page.css';
import main1 from './images/專題2/品牌2.png';

import React, { Component, useEffect } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'animate.css';

function Page() {
  // border border-dark
  return (
    <div>
      <div >
        <div>

      

<div className="container-fluid">
 <div className="row d-flex align-items-center">
  <div className="col-md-6">
    <div>
            <h1 className=" text-center fw-bold animate__animated animate__bounce  ">
              關於我們的故事
            </h1>

            <h2 className="text-center fw-bold ">「拾月菓」</h2>
            <br></br>
            <h4 className=" animate__fadeInDown  mx-5 fw-bold lh-3 ">
            拾月菓，源於對日本傳統烘焙藝術的熱愛，我們致力於將最高品質的日本果子點帶給您。我們的名字意味著每月的圓滿與豐收，這正是我們所追求的完美。
              每一個果子點都是匠心獨運，精選優質食材，以最嚴格的標準手工製作而成。
              無論您是在追求美味的旅途中，還是在日常生活中尋找特別的享受，拾月菓都為您提供一場獨一無二的味覺饗宴。
            </h4>
          </div>
  </div>
  <div className="col-md-6">
        
          <img
            className="img-fluid shadow p-3 mb-5 handmade "
            src={main1}
            alt=""
          />
  </div>
 </div>
</div>


        </div> 
      </div>
    </div>
  );
}

export default Page;