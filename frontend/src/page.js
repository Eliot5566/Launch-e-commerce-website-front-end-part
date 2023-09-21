import './page.css';
import main1 from './images/專題2/品牌故事圖.png';

//
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function page() {
  return (
    <div>
      <section>
        <div className="pagesContainer d-flex  align-items-center text background ">
          <div className="row border border-dark m-2 mt-5  align-items-center">
            <div className="col-4">
              <img
                className="img-fluid handmade rounded mx-auto d-block align-items-center m-4"
                src={main1}
                alt=""
              />
            </div>
            <div className="col-8">
              <h1 className="border border-dark text-center fw-bold">
                關於我們的故事
              </h1>

              <h2 className="border border-dark m-1  text-center fw-bold">
                「拾月菓」
              </h2>
              <br></br>
              <h4 className="border border-dark m-3 fw-bold lh-3">
              拾月菓，源於對日本傳統烘焙藝術的熱愛，我們致力於將最高品質的日本果子點帶給您。我們的名字意味著每月的圓滿與豐收，這正是我們所追求的完美。
              每一個果子點都是匠心獨運，精選優質食材，以最嚴格的標準手工製作而成。
              無論您是在追求美味的旅途中，還是在日常生活中尋找特別的享受，拾月菓都為您提供一場獨一無二的味覺饗宴。
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
