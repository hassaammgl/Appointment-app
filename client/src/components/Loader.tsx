import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <Spinner variant="ellipsis" />
    </div>
  );
};

export default Loader;
