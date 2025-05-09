import React from "react";
import {
  ArrayInput,
  Datagrid,
  DeleteButton,
  Edit,
  List,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from "react-admin";

const CategoryEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name"></TextInput>
        <TextInput source="code"></TextInput>
        <TextInput source="description"></TextInput>
        <ArrayInput source="categoryTypes">
          <SimpleFormIterator inline>
            <TextInput source="name"></TextInput>
            <TextInput source="code"></TextInput>
            <TextInput source="description"></TextInput>
            <DeleteButton resource="category" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;
