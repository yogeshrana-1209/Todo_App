import PropTypes from "prop-types";

const AlbumCard = ({ album }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-lg font-bold">Id : {album.id}</h2>
      <h2 className="text-lg font-bold">Title</h2>
      <h5 className="text-sm font-semibold mt-2">{album.title}</h5>
    </div>
  );
};

// **PropTypes Validation**
AlbumCard.propTypes = {
  album: PropTypes.shape({
    // thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
