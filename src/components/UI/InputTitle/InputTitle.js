import withUrlController from "../../WithUrlController/WithUrlController";
import classes from "./InputTitle.module.scss";

/**
 * @param value: String
 * @param changed: handleFunction
 * @param submitted: handle Function
 */
const inputTitle = props => {

  const className = {
    form: classes.Form,
    label: `input-group-text bg-transparent border-0 me-1 p-0 ${classes.Label}`,
    input: `form-control bg-transparent border-0 shadow-none p-1 fw-semi-bold fs-4 ls-95 ${classes.Input}`,
    icon: "ri-links-fill fw-bold fs-4"
  }

  return (
    <div className="row align-items-center h-100">
      <div className="col">

        <form className={ className.form } onSubmit={ props.submitted }>
          <div className="input-group">
            <label 
              htmlFor="SearchUrl" 
              className={ className.label }>
              <i className={ className.icon }></i>
            </label>
            <input 
              className={ className.input }
              type="url" 
              id="SearchUrl" 
              name="url" 
              placeholder="Put your URL here"
              value={ props.value }
              onChange={ props.changed } />
          </div>
        </form>

      </div>
    </div>
  );
}

export default withUrlController(inputTitle);