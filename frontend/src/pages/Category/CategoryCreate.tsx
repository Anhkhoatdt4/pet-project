import React from 'react'
import { ArrayInput, Create, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'

const CategoryCreate = () => {
  return (
    <Create>
      <SimpleForm>
          <TextInput source="name" label="Name" fullWidth></TextInput>
          <TextInput source="code" label="Code" fullWidth></TextInput>
          <TextInput source="description" label="Description" fullWidth></TextInput>
          <ArrayInput source="categoryTypes" label="Category Types">
            <SimpleFormIterator inline>
              <TextInput source="name" label="Name" fullWidth></TextInput>
              <TextInput source="code" label="Code" fullWidth></TextInput>
              <TextInput source="description" label="Description" fullWidth></TextInput>
            </SimpleFormIterator>
          </ArrayInput>
      </SimpleForm>
      </Create>
  )
}

export default CategoryCreate
