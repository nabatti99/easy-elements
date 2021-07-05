import * as statusText from "../statusText";

/**
 * @param filterBy History Page statusText
 * @param changed Event
 */
const historyHeader = props => {

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <h2 className="fw-bold ls-95 text-dark">Music History</h2>
        </div>
        <div className="col-auto">
          <select className="form-select shadow-none" value={ props.filterBy } onChange={ props.changed }>
            <option value={ statusText.ORDER_BY_DATE }>Order by Date</option>
            <option value={ statusText.ORDER_BY_NAME }>Order by Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default historyHeader;