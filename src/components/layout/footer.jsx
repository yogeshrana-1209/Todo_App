import PropTypes from "prop-types";

const Footer = ({ name, link, title }) => {
  return (
    <footer className="pt-60">
      {/* Design & Developed By : */}
      <a
        href={link}
        target="_blank"
        className="text-blue-800"
        rel="noopener noreferrer"
      >
        <br /> {name} ({title})
      </a>
    </footer>
  );
};

// PropTypes validation
Footer.propTypes = {
  name: PropTypes.string.isRequired, // Developer's name (required)
  link: PropTypes.string.isRequired, // Developer's website URL (required)
  title: PropTypes.string.isRequired, // Developer's title (required)
};

export default Footer;
