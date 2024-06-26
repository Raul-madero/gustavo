interface Props {
    title: string;
}

const Titles = ({ title }: Props) => {
  return (
    <h1 className="w-1/2 text-center text-3xl md:text-5xl font-bold text-blue-500">{title}</h1>
  );
}

export default Titles;