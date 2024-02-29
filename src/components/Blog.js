import React from "react";

export default function Blog({ articles, headlines,search }) {
  if (!articles || articles.length === 0) {
    return <div>No articles to display</div>;
  } else if (!headlines) {
    return <div>No headlines to display</div>;
  }
  return (
    <div>
      <div className="container mt-4 ">
        <div className="card text-center mt-5">
          <div className="card-header">Featured</div>
          <div className="card-body">
            <h5 className="card-title">Welcome to World News portal</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a
              href="#"
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Click to Personalize your news feed
            </a>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">2 days ago</div>
        </div>
        <div className="row mt-5">
        <div className="col-lg-3 col-md-3">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="card mt-5 mb-3">
            <ul class="list-group list-group-flush">
              {headlines.map((headline, index) => (
                <li class="list-group-item" key={index}>
                  {headline.title}
                </li>
              ))}
              {search.map((headline, index) => (
                <li class="list-group-item" key={index}>
                  {headline.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
          <div className=" col-lg-9 col-md-9">
            <div className="row">
            {articles.map((article, index) => (
                (article.urlToImage && article.description) ? (
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
                    <div className="card shadow mb-3">
                      <img
                        src={article.urlToImage}
                        className="card-img-top"
                        alt={article.urlToImage}
                      />
                      <div className="card-body">
                        <h5 className="card-title h-title">{article.title}</h5>
                        <p className="card-text h-card">
                          {article.description}
                        </p>
                      </div>
                      <div className="card-body card-p">
                        <div className="row">
                          <div className="col col-xs-4 ">
                            <i className="far fa-comments"></i> 1.1k
                          </div>
                          <div className="col col-xs-4 ">
                            <i className="far fa-heart"></i> 108
                          </div>
                          <div className="col col-xs-4">
                            <i className="fas fa-share"></i> 629
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
              
              
            </div>
          </div>
        
        </div>
      
      </div>
    </div>
  );
}
