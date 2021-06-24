/**
 * 
 * @param props 
 * 
 * value: String
 * 
 * onChange: handleFunction
 * 
 * @returns 
 */
const inputTitle = props => (
  <div className="row align-items-center h-100">
    <div className="col">

      <form>
        <div className="input-group">
          <label 
            htmlFor="SearchUrl" 
            className="input-group-text bg-transparent border-0 me-1 p-0">
            <i className="ri-search-2-line"></i>
          </label>
          <input 
            className="form-control bg-transparent border-0 shadow-none p-1" 
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

export default inputTitle;