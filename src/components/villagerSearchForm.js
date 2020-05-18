/** @jsx jsx */
import { jsx, Box, Input, Label, Select } from "theme-ui"

import { default as MultiSelect } from "react-select"
import makeAnimated from "react-select/animated"

import { speciesOptions, personalityOptions } from "../data/villagers.js"

const VillagerSearchForm = ({
  sort,
  setSort,
  selectedSpecies,
  setSelectedSpecies,
  selectedPersonalities,
  setSelectedPersonalities,
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
        <Label htmlFor="speciesFilter">Species:</Label>
        <MultiSelect
          id="speciesFilter"
          options={speciesOptions}
          isMulti={true}
          components={animatedComponents}
          value={selectedSpecies}
          onChange={newValue => setSelectedSpecies(newValue)}
        />
      </div>

      <div>
        <Label htmlFor="personalityFilter">Personality:</Label>
        <MultiSelect
          id="personalityFilter"
          options={personalityOptions}
          isMulti={true}
          components={animatedComponents}
          value={selectedPersonalities}
          onChange={newValue => setSelectedPersonalities(newValue)}
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

export default VillagerSearchForm
