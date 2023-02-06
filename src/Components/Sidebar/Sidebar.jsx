import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BrowserRouter, Link, Route, useParams, Routes } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Select a Subject</h2>
            <ul>
                <li>
                    <Link to="/subject/history">History</Link>
                </li>
                <li>
                    <Link to="/subject/science">Science</Link>
                </li>
                <li>
                    <Link to="/subject/fiction">Fiction</Link>
                </li>
                <li>
                    <Link to="/subject/mystery">Mystery</Link>
                </li>
                <li>
                    <Link to="/subject/romance">Romance</Link>
                </li>
            </ul>
        </div>
    );
};

const Subject = () => {
    const [book, setBook] = useState([]);
    const { subject } = useParams();

    useEffect(() => {
        axios
            .get(`https://openlibrary.org/subjects/${subject}.json`)
            .then(res => {
                setBook(res.data.works.slice(0, 10));
            });
    }, [subject]);
    return (
        <div className="sidebar sub-books">
            <table>
                <thead>
                    <tr>
                        <th>Top 10 {subject} books</th>
                    </tr>
                </thead>
                <tbody>
                    {book.map((item) => (
                        <tr key={item.key}>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">
                <button className="btn">Home</button>
            </Link>
        </div>
    );
};

const SidebarApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Sidebar />} />
                <Route exact path="subject/:subject" element={<Subject />} />
            </Routes>
        </BrowserRouter>
    )
}

export default SidebarApp;




