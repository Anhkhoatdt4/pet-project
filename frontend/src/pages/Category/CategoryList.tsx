import React from "react";
import { Datagrid, DeleteButton, List, TextField } from "react-admin";

const CategoryList = () => {
  return (
    <List>
      <Datagrid>
        <TextField
          source="id"
          label="ID"
          aria-disabled
          sortable={false}
          aria-readonly
        />
        <TextField source="name" />
        <TextField source="code" />
        <TextField source="description" />
      </Datagrid>
    </List>
  );
};

export default CategoryList;
