import { Component } from "react";
import classes from "./Sidebar.module.scss";

import SearchBar from "../Navbar/Searchbar/Searchbar";

class Sidebar extends Component {

  render () {

    const className = {
      sidebar: `border-end bg-glass position-fixed d-flex overflow-auto p-5 
        ${classes.Sidebar} ${this.props.show ? classes.Show : ""}`,

      container: "row flex-column flex-nowrap",
      title: "fw-bold ls-95 my-5 text-dark mt-2",
      link: "link-gray text-decoration-none",
      linkDisabled: "text-gray-light text-decoration-none",
      ourTeam: "fw-semi-bold text-dark fs-5 ls-95",
      linkCredit: "link-primary text-decoration-none"
    }

    return (
      <div className={ className.sidebar }>
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
            <dd><a className={ className.link } href="#">Get your musics</a></dd>
            <dd><a className={ className.link } href="#">Histories</a></dd>
            <dd><a className={ className.linkDisabled }>Moods</a></dd>
          </div>

          <div className="col-auto mt-auto">
            <dt className={ className.ourTeam }>Our Team</dt>
            <p className="text-gray">Minh from <a className={ className.linkCredit } href="#">Hugo English Club</a></p>
          </div>

        </div>
      </div>
    );
  }
}

export default Sidebar;