import React, { useState } from 'react'
import '../style/Header.css'
import BookList from './BookList';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';

const Header = ({cartCount}) => {
    const username = useSelector(item => item.user.name)
    const role = useSelector(item => item.user.role);
    const [query, setQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    // console.log(" temp : ", temp);
  return (
    <div className="Header">
      <div className="logo">The Book Nook</div>

      <div className="searchbar">
        <TextField
          className="search"
          id="standard-basic"
          label="Search"
          variant="filled"
          onInput={(e) => {
            setQuery(e.target.value);
          }}
        />
        <SearchOutlinedIcon
          className="s_icon"
          onClick={async (e) => {
            var config = {
              method: "get",
              maxBodyLength: Infinity,
              url: "http://localhost:5000/api/book/search?keyword=New book description",
              headers: {},
            };

            const res = await axios.get(`https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${query}`);
            console.log("Query based books : ", res);

            setFilteredBooks(res.data.result);
          }}
        />
      </div>

      <div className="user">
        <div className="noti">
          {role === "seller" && (
            <>
              <Link to="/add-book">
                Add Book
              </Link>
            </>
          )}
          <Badge badgeContent={0} color="error">
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
          </Badge>
        </div>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Stack>
        <p>{username}</p>
      </div>
    </div>
  );
}

export default Header