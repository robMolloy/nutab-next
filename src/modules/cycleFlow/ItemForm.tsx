import { Button, Input } from "@/components";
import { useState } from "react";

export const ItemForm = (p: {
  onFormSuccess: () => void;
  onFormFail: () => void;
}) => {
  const [itemName, setItemName] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          itemName.length < 5 ? p.onFormFail() : p.onFormSuccess();
        }}
      >
        <Input
          type="text"
          label="Item Name"
          onInput={(x) => setItemName(x)}
          value={itemName}
        />
        {itemName}
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};
