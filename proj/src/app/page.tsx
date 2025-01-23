import Link from 'next/link';
import './main_page.css';

export default function Home() {
  return (
    <div className="main_page_buttons_box">
      <div className="main_page_link_button">
        <Link className="button" href="/controlled">
          Controlled form
        </Link>
      </div>
      <div className="main_page_link_button">
        <Link className="button" href="/uncontrolled">
          Uncontrolled form
        </Link>
      </div>
    </div>
  );
}
