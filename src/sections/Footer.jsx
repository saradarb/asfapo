import { mySocials } from "../constants";

const Footer = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a href={social.href} key={index} target="_blank" rel="noopener noreferrer">
            <img
              src={`${base}${social.icon.replace(/^\//, "")}`}
              className="w-5 h-5"
              alt={social.name}
            />
          </a>
        ))}
      </div>

      <p>© 2025 Ali. All rights reserved.</p>
    </section>
  );
};

export default Footer;
