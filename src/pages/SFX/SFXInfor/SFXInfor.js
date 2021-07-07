import classes from "./SFXInfor.module.scss";

import SFXAbout from "./SFXAbout/SFXAbout";
import SFXPack from "./SFXPack/SFXPack";
import SFXRelatedSFXs from "./SFXRelatedSFXs/SFXRelatedSFXs";

/**
 * @param categories Object(CategoryParent: Array[CategoryName])
 * @param urlImagePack String (url)
 * @param packId Number
 * @param relatedSFXs Array[Object]{ id, name, urlThumb }
 * @param sharedPack Button Event
 */
const SFXInfo = props => {

  const className = {
    about: "col-lg-5 col-md-7 col-12",
    pack: "col-lg-3 col-md-5 col-12",
    relatedSFX: "col-lg-4 col-12",
    title: "ls-95 fw-bold text-dark",
    titleArea: `row align-items-end mt-5 mb-4 ${classes.Title}`
  }

  return (
    <div className={ classes.Background }>
      <div className="container">
        <div className="row">

          <div className={ className.about }>
            <div className={ className.titleArea }>
              <div className="col-auto">
                <h1 className={ className.title }>About</h1>
              </div>
            </div>

            <SFXAbout
              categories={ props.categories } />
          </div>

          <div className={ className.pack }>
            <div className={ className.titleArea }>
              <div className="col-auto">
                <h3 className={ className.title }>SFX Pack</h3>
              </div>
            </div>

            <SFXPack
              urlImage={ props.urlImagePack }
              packId={ props.packId }
              shared={ props.sharedPack } />
          </div>

          <div className={ className.relatedSFX }>
            <div className={ className.titleArea }>
              <div className="col-auto">
                <h3 className={ className.title }>Related SFXs</h3>
              </div>
            </div>

            <SFXRelatedSFXs
              relatedSFXs={ props.relatedSFXs } />
          </div>

        </div>
      </div>

      <div style={{ height: "100px" }}></div>
    </div>
  );
}

export default SFXInfo;