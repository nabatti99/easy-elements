/**
 * @param categories Object(CategoryParent: Array[CategoryName])
 */
 const SFXAbout = props => {

  const className = {
    smallTitle: "ls-95 fw-bold text-dark fs-4",
    paragraph: "text-gray",
    link: "text-decoration-none link-gray me-2"
  }

  const parseCategories = Object.keys(props.categories).sort()
    .map(categoryParent => {

      let items = null;

      if (categoryParent === "Mood" || categoryParent === "Genre") {
        items = props.categories[categoryParent]
          .map(categoryName => (
              <a 
                href={`/genre/${categoryName}`} 
                className={ className.link } 
                key={ categoryName }>{ categoryName }</a>
          ));
      }

      else
        items = props.categories[categoryParent].join(", ");

      return (
        <div className="col-auto mb-4" key={ categoryParent }>
          <h3 className={ className.smallTitle }>{ categoryParent }</h3>
          <p className={ className.paragraph }>{ items }</p>
        </div>
      );
    });

  return (
    <div className="row flex-column">

      { parseCategories }

    </div>
  );
};

export default SFXAbout;