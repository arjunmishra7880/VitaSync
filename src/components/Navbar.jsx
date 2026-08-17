import { Link, NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav
      style={{
        background: "#001E2B",
        borderBottom: "1px solid #19313C",
        padding: "15px 40px",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #00ED64, #00684A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#001E2B",
              fontWeight: "800",
              fontSize: "18px",
              marginRight: "12px",
            }}
          >
            V
          </div>

          <div>
            <h4
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontWeight: "700",
              }}
            >
              VitaSync
            </h4>

            <small
              style={{
                color: "#8FB7A8",
              }}
            >
              Sync Your Health
            </small>
          </div>
        </Link>

        {/* Menu */}
        <div className="d-flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item-custom active" : "nav-item-custom"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-item-custom active" : "nav-item-custom"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/food"
            className={({ isActive }) =>
              isActive ? "nav-item-custom active" : "nav-item-custom"
            }
          >
            Food
          </NavLink>

          <NavLink
            to="/exercise"
            className={({ isActive }) =>
              isActive ? "nav-item-custom active" : "nav-item-custom"
            }
          >
            Exercise
          </NavLink>

          <NavLink
            to="/bmi"
            className={({ isActive }) =>
              isActive ? "nav-item-custom active" : "nav-item-custom"
            }
          >
            BMI
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-item-custom active" : "nav-item-custom"
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
