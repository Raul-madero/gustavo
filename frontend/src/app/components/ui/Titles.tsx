interface Props {
    title: string;
}

const Titles = ({ title }: Props) => {
  return (
    <h1 className="text-center text-3xl md:text-5xl font-bold text-blue-500">{title}</h1>
  );
}

export default Titles;