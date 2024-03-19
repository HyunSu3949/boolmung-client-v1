type Props = {
  errorMessage: string;
};

export default function ErrorMessage({ errorMessage }: Props) {
  return (
    errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
  );
}
