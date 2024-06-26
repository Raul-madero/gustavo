import Image from "next/image";
import logo from "@/assets/img/logo.svg"

const Footer = () => {
    return (
        <footer className="bg-blue-500 dark:bg-slate-900">
        <div className="flex items-center justify-center p-8">
            <Image src={logo} alt="Logo" width={500} height={400} />
        </div>
        </footer>
    );
}

export default Footer;