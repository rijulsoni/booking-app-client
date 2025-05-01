
import { Link } from "react-router-dom";

interface NavLink {
  label: string;
  href: string;
}

const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Browse Hotels", href: "/hotels" },
  { label: "Special Offers", href: "/deals" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export { mainNavLinks };

export const NavLinks: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      {mainNavLinks.map((link, index) => (
        <Link 
          key={index}
          to={link.href} 
          className="text-gray-700 hover:text-hotel-blue transition-colors px-4 py-2"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
