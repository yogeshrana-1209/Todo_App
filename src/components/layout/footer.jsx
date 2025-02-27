import PropTypes from "prop-types";

const Footer = () => {
  return (
    // <footer className="bg-gray-100 text-white text-center py-4 shadow-md">
    //   <p className="text-sm text-black">Designed & Developed by</p>
    //   <a
    //     href={link}
    //     target="_blank"
    //     className="text-blue-600 hover:underline font-semibold"
    //     rel="noopener noreferrer"
    //     aria-label={`Visit ${name}'s portfolio`}
    //   >
    //     {name} ({title})
    //   </a>
    //   <p className="text-xs text-gray-400 mt-2">&copy; {new Date().getFullYear()} All Rights Reserved</p>
    // </footer>

    <footer className="bg-gray-200 text-black text-center py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

// );
// };

// PropTypes validation
Footer.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
};

export default Footer;
