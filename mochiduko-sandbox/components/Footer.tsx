import Link from "next/link";

const SiteFooter: React.FC = () => {
  const title = `© ${new Date().getFullYear()} Tagosaku Mochiduki`
  return (
    <footer>
        <div className="max-w-screen-2xl px-2 md:px-4 mx-auto">
            <Link href="/" className="footer-link" aria-label="logo">
            {title}
            </Link>
        </div >
    </footer>
  )
};

export default SiteFooter;