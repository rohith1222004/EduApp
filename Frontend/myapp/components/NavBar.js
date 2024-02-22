import styles from '../app/page.module.css'
import logo from '../public/logo.png'
import Image from 'next/image'
import axios from 'axios';
import { jsPDF } from "jspdf";


export function NavBar() {
  const doc = new jsPDF();
  const handleFormulaClick = () =>{
    console.log("formula click"); 
    axios.post("http://127.0.0.1:5001/pdf").then(res => {
      console.log(res.data);
      doc.text(res.data, 10, 10);
      doc.save("a4.pdf");
    }).catch(err => {
      console.log(err);
    })
  }
    return (
    <div className={styles.navbar_wrap}>
      <div className={styles.navbar}>
        <div>
          <Image 
            className={styles.navbar__logo}
            src={logo}
            alt="logo" 
          />
        </div>

        <div className={styles.navbar__menu}>
          <a href="#">Dashboard</a>
          {/* <a href="/Learn">Learn</a> */}
          <a href="/QuizPage">Quiz</a>
          <a href="#" onClick={handleFormulaClick}>Formula</a>
          <a href="/Remainders">Remainders</a>
        </div>  
      </div>
    </div>
    )
  }