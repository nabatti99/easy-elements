import { Component } from "react";

import ButtonOutline from "../../../components/UI/ButtonOutline/ButtonOutline";
import InputTitle from "../../../components/UI/InputTitle/InputTitle";

import classes from "./HomeHeader.module.scss";
import RadioImg from "../../../assets/images/radio.png";
import RadioImgBg from "../../../assets/images/radio-bg.png";
import RectangleBg from "../../../assets/images/Blue Blur Rectangle.png";

class Header extends Component {

  render () {

    const className = {
      container: "container",
      header: `row align-items-stretch ${classes.Header}`,
      titleArea: `row flex-column ${classes.Title}`,
      title: "fw-bold ls-95 text-dark",
      radioArea: "position-relative h-100"
    }

    return (
      <div className={ className.container }>
        <div className={ className.header }>
          <div className="col-lg-7 col-md-6 col-12">

            <div className={ className.titleArea }>

              <img src={ RectangleBg } className={ classes.RectangleBg } alt="RectangleBg" />

              <div className="col mb-5">
                <h1 className={ className.title }>Boost your videos<br/>by royalty resources</h1>
              </div>

              <div className="col mb-3">
                <InputTitle 
                  value="123"
                  placeholder="Put your URL here"
                  id="SearchTitle"
                  icon="ri-links-fill">Put your URL here</InputTitle>
              </div>

              <div className="col">
                <ButtonOutline 
                  className="me-3"
                  textColor="dark" 
                  onClick={null}>Genres</ButtonOutline>

                <ButtonOutline 
                  textColor="dark" 
                  onClick={null}>History</ButtonOutline>
              </div>

            </div>

          </div>

          <div className="col-lg-5 col-md-6 col-12">
            <div className={ className.radioArea }>
              <img src={ RadioImg } className={ classes.Radio } alt="Radio" />
              <img src={ RadioImgBg } className={ classes.RadioBg } alt="RadioBg" />
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Header;