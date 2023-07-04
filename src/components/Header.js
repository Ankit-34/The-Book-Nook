import React from 'react'
import '../style/Header.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = ({cartCount}) => {
    const username = useSelector(item => item.user.name)
  return (
    <div className="Header">
        <div className="logo">The Book Nook</div>

        <div className="searchbar">
          <TextField className="search" id="standard-basic" label="Search" variant="filled" />
          <SearchOutlinedIcon className="s_icon" onClick={()=>{console.log("Hii")}} />
        </div>

        <div className="user">
            <div className='noti'>
            <Badge badgeContent={0} color="error">
                <Link to="/cart">
                    <ShoppingCartIcon/>
                </Link>
              </Badge>
            </div>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Stack>
          <p>{username}</p>
        </div>
      </div>
  )
}

export default Header