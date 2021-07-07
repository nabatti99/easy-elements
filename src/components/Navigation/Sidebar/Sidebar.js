import { Component, createRef } from "react";
import classes from "./Sidebar.module.scss";

import SearchBar from "../../UI/Searchbar/Searchbar";

/**
 * @param show Boolean
 * @param clickedOutside Event
 */
class Sidebar extends Component {

  sideBarRef = createRef();

  activeHandler = false;

  componentDidUpdate() {
    if (this.props.show){
      this.activeHandler = false;
      document.addEventListener("click", this.handleClickedOutside);
      console.log("add Event");
    }
  }

  handleClickedOutside = (event) => {

    if (!this.activeHandler) {
      this.activeHandler = true;
      return;
    }

    const sideBar = this.sideBarRef.current;
    const targetClicked = event.target;

    if (sideBar !== targetClicked && !sideBar.contains(targetClicked)) {
      this.props.clickedOutside();
      document.removeEventListener("click", this.handleClickedOutside);
    }
  }

  render () {

    const className = {
      sidebar: `bg-glass position-fixed d-flex overflow-auto scrollbar p-5 transition-slow 
        ${classes.Sidebar} ${this.props.show ? classes.Show : ""}`,

      container: "row flex-column flex-nowrap",
      title: "fw-bold ls-95 my-5 text-dark mt-2",
      link: "link-gray text-decoration-none",
      linkDisabled: "text-gray-light text-decoration-none",
      ourTeam: "fw-semi-bold text-dark fs-5 ls-95",
      linkCredit: "link-primary text-decoration-none"
    }

    return (
      <div className={ className.sidebar } ref={ this.sideBarRef }>
        <div className={ className.container } >

          <div className="col-auto">
            <SearchBar />
          </div>

          <div className="col-auto">
            <h1 className={ className.title }>
              Easy<br/>Elements
            </h1>
          </div>

          <div className="col-auto mb-4">
            <dd><a className={ className.link } href="/">Get your musics</a></dd>
            <dd><a className={ className.link } href="/history">History</a></dd>
            <dd><a className={ className.linkDisabled } href="/moods" >Moods</a></dd>
          </div>

          <div className="col-auto mt-auto">
            <dt className={ className.ourTeam }>Our Team</dt>
            <p className="text-gray">Minh from <a className={ className.linkCredit } href="https://www.facebook.com/HUGOClub">Hugo English Club</a></p>
          </div>

        </div>
      </div>
    );
  }
}

export default Sidebar;