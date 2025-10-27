import { RingLoader } from "react-spinners";

export default function Loader() {
  return (
    <div>
      <RingLoader
        color="#38CD3E"
        size={60}
        className="mx-auto my-28 align-middle"
      />
    </div>
  );
}
