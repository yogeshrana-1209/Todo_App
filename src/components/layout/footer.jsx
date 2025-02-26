import PropTypes from "prop-types";

const Footer = ({ name, link, title }) => {
  return (
    <footer className="pt-6 justify-center text-center">
      Design & Developed By :
      <a
        href={link}
        target="_blank"
        className="text-blue-800"
        rel="noopener noreferrer"
        aria-label={`Visit ${name}'s portfolio`}
      >
        <br /> {name} ({title})
      </a>
    </footer>
  );
};

// PropTypes validation
Footer.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
