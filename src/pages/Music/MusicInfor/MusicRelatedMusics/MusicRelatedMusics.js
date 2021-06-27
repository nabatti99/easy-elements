import classes from "./MusicRelatedMusics.module.scss";

/**
 * @param relatedMusics Array[Object]{ id, name, urlThumb }
 */
 const musicRelatedMusics = props => {

  const className = {
    linkArea: `color-light-hover transition-normal ${classes.LinkArea} fw-semi-bold`,
    image: "w-100"
  }

  const parsedRelatedMusics = props.relatedMusics
  .map(relatedMusic => (
    <div key={ relatedMusic.id } className="col-md-4 col-6 mb-4">
      <div className="position-relative">
        <img src={ relatedMusic.urlThumb } className={ className.image } alt={ relatedMusic.name } />
        <a href={ `/music/${relatedMusic.id}` } className={ className.linkArea }>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-auto">
              <p className="text-center m-0 p-2">{ relatedMusic.name }</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  ));

  return (
    <div className="row">

      { parsedRelatedMusics }

    </div>
  );
};

export default musicRelatedMusics;