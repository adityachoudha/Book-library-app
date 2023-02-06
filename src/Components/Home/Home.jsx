import { useEffect, useState } from "react";
import "./Home.css";
import Sidebar from "../Sidebar/Sidebar";
import Mainbar from "../Mainbar/Mainbar";

function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  async function FetchBooks() {

    try {

      const response = await fetch(`https://openlibrary.org/search.json?title=${searchTerm}&offset=${offset}&limit=${limit}`);
      const data = await response.json();
      setBooks(data.docs);

      if (books) {
        setSearchResult("Your Search Results");
      } else {
        setSearchResult("No search Found");
        setSearchTerm("");
      }
    } catch (error) {
      setSearchTerm("");
      setSearchResult("No search Found");
    }
  };

  function handleClearSearch() {
    setSearchTerm("");
    setBooks([]);
  };

  function handleNext() {
    setOffset(offset + limit);
  };

  function handlePreview() {
    setOffset(offset - limit);
  };

  useEffect(() => {
    FetchBooks();
  }, [searchTerm, offset]);


  return (
    <div className="home">
      <section className="head">
        <h2>Find your book of choice.</h2>
        <input type="search" placeholder="Search Book By Title or By Author" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <section>
          <button className="btn" onClick={FetchBooks}>Search</button>
          <button className="btn" onClick={handleClearSearch}>Clear</button>
        </section>
      </section>
      <section className="main-content">
        <section className="sidebar-container">
          <Sidebar />
        </section>
        <section className="mainbar">
          {books.map((item)=>(
            <div className="bookList" key={item.key}>
              <Mainbar
                title={item.title}
                author={item.author_name}
                publish={item.first_publish_year}
                cover_id={item.cover_i} />
            </div>
          ))} 
          { (searchTerm.length > 0) ?
          <section className="page-btn">
            <button disabled={offset === 0} className="btn" onClick={handlePreview}>Preview</button>
            <button className="btn" onClick={handleNext}>Next</button>
          </section> : null}
        </section>
      </section>

    </div>
  )
}

export default Home