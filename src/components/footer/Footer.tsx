import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-primary-500">
              Zukus
            </h3>
            <p className="text-secondary-100">
              Transforming the way you experience luxury and convenience in your
              daily life.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-secondary-100 hover:text-primary-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-secondary-100 hover:text-primary-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-secondary-100 hover:text-primary-500 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-secondary-100 hover:text-primary-500 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-primary-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-100 hover:text-primary-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-secondary-100 hover:text-primary-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-100 hover:text-primary-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-secondary-100 hover:text-primary-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-primary-500">
              Contact Us
            </h4>
            <ul className="space-y-2 text-secondary-100">
              <li>123 Luxury Street</li>
              <li>New York, NY 10001</li>
              <li>info@zukus.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4 text-primary-500">
              Newsletter
            </h4>
            <p className="text-secondary-100 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-secondary-800 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-secondary-900 rounded-md hover:bg-primary-400 transition-colors font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-12 pt-8 text-center text-secondary-100">
          <p>&copy; {new Date().getFullYear()} Zukus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
