import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  function handleMyForm(data) {
    setSubmittedData(data);
  }

  return (
    <div className="container">
      <h1>Alpaca Fan Club Registration</h1>
      <p className="subtitle">Sign up and let us know your alpaca preferences.</p>

      <form onSubmit={handleSubmit(handleMyForm)}>
        <fieldset>
          <legend>Personal Information</legend>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" }
              })}
              placeholder="First Name"
            />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" }
              })}
              placeholder="Last Name"
            />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" id="streetAddress" {...register("streetAddress")} placeholder="Street Address" />
          </div>

          <div className="form-group">
            <label htmlFor="state">State / Province</label>
            <select id="state" {...register("state")}>
              <option value="">Select a state</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="MN">Minnesota</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="WI">Wisconsin</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" {...register("country")} placeholder="Country" />
          </div>

          <div className="form-group">
            <p className="group-label">Favorite Alpaca Colors</p>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="White" {...register("alpacaColors")} />
                White
              </label>
              <label>
                <input type="checkbox" value="Brown" {...register("alpacaColors")} />
                Brown
              </label>
              <label>
                <input type="checkbox" value="Black" {...register("alpacaColors")} />
                Black
              </label>
              <label>
                <input type="checkbox" value="Fawn" {...register("alpacaColors")} />
                Fawn
              </label>
            </div>
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="output">
          <h2>Your Submission</h2>
          <p><strong>First Name:</strong> {submittedData.firstName}</p>
          <p><strong>Last Name:</strong> {submittedData.lastName}</p>
          <p><strong>Street Address:</strong> {submittedData.streetAddress}</p>
          <p><strong>State:</strong> {submittedData.state}</p>
          <p><strong>Country:</strong> {submittedData.country}</p>
          <p><strong>Favorite Colors:</strong> {submittedData.alpacaColors?.join(", ") || "None selected"}</p>
        </div>
      )}
    </div>
  );
}

export default App;