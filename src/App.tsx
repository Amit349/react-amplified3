/* src/App.js */
import React, { useEffect } from 'react'
import { Amplify,  } from 'aws-amplify'

import awsExports from "./pages/aws-exports";

import { withAuthenticator, Button as Abutton, Heading, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

//import style from '@/styles/Home.module.css'
import Button from '@material-ui/core/Button' ;
import { borders } from '@material-ui/system';
import { Box } from '@material-ui/core';
//import {Header} from './components/header'




Amplify.configure(awsExports);


function App ({signOut, user})  {

  const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();

const showDate = new Date(today.getFullYear(), today.getMonth(),1);

  

  function createProcess(year: number, month: number) {
    let calendar = "<table>"+<Box className='dayofweek'>
    for (let i = 0; i < week.length; i++) {
        calendar += <Box>{week}[i]</Box>;
    } 
    calendar += </Box>
   //このようなjsxで書かれたHTMLタグをmaterial-UIの<Box>コンポーネント(又は複数の種類のコンポーネント)に書き換えたい

    let count = 0;
    let startDayOfWeek = new Date(year, month, 1).getDay();
    let endDate = new Date(year, month + 1, 0).getDate();
    let lastMonthEndDate = new Date(year, month, 0).getDate();
    let row = Math.ceil((startDayOfWeek + endDate) / week.length);

    for (let i = 0; i < row; i++) {
        calendar += "<tr>"
        for (let j = 0; j < week.length; j++) {
            if (i === 0 && j < startDayOfWeek) {
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                count++;
                if(year === today.getFullYear()
                  && month === (today.getMonth())
                  && count === today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }          //↑のようなタグも全てコンポーネントに書き換えた方が良いのか？
    return calendar;
  }


 function showProcess(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
   // document.querySelector('#header')!.innerHTML = year + "年 " + (month + 1) + "月";
   //↓のHeaderコンポーネントに変更したいがスコープが異なるため呼び出せない
    const Header = () =>{
    <h2>{year}年  {month}月</h2>
   }

    let calendar = createProcess(year, month);
    document.querySelector('#calendar')!.innerHTML = calendar //←この部分を<Calendar>コンポーネントに付けたい
    
    };

 useEffect(() => {

showProcess(today)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

 function last(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
    console.log(showDate)
}


function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
    console.log("chip")
    let B =0
console.log(B)
     B++
    if(B===3){
  console.log(B)
}
}


  return (
    <>
      <View style={styles.container}>
        <Heading level={3}>Hello {user.username}</Heading>
        <Abutton onClick={signOut}>Sign out</Abutton>
      </View>

      <div className="wrapper">
        <h1 id = "header"> </h1>
        {/*ここでHeaderコンポーネントを呼び出したい*/}

        <Box border={1} />
        <Box borderTop={1} />
        <Box borderRight={1} />
        <Box borderBottom={1} />
        <Box borderLeft={1} />



      <div id="next-last-btn">
       <Button variant="contained" id="last" onClick={last}>＜</Button>
       <Button variant="contained" id="next" onClick={next}>＞</Button>
      </div>
      <div id="calendar"></div>
      

    </div>
       
    </>

  )
}

const styles = {
  container: { width: 250,  display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 25 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);