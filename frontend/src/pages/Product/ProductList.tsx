import React from 'react'
import { Datagrid, EditButton, ImageField, List, TextField } from 'react-admin'

const ProductList = () => {
  return (
    <List>
        <Datagrid>
            <TextField source='id' />
            <ImageField source='thumbnail' label='Image' />
            <TextField source='name' label='Name' />
            <TextField source="description" label="Description" />
            <TextField source='brand' label='Brand' />
            <TextField source="price" label="Price" />
            <TextField source="rating" label="Rating" />     
        </Datagrid>
    </List>
  )
}

export default ProductList
