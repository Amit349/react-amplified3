import React from "react";


function forHeader(date:Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
 
 
        const Header = ()=>{
            return(
              <h2>{year}年  {month}月</h2>
            )
          }
    console.log(Header)
    };
    
    export default forHeader;

 