import React, { useEffect, useState } from "react";

import axios from "axios";
import SearchPage from "./SearchPage";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFootballBall,
  faCaretRight,
  faFilter,
  faCircleCheck,
  faNewspaper,
  faGlobeAfrica,
  faComputer,
  faFilm,
  faBusinessTime,
  faTrain,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

export default function Blog({
  articles,
  headlines,
  search,
  newyorkTimes,
  selectedButtons,
  updateSelectedButtons,
  newyorkFilter,
  filterSearch,
  loadingFilter,
}) {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = today.toLocaleDateString(undefined, options);

  const [loading, setLoading] = useState(false);
  const [newyorkSearch, setNewyorkSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toggleButton = (button) => {
    const index = selectedButtons.indexOf(button);
    if (index === -1) {
      // Button is not selected, add it to the selected buttons array
      updateSelectedButtons([...selectedButtons, button]);
    } else {
      // Button is selected, remove it from the selected buttons array
      const updatedButtons = [...selectedButtons];
      updatedButtons.splice(index, 1);
      updateSelectedButtons(updatedButtons);
    }
  };
  useEffect(() => {
    filterSearch();
  }, [selectedButtons]);

  const isButtonSelected = (button) => {
    return selectedButtons.includes(button);
  };
  const handleSearchTimes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=${filter}&api-key=IdiGdBfcKykaIzMWTEVYjasnKnfFfGJj`
      );

      console.log(response.data.response.docs, "search times");
      setNewyorkSearch(response.data.response.docs);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };
  const handleSelectChange = (event) => {
    setFilterVisible(false);

    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
    setFilter(selectedValues);
  };

  const handlefilter = async () => {
    setFilterVisible(false);
  };

  return (
    <div>
      <div className="container mt-4 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-md-6">
              <h5 className="text-start text-bold mt-4">{dateString}</h5>

              <p className="text-start text-secondary mb-4">
                {newyorkSearch.length > 0 ? "Search Results" : "Todays News"}
              </p>
            </div>

            <div className="col-sm-12 col-lg-6 col-md-6">
              <div className="row">
                <div class=" has-search col-lg-8 d-flex justify-content-end">
                  <input
                    type="text"
                    class="form-control ms-2  w-search "
                    style={{ maxHeight: "50px" }}
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    class="btn  p-2 d-flex justify-content-center"
                    onClick={handleSearchTimes}
                    style={{ maxHeight: "50px" }}
                  >
                    Search
                  </button>
                </div>
                {!filterVisible && (
                  <div className="col-lg-4 col-sm-12 col-md-6">
                    <div className="row">
                      <button
                        class="btn  p-2 d-flex justify-content-center my-2 ms-3 "
                        onClick={() => {
                          setFilterVisible(true);
                        }}
                        style={{ alignSelf: "center", maxHeight: "50px" }}
                      >
                        <FontAwesomeIcon
                          icon={faFilter}
                          size="1x"
                          style={{ marginRight: "5px" }}
                        />
                        Filter
                      </button>
                      <ul>
                        {selectedOptions.map((option, index) => (
                          <ul key={index}>
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              size="1x"
                              color="green"
                            />{" "}
                            {option}
                          </ul>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {filterVisible && (
                  <div className="col-lg-4 col-sm-12 col-md-6">
                    <Form.Select
                      multiple
                      onChange={handleSelectChange}
                      value={selectedOptions}
                    >
                      <option value="sports">Sports</option>
                      <option value="film">Film</option>
                      <option value="food">Food</option>
                      <option value="Tech">Tech</option>
                    </Form.Select>
                    <button
                      onClick={() => {
                        handlefilter();
                      }}
                    >
                      done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {newyorkSearch.length > 0 ? null : (
          <div class="container">
            <div class="card border-0 ">
              <div>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("BBC") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("BBC")}
                >
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    size="1x"
                    color={`${isButtonSelected("BBC") ? "green" : ""}`}
                  />
                  <p>BBC</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("The Verge") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("The Verge")}
                >
                  <FontAwesomeIcon
                    icon={faGlobeAfrica}
                    size="1x"
                    color={`${isButtonSelected("The Verge") ? "green" : ""}`}
                  />
                  <p>The Verge</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("Sports") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("Sports")}
                >
                  <FontAwesomeIcon
                    icon={faFootballBall}
                    size="1x"
                    color={`${isButtonSelected("Sports") ? "green" : ""}`}
                  />
                  <p>Sports</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("Technology") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("Technology")}
                >
                  <FontAwesomeIcon
                    icon={faComputer}
                    color={`${isButtonSelected("Technology") ? "green" : ""}`}
                    size="1x"
                  />
                  <p>Technology</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("Films") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("Films")}
                >
                  <FontAwesomeIcon
                    icon={faFilm}
                    size="1x"
                    color={`${isButtonSelected("Films") ? "green" : ""}`}
                  />
                  <p>Films</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("Business") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("Business")}
                >
                  <FontAwesomeIcon
                    icon={faBusinessTime}
                    size="1x"
                    color={`${isButtonSelected("Business") ? "green" : ""}`}
                  />
                  <p>Business</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("Trains") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("Trains")}
                >
                  <FontAwesomeIcon
                    icon={faTrain}
                    size="1x"
                    color={`${isButtonSelected("Trains") ? "green" : ""}`}
                  />
                  <p>Trains</p>
                </button>
                <button
                  className={`btn m-2 ${
                    isButtonSelected("Foods") ? "selected" : ""
                  }`}
                  onClick={() => toggleButton("Foods")}
                >
                  <FontAwesomeIcon
                    icon={faBowlFood}
                    size="1x"
                    color={`${isButtonSelected("Foods") ? "green" : ""}`}
                  />
                  <p>Foods</p>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="container "></div>
        <div className="container">
          <SearchPage newyorkSearch={newyorkSearch} loading={loading} />
        </div>
        <div className="container">
          {!newyorkSearch.length > 0 ? null : (
            <div className="container">
              <div className="card border-0">
                <div>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("BBC") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("BBC")}
                  >
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      size="1x"
                      color={`${isButtonSelected("BBC") ? "green" : ""}`}
                    />
                    <p>BBC</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("The Verge") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("The Verge")}
                  >
                    <FontAwesomeIcon
                      icon={faGlobeAfrica}
                      size="1x"
                      color={`${isButtonSelected("The Verge") ? "green" : ""}`}
                    />
                    <p>The Verge</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("Sports") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("Sports")}
                  >
                    <FontAwesomeIcon
                      icon={faFootballBall}
                      size="1x"
                      color={`${isButtonSelected("Sports") ? "green" : ""}`}
                    />
                    <p>Sports</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("Technology") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("Technology")}
                  >
                    <FontAwesomeIcon
                      icon={faComputer}
                      color={`${isButtonSelected("Technology") ? "green" : ""}`}
                      size="1x"
                    />
                    <p>Technology</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("Films") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("Films")}
                  >
                    <FontAwesomeIcon
                      icon={faFilm}
                      size="1x"
                      color={`${isButtonSelected("Films") ? "green" : ""}`}
                    />
                    <p>Films</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("Business") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("Business")}
                  >
                    <FontAwesomeIcon
                      icon={faBusinessTime}
                      size="1x"
                      color={`${isButtonSelected("Business") ? "green" : ""}`}
                    />
                    <p>Business</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("Trains") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("Trains")}
                  >
                    <FontAwesomeIcon
                      icon={faTrain}
                      size="1x"
                      color={`${isButtonSelected("Trains") ? "green" : ""}`}
                    />
                    <p>Trains</p>
                  </button>
                  <button
                    className={`btn m-2 ${
                      isButtonSelected("Foods") ? "selected" : ""
                    }`}
                    onClick={() => toggleButton("Foods")}
                  >
                    <FontAwesomeIcon
                      icon={faBowlFood}
                      size="1x"
                      color={`${isButtonSelected("Foods") ? "green" : ""}`}
                    />
                    <p>Foods</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {newyorkFilter.length > 0 &&
          newyorkFilter[0].multimedia &&
          newyorkFilter[0].multimedia.length > 0 && (
        <div class="container pt-4">
          <h5 className="text-start text-bold">
            Trending
            <FontAwesomeIcon
              icon={faCaretRight}
              size="1x"
              style={{ marginLeft: "10px" }}
            />
          </h5>
        </div>
          )}
        {!loadingFilter ? (
          <div className="container py-3">
            {newyorkFilter.length > 0 &&
              newyorkFilter[0].multimedia &&
              newyorkFilter[0].multimedia.length > 0 && (
                <div class="card shadow border-0 ">
                  <div class="row ">
                    <div class="col-md-5">
                      <div class="carousel slide">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            {newyorkFilter[0].multimedia &&
                            newyorkFilter[0].multimedia.length > 0 ? (
                              <img
                                src={`https://www.nytimes.com/${newyorkFilter[0].multimedia[0].url}`}
                                alt={newyorkFilter[0].multimedia[0].url}
                                className="card-img-top img-fluid1"
                              />
                            ) : (
                              <img
                                src={`https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg`}
                                alt="no_image"
                                className="card-img-top img-fluid1"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-7 px-3 p-2">
                      <div class="card-block pe-4 mt-4">
                        <h4 class="card-title text-start">
                          {newyorkFilter[0].headline.main}
                        </h4>
                        <p class="card-text text-start">
                          {newyorkFilter[0].lead_paragraph}
                        </p>

                        <p href="#" class="card-text text-start text-secondary">
                          Read More...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}

        <div className="container py-3"></div>
        <div class="container pt-4">
          <h5 className="text-start text-bold text-secondary">
            Top story 
            <FontAwesomeIcon
              icon={faCaretRight}
              size="1x"
              style={{ marginLeft: "10px" }}
            />
          </h5>
        </div>
        <div className=" col-lg-12 col-md-9">
          {!loadingFilter ? (
            <div className="row">
              {newyorkFilter.slice(1, 6).map((filterResult) => (
                <div
                  className="col-xs-12 col-sm-12 col-md-4 col-lg-3"
                  key={filterResult._id}
                >
                  <div className="card shadow mb-3">
                    {filterResult.multimedia &&
                    filterResult.multimedia.length > 0 ? (
                      <img
                        src={`https://www.nytimes.com/${filterResult.multimedia[0].url}`}
                        alt={filterResult.multimedia[0].url}
                        className="card-img-top img-fluid1"
                      />
                    ) : (
                      <img
                        src={`https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg`}
                        alt="no_image"
                        className="card-img-top img-fluid1"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title h-title">
                        {filterResult.headline.main}
                      </h5>
                      <p className="card-text h-card">
                        {filterResult.lead_paragraph}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="spinner-border text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>

        <div className="container py-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-md-6">
              <h3 className="text-start text-bold pt-4">Trending -NewsApi</h3>
              <h5 className="text-start text-bold text-secondary pt-3">
                Big story
                <FontAwesomeIcon
                  icon={faCaretRight}
                  size="1x"
                  style={{ marginLeft: "10px" }}
                />
              </h5>
            </div>
          </div>
        </div>
        <div class="container py-3">
          {articles.length > 0 &&
            articles[1].urlToImage &&
            articles[1].description && (
              <div class="card shadow border-0 ">
                <div class="row ">
                  <div class="col-md-5">
                    <div class="carousel slide">
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            class="d-block rounded img-fluid"
                            src={articles[1].urlToImage}
                            alt={articles[1].urlToImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7 px-3 p-2">
                    <div class="card-block pe-4 mt-4">
                      <h4 class="card-title text-start">{articles[1].title}</h4>
                      <p class="card-text text-start">
                        {articles[1].description}
                      </p>

                      <p href="#" class="card-text text-start text-secondary">
                        Read More...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        <div class="container pt-4">
          <h5 className="text-start text-bold">
            Top story{" "}
            <FontAwesomeIcon
              icon={faCaretRight}
              size="1x"
              style={{ marginLeft: "10px" }}
            />
          </h5>
        </div>

        <div className="row mt-5">
          <div className=" col-lg-12 col-md-9">
            <div className="row">
              {articles.slice(1, 6).map(
                (article, index) =>
                  article.urlToImage &&
                  article.description && (
                    <div
                      className="col-xs-12 col-sm-12 col-md-4 col-lg-3"
                      key={index}
                    >
                      <div className="card shadow mb-3">
                        <img
                          src={article.urlToImage}
                          className="card-img-top img-fluid1 "
                          alt={article.urlToImage}
                        />
                        <div className="card-body">
                          <h5 className="card-title h-title  ">
                            {article.title}
                          </h5>
                          <p className="card-text h-card">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="container">
            <h5 className="text-start text-bold py-4">
              Local News - NewyorkTimes
            </h5>
            <div className="row">
              <div className="col-lg-9 col-md-9">
                <div className="row">
                  {newyorkTimes.map((newyorkTime, index) => (
                    <div
                      className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
                      key={index}
                    >
                      <div className="card shadow mb-3">
                        {newyorkTime.media &&
                          newyorkTime.media[0] &&
                          newyorkTime.media[0]["media-metadata"] && (
                            <img
                              src={
                                newyorkTime.media[0]["media-metadata"][2].url
                              } // Optional chaining operator
                              className="card-img-top img-fluid1"
                              alt={newyorkTime.title}
                            />
                          )}
                        <div className="card-body">
                          <h5 className="card-title ">{newyorkTime.title}</h5>
                          <p className="card-text ">{newyorkTime.abstract}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-3 col-md-3">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="card  mb-3 ">
                    <div className="m-2 ">
                      <h5 className="p-3  text-start">
                        Top Headlines - OpenNews
                      </h5>
                    </div>

                    <ul class="list-group list-group-flush">
                      {headlines.map((headline, index) => (
                        <li class="list-group-item" key={index}>
                          <div className="m-2">
                            <h6 className="text-start">{headline.title}</h6>
                          </div>
                          <div>
                            <p
                              className="text-secondary text-end mt-3"
                              style={{ fontSize: "13px" }}
                            >
                              {headline.published_date}
                            </p>
                          </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
