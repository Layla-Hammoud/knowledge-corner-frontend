import React, { useState, useEffect } from "react";
import AllBooksStyle from "./AllBooks.module.css";
import filter from "../../assets/icons/filter.png";
import axios from "axios";
import magnifire from "../../assets/icons/magnifire.jpeg";
import TempBookCard from "../BookCard/tempBookCard";

const AllBooks = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    console.log("clicked"); // Toggle the menuOpen state
  };

  //fetch data get books using axios
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        // Extract author IDs from books and fetch author names
        const authorIds = res.data.map((book) => book.authorId);
        fetchAuthors(authorIds);
      })
      .catch((err) => console.log(err));
  }, []);
  // Function to fetch author names based on authorIds
  const fetchAuthors = (authorIds) => {
    // Make an API call to fetch author names based on authorIds
    // Replace 'yourAuthorAPIEndpoint' with the actual endpoint to fetch authors
    axios
      .get("http://localhost:4000/api/authors", {
        params: { authorIds: authorIds },
      })
      .then((res) => {
        // Create a mapping of authorId to author name
        const authorMap = {};
        // console.log(res.data)
        res.data.forEach((author) => {
          authorMap[author._id] = author.firstName;
          // console.log(author.firstName)
        });
        setAuthors(authorMap);
        console.log(books);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className={AllBooksStyle.bookSearch}>
        <input
          id="search"
          className={AllBooksStyle.inputSearch}
          type="text"
          placeholder="Search For Books"
        />
        <button for="#search" className={AllBooksStyle.searchButton}>
          <img src={magnifire} alt="search img" width="25" height="20" />
        </button>
      </form>

      <div className={AllBooksStyle.filterCategories}>
        <input
          type="text"
          id="Categories"
          name="Categories "
          value="Search for Categories"
        />
        <button for="#Categories" onClick={handleClick}>
          <img src={filter} alt="filter" />
        </button>
      </div>
      <div className={AllBooksStyle.booksContainer}>
        {/* categories fiels */}
        <div
          className={`${AllBooksStyle.booksCategory} 
          ${menuOpen ? AllBooksStyle.open : ""}
          `}
        >
          <h2>Categories</h2>
          <div className={AllBooksStyle.bookCheckbox}>
            <input
              type="checkbox"
              id="fiction"
              name="fiction "
              value="fiction"
            />
            <label for="Fiction"> Fiction</label>

            <br></br>
          </div>
          <div className={AllBooksStyle.bookCheckbox}>
            <input
              type="checkbox"
              id="fiction"
              name="fiction "
              value="fiction"
            />
            <label for="Horror"> Horror</label>

            <br></br>
          </div>
          <div className={AllBooksStyle.bookCheckbox}>
            <input
              type="checkbox"
              id="fiction"
              name="fiction "
              value="fiction"
            />
            <label for="Drama"> Drama</label>

            <br></br>
          </div>
        </div>

        {/* book list */}
        <div className={AllBooksStyle.booksList}>
          {books.map((book) => (
            <TempBookCard
              image={book.image}
              author={authors[book.authorId]}
              bookTitle={book.title}
              rating={book.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
