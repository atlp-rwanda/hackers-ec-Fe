import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div>
      <Link to="/">
        <span>Home</span>
      </Link>
      <Link to="/about">
        <span>About</span>
      </Link>
    </div>
  );
}
