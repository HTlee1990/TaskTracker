import PropTypes from "prop-types";
import {useLocation} from 'react-router-dom';
import Button from "./Button";

const Header = ({ title, onAdd, showAddTask }) => {
  const location = useLocation()
  console.log(location)
  return (
    <header className="header">
      <h1>Task {title}</h1>
      {location.pathname === '/' && <Button
        onClick={onAdd}
        color={showAddTask ? "#003300" : "steelblue"}
        text={showAddTask ? "Close" : "Add"}
      />}
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//     color: "red",
//     backgroundColor: "black"
// }

export default Header;
