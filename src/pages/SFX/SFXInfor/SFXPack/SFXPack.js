import classes from "./SFXPack.module.scss";
import Button from "../../../../components/UI/Button/Button";
import ButtonOutline from "../../../../components/UI/ButtonOutline/ButtonOutline";

/**
 * @param urlImage string(url)
 * @param packId Number
 * @param shared Button Event
 */
 const SFXPack = props => {

  return (
    <div className={classes.SFXArea}>
      <div className="row justify-content-center">

        <div className="col-auto mb-4">
          <img src={ props.urlImage } height="200px" alt="Pack Thumb" />
        </div>

        <div className="col-auto mb-3">
          <a href={ `https://artlist.io/album/${props.packId}` }>
            <Button
              textColor="white"
              bgColor="primary">View Full</Button>
          </a>
        </div>

        <div className="col-auto mb-4">
          <ButtonOutline
            textColor="dark"
            onClick={ props.shared } >Share It</ButtonOutline>
        </div>

      </div>
    </div>
  );
};

export default SFXPack;