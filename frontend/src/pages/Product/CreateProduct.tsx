import React from 'react'

import { ArrayInput, BooleanInput, Create, ImageField, ImageInput, NumberInput, ReferenceInput, required, SelectField, SelectInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'
import CategoryTypeInput from '../Category/CategoryTypeInput'
import { colorSelector } from '~/components/Filter/ColorsFilter'
import { sizeSelector } from '~/components/Filter/SizeFilter'
const CreateProduct = () => {
    
  return (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}></TextInput>
            <TextInput source="slug" validate={[required()]}></TextInput>
            <TextInput source="description"></TextInput>
            <NumberInput source="price" validate={[required()]}></NumberInput>
            <TextInput source="brand" validate={[required()]}></TextInput>


            <ReferenceInput source="categoryId" reference="category"/>
            <CategoryTypeInput></CategoryTypeInput>

            <ImageInput source='thumbnail' label={'Thumbnail'} >
            <ImageField source="src" title="title" />
            </ImageInput>

             <ArrayInput source='variants' label='Edit Variants'>
              <SimpleFormIterator inline>
                <SelectInput source='color' choices={Object.keys(colorSelector)} resettable/>
                <SelectInput source='size' choices={sizeSelector}/>
                <NumberInput source='stockQuantity'/>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source='productResources'>
                <SimpleFormIterator inline>
                    <TextInput source='name' validate={required()}></TextInput>
                        <ImageInput source='url' label={'Product Image'}>
                        <ImageField source="src" title="title" />
                        </ImageInput>
                    <SelectInput source='type' choices={["image", "file"]}></SelectInput>
                    <BooleanInput source='isPrimary'></BooleanInput>
                </SimpleFormIterator>
            </ArrayInput>

             <NumberInput source='rating'/>
            <BooleanInput source='newArrival'/>
        </SimpleForm>
    </Create>
  )
}

export default CreateProduct
