import PropTypes from "prop-types";

const AlbumCard = ({ album, searchTerm }) => {

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi"); // Case-insensitive matching
    return text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`); // Wrap match in <mark>
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-lg font-bold">Id : {album.id}</h2>
      <h2 className="text-lg font-bold">Title</h2>
      <h3
        className="text-sm font-semibold"
        dangerouslySetInnerHTML={{ __html: highlightText(album.title, searchTerm) }}
      />
      {/* <h5 className="text-sm font-semibold mt-2">{album.title}</h5> */}
    </div>
  );
};

// **PropTypes Validation**
AlbumCard.propTypes = {
  album: PropTypes.shape({
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  searchTerm: PropTypes.string,
};

export default AlbumCard;
