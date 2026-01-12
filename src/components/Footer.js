const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">

        {/* Tagline */}
        <p className="footer-tagline">
          “The job you seek is seeking you.”
        </p>

        {/* Creator Info */}
        <p className="footer-credit">
          Built with ❤️ by <strong>Abinash Nayak</strong>
        </p>

        {/* Social Links */}
        <div className="footer-links">
          <a
            href="https://github.com/Abinash-Nayak-2003"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/jasu1/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()} Seeker. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
