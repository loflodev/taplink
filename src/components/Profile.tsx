import { Github, Linkedin, Instagram, Facebook } from "lucide-react";
import XIcon from "../assets/svg/XIcon";

interface ProfileProps {
  title: string;
  description: string;
}

const Profile: React.FC<ProfileProps> = ({ title, description }) => {
  return (
    <section className="pt-12 px-6 text-center">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <img
          src="/Louis.jpg"
          alt="Louis Junior Florival"
          className="rounded-full w-full h-full object-cover border-4 border-blue-500"
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-300 mb-6">{description}</p>

      <div className="flex justify-center gap-4 mb-12">
        <a
          href="#"
          className="hover:text-blue-400 transition-colors"
          aria-label="Twitter"
        >
          <XIcon />
        </a>
        <a
          href="#"
          className="hover:text-blue-400 transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="hover:text-blue-400 transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="hover:text-blue-400 transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Profile;
