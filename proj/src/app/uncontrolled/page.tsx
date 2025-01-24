import './uncontrolled_page.css';

export default function Unontrolled() {
  return (
    <div className="form_page">
      <div className="form">
        <div>Uncontrolled form</div>
        <form>
          <label>
            Name
            <input type="text" />
          </label>
          <label>
            Age
            <input type="text" />
          </label>
          <label>
            Email
            <input type="email" />
          </label>
          <label>
            Password
            <input type="password" />
          </label>
          <label>
            Confirm password
            <input type="password" />
          </label>
          <label>
            Gender
            <select name="gender">
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </label>
          <label className="TC">
            T&C
            <input type="checkbox" />
          </label>
          <label>
            Select image
            <input type="file" />
          </label>
          <label>
            Country
            <input type="text" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
