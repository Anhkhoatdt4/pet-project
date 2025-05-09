import React from 'react'
import { ArrayInput, BooleanInput, Edit, ImageField, ImageInput, NumberInput, required, SelectInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'
import { colorSelector } from '~/components/Filter/ColorsFilter'
import { sizeSelector } from '~/components/Filter/SizeFilter'

const EditProduct = () => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput source='id' disabled/>
            <TextInput source='name' label='Name' fullWidth/>
            <TextInput source='description' label='Description' fullWidth multiline rows={4}/>
            <TextInput source='brand' label='Brand' fullWidth/>
             <ImageField source="thumbnail" title="title" />
            <ImageInput source='thumbnail' label='Thumbnail'>
                <ImageField source='src' title='title' />
            </ImageInput>
            <TextInput source='price' label='Price' fullWidth/>
            <TextInput source='rating' label='Rating' fullWidth/>
              <ArrayInput source='variants' label={'Edit Variants'}>
              <SimpleFormIterator inline>
                <SelectInput source='color' choices={Object.keys(colorSelector)} resettable/>
                <SelectInput source='size' choices={sizeSelector}/>
                <NumberInput source='stockQuantity'/>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source='productResources'>
              <SimpleFormIterator inline>
              <TextInput source='name' validate={[required()]}/>
              <ImageField source='url' src='url'/>
              <ImageInput source='url' label={'Product Image'}>
              <ImageField source="src" title="title" />
              </ImageInput>
              <SelectInput source='type' choices={["image"]}/>
              <BooleanInput source='isPrimary'/>
              </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>    
    </Edit>
  )
}

export default EditProduct
