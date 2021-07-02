
/**
 * @param loadingColor bootstrap V5 color
 * @param textColor bootstrap V5 color
 */
const loading = props => (
  <div className="container-fluid">
    <div className="row flex-column justify-content-center align-items-center h-100">
      <div className="col-auto">
        <div className={ `spinner-grow text-${props.loadingColor}` }></div>
      </div>
      { props.children && <div className="col-auto">
        <h3 className={ `fw-semi-bold ls-95 text-${props.textColor}` }>{ props.children }</h3>
      </div>}
    </div>
  </div>
);

export default loading;