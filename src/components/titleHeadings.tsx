interface TitleHeadingsProps {
  title: string;
  description: string;
}
export const TitleHeadings = ({ title, description }: TitleHeadingsProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};
