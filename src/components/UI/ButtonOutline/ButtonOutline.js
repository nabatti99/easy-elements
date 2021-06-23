/**
 * 
 * @param props 
 * bgColor: List colors at Bootstrap V5
 * 
 * children: Text value
 * 
 * clicked: onClick Event
 * 
 * @returns ButtonElement
 */
 const buttonOutline = props => {

  const className = [
    "btn", 
    "rounded-pill",
    "fw-semi-bold", 
    "px-4",
    "shadow-none",
    "ls-95",
    `btn-outline-${props.bgColor}`
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