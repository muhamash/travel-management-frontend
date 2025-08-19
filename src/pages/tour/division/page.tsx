import { AddDivisionModal } from "./addDivisionForm";

export default function AddDivision() {
  return (
    <div className="text-muted-foreground py-20">
      <div className="flex justify-between items-center">
        <p className="uppercase text-2xl">Add division {"-->"} </p>
        <AddDivisionModal />
      </div>
    </div>
  );
}
