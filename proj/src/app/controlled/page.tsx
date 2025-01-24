import './controlled_page.css';

export default function Controlled() {
  return (
    <div className="form_page">
      <div className="form">
        <div>Controlled form</div>
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
          <label>
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
