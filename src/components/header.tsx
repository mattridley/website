const links = [
  {
    label: "Reports Master",
    href: "https://reportsmaster.ridley.dev",
  },
  {
    label: "GitHub",
    href: "https://github.com/mattridley",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mattcrdley",
  },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <a className="text-base font-bold text-gray-900" href="/">
          Matt Ridley
        </a>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-gray-600">
          {links.map((link) => (
            <a
              className="hover:text-gray-900"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
