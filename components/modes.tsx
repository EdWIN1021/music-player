import { Badge } from "@/components/ui/badge";

const Modes = () => {
  return (
    <div className="px-3 flex gap-3 mb-4">
      <Badge className="text-white text-md" variant="outline">
        Normal
      </Badge>
      <Badge className="text-white text-md" variant="outline">
        Pure
      </Badge>
      <Badge
        className="text-white text-md bg-[#00C2CB] border-none"
        variant="outline"
      >
        Boost
      </Badge>
    </div>
  );
};

export default Modes;
