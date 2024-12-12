interface FooterProps {
  text: string;
  author: string;
}

const Footer: React.FC<FooterProps> = ({ text, author }) => {
  return (
    <footer className="text-center mt-2 text-xs text-gray-400">
      <p>
        {text}{" "}
        <span>
          <a href="#" className="underline">{author}</a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
