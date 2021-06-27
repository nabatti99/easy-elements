import classes from "./MusicInfo.module.scss";

import MusicAbout from "./MusicAbout/MusicAbout";
import MusicPlaylist from "./MusicPlaylist/MusicPlaylist";
import MusicRelatedMusics from "./MusicRelatedMusics/MusicRelatedMusics";

/**
 * @param categories Object(CategoryParent: Array[CategoryName])
 * @param urlImagePlaylist String (url)
 * @param playlistId Number
 * @param relatedMusics Array[Object]{ id, name, urlThumb }
 * @param props.sharedPlaylist Button Event
 */
const musicInfo = props => {

  const className = {
    about: "col-lg-5 col-md-7 col-12",
    playlist: "col-lg-3 col-md-5 col-12",
    relatedMusic: "col-lg-4 col-12",
    title: "ls-95 fw-bold text-dark",
    titleArea: `row align-items-end mt-5 mb-4 ${classes.Title}`
  }

  return (
    <div>
      <div className="container">
        <div className="row">

          <div className={ className.about }>
            <div className={ className.titleArea }>
              <div className="col-auto">
                <h1 className={ className.title }>About</h1>
              </div>
            </div>

            <MusicAbout
              categories={ props.categories } />
          </div>

          <div className={ className.playlist }>
            <div className={ className.titleArea }>
              <div className="col-auto">
                <h3 className={ className.title }>Playlist</h3>
              </div>
            </div>

            <MusicPlaylist 
              urlImage={ props.urlImagePlaylist }
              playlistId={ props.playlistId }
              shared={ props.sharedPlaylist } />
          </div>

          <div className={ className.relatedMusic }>
            <div className={ className.titleArea }>
              <div className="col-auto">
                <h3 className={ className.title }>Related Musics</h3>
              </div>
            </div>

            <MusicRelatedMusics
              relatedMusics={ props.relatedMusics } />
          </div>

        </div>
      </div>
    </div>
  );
}

export default musicInfo;