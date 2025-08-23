/**
 * Page Controller
 * Handles serving HTML pages with proper error handling
 */

const path = require('path');
const fs = require('fs');

class PageController {
  /**
   * Serve an HTML page with error handling
   */
  servePage(pageName) {
    return (req, res) => {
      try {
        const htmlPath = path.join(__dirname, '../../../public/html', `${pageName}.html`);
        
        // Check if file exists
        if (!fs.existsSync(htmlPath)) {
          console.error(`HTML file not found: ${htmlPath}`);
          return res.status(404).sendFile(path.join(__dirname, '../../../public/html/home.html'));
        }
        
        res.sendFile(htmlPath);
      } catch (error) {
        console.error(`Error serving ${pageName}.html:`, error);
        res.status(500).send('Internal Server Error');
      }
    };
  }

  /**
   * Serve home page
   */
  home(req, res) {
    this.servePage('home')(req, res);
  }

  /**
   * Serve game page
   */
  game(req, res) {
    this.servePage('game')(req, res);
  }

  /**
   * Serve login page
   */
  login(req, res) {
    this.servePage('login')(req, res);
  }

  /**
   * Serve register page
   */
  register(req, res) {
    this.servePage('register')(req, res);
  }

  /**
   * Serve profile page
   */
  profile(req, res) {
    this.servePage('profile')(req, res);
  }

  /**
   * Serve introduction page
   */
  introduction(req, res) {
    this.servePage('introduction')(req, res);
  }
}

module.exports = PageController;
