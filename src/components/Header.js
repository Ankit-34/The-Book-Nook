import React, {useContext} from 'react'
import '../style/Header.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link} from 'react-router-dom'

const Header = ({cartCount}) => {

    // const state = { data: user };
    // console.log("Here present :::" , user);
    
  return (
    <div className="Header">
        <div className="logo">Book Store</div>

        <div className="searchbar">
          <TextField className="search" id="standard-basic" label="Search" variant="filled" />
          <SearchOutlinedIcon className="s_icon" onClick={()=>{console.log("Hii")}} />
        </div>

        {/* <div className="user">
            <div className='noti'>
            <Badge badgeContent={user?.items?.length || 0} color="error">
                <Link to="/cart" state={user}>
                    <ShoppingCartIcon/>
                </Link>
              </Badge>
            </div>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Stack>
          <p>{user?.username}</p>
        </div> */}
      </div>
  )
}

export default Header