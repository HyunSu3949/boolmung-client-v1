import SocialSpriteSVG from "src/assets/img/sprite-sheet.svg";

type Props = {
  id: string;
  size: string;
  className?: string;
  title?: string;
};

export function Svgs({ id, size, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      stroke="#ffffff"
      fill="none"
    >
      <title>{title}</title>
      <use href={`/${SocialSpriteSVG}#${id}`} />
    </svg>
  );
}
