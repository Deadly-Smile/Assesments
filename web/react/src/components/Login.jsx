import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useForm from "../hooks/useForm";
import { useLoginMutation } from "../store";

const Login = () => {
  const [credential, handleChange] = useForm({
    username: "",
    password: "",
  });
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ credential });
  };

  useEffect(() => {
    if (result.isSuccess && result.data) {
      // resetForm();
      return navigate("/home");
    }
  }, [result.data, result.isSuccess]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">{"Welcome!!"}</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="username"
                name="username"
                placeholder="username"
                value={credential.username}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={credential.password}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <label className="label">
                <span className="label-text-alt">
                  {"Don't have an account? "}
                  <Link to="/signup" className="link link-hover text-lg">
                    {"Sign up"}
                  </Link>
                  {" now!"}
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
