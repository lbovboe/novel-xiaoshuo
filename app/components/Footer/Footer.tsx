const Footer = () => {
  return (
    /* 
      Footer container:
      - mt-auto: Pushes footer to bottom when content is shorter than viewport
      - bg-light/dark-paper: Theme-based background color
      - border-t: Top border for visual separation
    */
    <footer className="mt-auto border-t border-light-border bg-light-paper/30 dark:border-dark-border dark:bg-dark-paper/30">
      {/* 
        Container for content:
        - container: Sets max-width and centers content
        - mx-auto: Centers container horizontally
        - px-4: Adds horizontal padding
      */}
      <div className="container mx-auto px-4">
        {/* 
          Content wrapper:
          - flex flex-col: Stack items vertically on mobile
          - md:flex-row: Place items side by side on medium screens
          - justify-between: Space items apart
          - items-center: Center items vertically
          - py-4: Vertical padding
        */}
        <div className="flex flex-col items-center justify-between py-4 md:flex-row">
          {/* 
            Copyright text:
            - text-sm: Smaller font size
            - text-light/dark-text-secondary: Theme-based text color
          */}
          <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>

          {/* 
            Links container:
            - flex gap-4: Horizontal layout with spacing
            - mt-2: Top margin on mobile
            - md:mt-0: Remove top margin on medium screens
          */}
          <div className="mt-2 flex gap-4 md:mt-0">
            {/* 
              Footer links:
              - hover:text-light/dark-primary: Theme-based hover color
              - transition-colors: Smooth color transition
            */}
            <a
              href="#"
              className="text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
