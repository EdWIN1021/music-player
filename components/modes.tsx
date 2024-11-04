import { Badge } from "@/components/ui/badge";

const Modes = () => {
  return (
    <div className="px-5 flex gap-3">
      <Badge className="text-white text-md" variant="outline">
        Normal
      </Badge>
      <Badge className="text-white text-md" variant="outline">
        Pure
      </Badge>
      <Badge className="text-white text-md" variant="outline">
        Boost
      </Badge>
    </div>
  );
};

export default Modes;
