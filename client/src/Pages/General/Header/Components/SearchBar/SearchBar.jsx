import React from 'react'
import style from './SearchBar.module.css'

export default function SearchBar() {
  return (
    <>
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
      <div className={style.searchBar}>
        <input type="text" placeholder='Search'/>
        <span className={style.search}>
          <i class="uil uil-search"></i>
        </span>
        
      </div>
    </>
  )
}
