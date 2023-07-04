import axios from 'axios'
import '../style/BookList.css'
import React, { useEffect, useState } from 'react'
import Card from './Card';

const BookList = () => {

    const [bookList, setBookList] = useState([]);

    const fetchBookList = async () => {
        const res = await axios.get('https://book-e-sell-node-api.vercel.app/api/book/all');
        const result = res.data.result;
        setBookList(result);
        console.log("Book List Fetched..");
    }

    useEffect(()=>{
        fetchBookList();
    }, []);

  return (
    <div className='bookList'>

        {
            bookList.map((book) => {
                return <Card book={book} />
            })
        }

    </div>
  )
}

export default BookList