import PropTypes from "prop-types";
import AlbumCard from "./albumCard";

const AlbumList = ({ albums, searchTerm }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

// **PropTypes Validation**
AlbumList.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string,
};

export default AlbumList;
