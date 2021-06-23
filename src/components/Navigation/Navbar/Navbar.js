import { Component } from "react";
import classes from "./Navbar.module.scss"

import Logo from "../../../assets/images/logo.png";
import SearchBar from "./Searchbar/Searchbar";

class Navbar extends Component {

  render() {

    const className = {
      navbar: `navbar navbar-expand-md border-bottom position-fixed top-0 start-0 bg-glass vw-100`,
      button: "navbar-toggler d-flex shadow-none me-4",
      container: `container-fluid justify-content-start`,
      menuIcon: "ri-menu-line ri-lg",
      collapse: "collapse navbar-collapse",
      itemsList: "list-group list-group-horizontal",
      itemArea: "list-group-item border-0 p-0"
    }

    return (
      <nav className={ className.navbar }>
        <div className={ className.container }>
          <button class={ className.button } type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <i class={ className.menuIcon }></i>
          </button>
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="Logo" height="24px" />
          </a>
          <div class={ className.collapse } id="navbarSupportedContent">
            <div className="container-fluid">
              <div class="row align-item-center">

                <div className="col">
                  <SearchBar />
                </div>

                <div className="col-auto">
                  <ul class={ className.itemsList }>
                    <li class={ className.itemArea }>
                      <a class="nav-link" href="https://artlist.io/">
                        <img src="https://artlist.io/Content/images/Artlist_Logo_32px.png" width={45} alt="Artlist Logo" />
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

      </nav>
    );
  }
}

export default Navbar;