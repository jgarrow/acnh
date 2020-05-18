/** @jsx jsx */
import { jsx, Box, Input, Label, Select } from "theme-ui"

import { default as MultiSelect } from "react-select"
import makeAnimated from "react-select/animated"

import { materialsOptions, customizableOptions } from "../data/items.js"

const ItemsSearchForm = ({
  sort,
  setSort,
  selectedMaterials,
  setSelectedMaterials,
  selectedCustomize,
  setSelectedCustomize,
  searchInput,
  handleSearchChange,
}) => {
  const animatedComponents = makeAnimated() // for MultiSelect animation

  return (
    <Box
      as="form"
      sx={{
        display: `grid`,
        // gridTemplateColumns: `repeat(4, 1fr)`,
        gridTemplateRows: `repeat(4, 75px)`,
        gridTemplateColumns: `1fr`,
        gridGap: `15px`,
      }}
    >
      <div>
        <Label htmlFor="sort">Sort</Label>
        <Select
          id="sort"
          name="sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="customizeFilter">Customizable:</Label>
        <Select
          id="customizeFilter"
          value={selectedCustomize}
          onChange={e => setSelectedCustomize(e.target.value)}
        >
          <option value="N/A">N/A</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="materialsFilter">Materials:</Label>
        <MultiSelect
          id="materialsFilter"
          options={materialsOptions}
          isMulti={true}
          components={animatedComponents}
          value={selectedMaterials}
          onChange={newValue => setSelectedMaterials(newValue)}
        />
      </div>

      <div>
        <Label htmlFor="searchInput">Search:</Label>
        <Input
          id="searchInput"
          name="searchInput"
          type="text"
          placeholder="Name"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
    </Box>
  )
}

export default ItemsSearchForm
