import React from "react";
import adminAllBooksStyle from "./adminAllBooks.module.css";
import x from "../../../assets/icons/862px-Delete-button 1.svg";
import update from "../../../assets/icons/Vector (4).svg";
import { Link } from "react-router-dom";

function adminAllBooks({ books, authors, categories, handleDeleteBook }) {
  

  return (
    <div>

      <div className={adminAllBooksStyle.allBooks}>
        
        <div className={adminAllBooksStyle.overflow}>
          <table>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>
                      {
                        authors.find((author) => author._id === book.authorId)
                          ?.firstName
                      }{" "}
                      {
                        authors.find((author) => author._id === book.authorId)
                          ?.lastName
                      }
                    </td>
                    <td>
                      {
                        categories.find(
                          (category) => category._id === book.categoryId
                        )?.name
                      }
                    </td>
                    <td>{book.ISBN}</td>
                    <td>{book.rating}</td>
                    <td className={adminAllBooksStyle.buttonContainer}>
                      <Link
                        to={"/dashboard/adminAddBook/Edit"}
                        state={{ book }}
                      >
                        <button className={adminAllBooksStyle.updateDelete}>
                          <img src={update} alt="update" />
                        </button>
                      </Link>
                      <button
                        className={adminAllBooksStyle.updateDelete}
                        onClick={() => {
                          handleDeleteBook(book._id);
                        }}
                      >
                        <img src={x} alt="delete" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default adminAllBooks;
