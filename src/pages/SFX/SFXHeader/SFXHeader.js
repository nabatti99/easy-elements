import classes from "./SFXHeader.module.scss";

import Button from "../../../components/UI/Button/Button";
import ButtonOutline from "../../../components/UI/ButtonOutline/ButtonOutline";

/**
 * @param title: String
 * @param artist: String
 * @param bgUrl: String (Url)
 * @param isPlaying: Boolean
 * @param toggled: handle PlayButton Toggle
 * @param downloaded: handle GetItButton Clicked
 * @param shared: handle ShareButton Clicked
 */
const SFXHeader = props => {

  const className = {
    title: "ls-95 fw-bold text-white",
    subtitle: "text-light fs-4",
    artist: "text-primary text-decoration-none"
  }

  return (
    <div style={{ backgroundImage: `url(${ props.bgUrl })` }} className={ classes.SFXHeaderBg }>
      <div className="container">
        <div className="row flex-column py-5">

          <div className="col-auto">
            <h2 className={ className.title }>{ props.title }</h2>
            <p className={ className.subtitle }>
              Song by <a className={ className.artist } href={ `https://artlist.io/artist/${props.artistId}` }>{ props.artist }</a>
            </p>
          </div>

          <div className="col-auto">
            <div className="row">

              <div className="col-auto">
                <Button 
                  textColor="white"
                  bgColor="primary"
                  clicked={ props.toggled } >{ props.isPlaying ? "Pause" : "Play" }</Button>
              </div>

              <div className="col-auto">
                <ButtonOutline 
                  textColor="light"
                  clicked={ props.downloaded } >Get It</ButtonOutline>
              </div>

              <div className="col-auto">
                <ButtonOutline 
                  textColor="light"
                  clicked={ props.shared } >Share</ButtonOutline>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SFXHeader;