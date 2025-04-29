const Footer = () => {
  return (
    /* 
      Footer container:
      - mt-auto: Pushes footer to bottom when content is shorter than viewport
      - bg-light/dark-paper: Theme-based background color
      - border-t: Top border for visual separation
    */
    <footer className="mt-auto border-t border-solid border-light-border bg-light-paper/30 py-6 dark:border-dark-border dark:bg-dark-paper/30">
      {/* 
        Container for content:
        - container: Sets max-width and centers content
        - mx-auto: Centers container horizontally
        - px-4: Adds horizontal padding
      */}
      <div className="container mx-auto px-4">
        {/* Disclaimer at top */}
        <div className="mb-2 text-center">
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            最爱小说阅读网所有小说作品均来自网友上传或转载于其他网站，版权属于原创作者。如侵犯了您的权利，请与本站联系，本站将立刻删除。
          </p>
        </div>

        {/* Bottom footer with copyright and links */}
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm md:mt-0">
            <div className="text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Copyright © {new Date().getFullYear()} 最爱小说网 版权所有 All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/privacy"
                className="text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
              >
                隐私政策
              </a>
              <span>|</span>
              <a
                href="/terms"
                className="text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
              >
                服务条款
              </a>
              <span>|</span>
              <a
                href="/disclaimer"
                className="text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
              >
                免责声明
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
