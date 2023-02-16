import React from 'react'
import { PrintFamilyTreeBtn } from '../Buttons/PrintFamilyTreeBtn'
import { AddFamilyBtn } from '../Buttons/AddFamilyBtn'
import { ExportFamilyBtn } from '../Buttons/ExportFamilyBtn'
import { ImportFamilyBtn } from '../Buttons/ImportFamilyBtn';
export const ButtonPanel = () => {

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: "auto auto",
        width: '100%',
        height: "90px",
        gap: '5px',
        justifyContent: 'space-around',
        padding: '5px'
      }}
    >
      <AddFamilyBtn />
      <PrintFamilyTreeBtn />
      <ImportFamilyBtn />
      <ExportFamilyBtn />
    </div>
  )
}