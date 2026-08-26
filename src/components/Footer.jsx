export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>&copy; {new Date().getFullYear()} Fernway. A frontend engineering demo, not a real marketplace.</span>
      </div>
    </footer>
  );
}
