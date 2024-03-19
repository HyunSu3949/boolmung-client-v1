type Props = {
  errorMessage: string;
};

export default function ErrorMessage({ errorMessage }: Props) {
  return (
    errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>
  );
}
