import React from "react";

export interface Contact {
  id: string;
  name: string;
  handleSelect: (id: string) => void;
}

const Contact: React.FC<Contact> = ({ name, id, handleSelect }) => {
  return (
    <div
      onClick={() => handleSelect(id)}
      className="w-fit flex border rounded-md p-3"
    >
      <p className="text-lg font-medium">{name}</p>
    </div>
  );
};

export default Contact;
