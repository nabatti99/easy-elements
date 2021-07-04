import classes from "./Searchbar.module.scss";
import withUrlController from "../../WithUrlController/WithUrlController";

/**
 * @param value: String
 * @param changed: handleFunction
 * @param submitted: handle Function
 */
const searchBar = props => (
  <div className="row align-items-center h-100">
    <div className="col">

      <form onSubmit={ props.submitted } className={ classes.Form }>
        <div className="input-group">
          <label 
            htmlFor="SearchUrl" 
            className="input-group-text bg-transparent border-0 me-1 p-0">
            <i className="ri-search-2-line"></i>
          </label>
          <input 
            className="form-control bg-transparent border-0 shadow-none p-1 me-4" 
            type="url" 
            id="SearchUrl" 
            name="url" 
            placeholder="Put Artlist's URL here"
            value={ props.value }
            onChange={ props.changed } />
          <button className={ `btn text-gray fw-semi-bold ls-95 ${classes.Button}` }>Search</button>
        </div>
      </form>

    </div>
  </div>
);

export default withUrlController(searchBar);