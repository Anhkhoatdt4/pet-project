import React, { useMemo } from 'react'
import { required, SelectInput, useGetList } from 'react-admin'
import { useWatch } from 'react-hook-form'

const CategoryTypeInput = () => {
    const categoryId = useWatch({name : 'categoryId'});
    const {data} = useGetList("category");
    const categoryTypes = useMemo(() => {
        return data?.find((category : any) => category.id === categoryId)?.categoryTypes || []
},[data, categoryId])
  return (
    <div>
      <SelectInput source="categoryTypeId" choices={categoryTypes} validate={[required()]} optionText='name' optionValue='id' fullWidth>
      </SelectInput>
    </div>
  )
}

export default CategoryTypeInput
