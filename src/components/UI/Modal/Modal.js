import classes from "./Modal.module.scss";

import Button from "../Button/Button";

/**
 * @param title String
 * @param children React Children
 * @param buttonMessage String
 * @param clickedCloseButton Event
 * @param disabledCloseButton Boolean
 * @param clicked Event
 */
const modal = props => {
  return (
    <div className={`${classes.Modal} ${ props.show ? classes.Show : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content bg-glass shadow">
          <div className="modal-header">
            <h5 className="modal-title">{ props.title }</h5>
            <button 
              className="btn-close" 
              onClick={ props.clickedCloseButton }
              disabled={ props.disabledCloseButton } ></button>
          </div>
          <div className="modal-body">
            { props.children }
          </div>
          <div className="modal-footer justify-content-center border-0">
            <Button
              textColor="dark"
              bgColor="transparent"
              onClick={ props.clicked }>{ props.buttonMessage }</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default modal;