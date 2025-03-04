import { Loader } from "../ui";

export default function Loaders() {
  return (
    <div className="z-10 flex w-full h-screen justify-center items-center bg-opacity-5	 backdrop-blur-sm absolute top-0 left-0">
      <Loader size="medium"  variant="spin"/>
    </div>
  );
}
