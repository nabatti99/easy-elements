
/**
 * @param iconSize 1 (biggest) -> 5
 * @param faceColor bootstrap V5 color
 * @param textColor bootstrap V5 color
 */
 const sadFace = props => (
  <div className="container-fluid">
    <div className="row flex-column justify-content-center align-items-center h-100">
      <div className="col-auto">
        <p className={`text-${props.faceColor} h${props.iconSize} m-0`}>
          <i className="ri-emotion-sad-line"></i>
        </p>
      </div>
      { 
        props.children && <div className="col-auto">
          <h4 className={ `fw-semi-bold ls-95 text-${props.textColor}` }>{ props.children }</h4>
        </div>
      }
    </div>
  </div>
);

export default sadFace;