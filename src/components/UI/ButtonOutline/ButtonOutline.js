/**
 * @param textColor: List colors at Bootstrap V5
 * @param children: Text value
 * @param clicked: onClick Event
 */
 const buttonOutline = props => {

  const className = [
    "btn", 
    "rounded-pill",
    "fw-semi-bold", 
    "px-4",
    "shadow-none",
    "ls-95",
    `btn-outline-${props.textColor}`,
    props.className ? props.className : ""
  ];

  return (
    <button 
      className={className.join(" ")}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
}

export default buttonOutline;