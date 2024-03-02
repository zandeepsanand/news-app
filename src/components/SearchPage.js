import React from "react";

export default function SearchPage({ newyorkSearch, loading }) {
  return (
    <div className="container">
      {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="row">
          {newyorkSearch
            .filter(
              (search) =>
                search.multimedia &&
                search.multimedia.some((media) => media.subtype === "xlarge")
            ) // Filter out items without an "xlarge" image
            .map((search, index) => (
              <div
                className="col-xs-12 col-sm-12 col-md-4 col-lg-3"
                key={index}
              >
                <div className="card shadow mb-3">
                  {/* Find the first multimedia object with subtype "xlarge" */}
                  {search.multimedia &&
                    search.multimedia.length > 0 &&
                    search.multimedia.find(
                      (media) => media.subtype === "xlarge"
                    ) && (
                      <img
                        src={`https://www.nytimes.com/${
                          search.multimedia.find(
                            (media) => media.subtype === "xlarge"
                          ).url
                        }`}
                        className="card-img-top img-fluid1"
                        alt={search.abstract}
                      />
                    )}
                  <div className="card-body">
                    <h5 className="card-title h-title ">
                      {search.headline.main}
                    </h5>
                    <p className="card-text h-card">{search.lead_paragraph}</p>
                  </div>
                </div>
              </div>
            ))}
            
        </div>
      )}
    </div>
  );
}
