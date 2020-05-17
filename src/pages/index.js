/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

import cameraIcon from "../images/cameraIcon.png"
import milesNookIcon from "../images/milesNookIcon.png"
import earthIcon from "../images/earthIcon.png"
import critterpedia from "../images/critterpediaIcon.png"
import recipeIcon from "../images/diyRecipeIcon.png"
import customDesignIcon from "../images/customDesignIcon.png"
import mapIcon from "../images/mapIcon.png"
import passportIcon from "../images/passportIcon.png"
import villagerIcon from "../images/IconCatResidents^s_0.png"
import allItemsIcon from "../images/IconCatAll^s_0.png"

const AppIconStyles = {
  boxSizing: `border-box`,
  padding: `5px`,
  borderRadius: `35%`,
  height: `100%`,
  width: `100%`,
}

const AppIcon = ({ image, altDesc, iconStyles }) => {
  const appStyles = { ...AppIconStyles, ...iconStyles }
  return (
    <div sx={appStyles}>
      <img
        src={image}
        alt={altDesc}
        sx={{
          width: `100%`,
        }}
      />
    </div>
  )
}

export default () => (
  <div
    sx={{
      bg: `#E9E2D0`,
      width: `90%`,
      maxWidth: `330px`,
      height: `100%`,
      margin: `1rem auto`,
      display: `grid`,
      gridTemplateColumns: `repeat(3, minmax(70px, 100px))`,
      gridGap: `15px`,
      boxSizing: `border-box`,
      padding: `15px`,
      borderRadius: `40px`,
    }}
  >
    <AppIcon
      image={cameraIcon}
      altDesc="Camera icon"
      iconStyles={{
        background: `#C08FF8`,
      }}
    />
    <AppIcon
      image={milesNookIcon}
      altDesc="Nook Miles icon"
      iconStyles={{
        backgroundColor: `#8C9BEC`,
        // backgroundPositionY: `33px`,
        backgroundPosition: `-15px 28px`,
        backgroundImage: `url(${earthIcon})`,
        // backgroundSize: `contain`,
        backgroundSize: `140%`,
        backgroundRepeat: `no-repeat`,
      }}
    />

    <AppIcon
      image={critterpedia}
      altDesc="Critterpedia Icon"
      iconStyles={{
        background: `#FDCB5A`,
      }}
    />
    <Link to="/recipes">
      <AppIcon
        image={recipeIcon}
        altDesc="DIY Recipe icon"
        iconStyles={{
          background: `#E49366`,
        }}
      />
    </Link>
    <AppIcon
      image={customDesignIcon}
      altDesc="Custom design icon"
      iconStyles={{
        background: `#F8A8B3`,
      }}
    />
    <AppIcon
      image={mapIcon}
      altDesc="Island map icon"
      iconStyles={{
        background: `#81D7BC`,
      }}
    />

    <AppIcon
      image={villagerIcon}
      altDesc="Image of a cat villager to represent all villagers"
      iconStyles={{
        background: `#F98E62`,
      }}
    />
    <AppIcon
      image={passportIcon}
      altDesc="Passport icon"
      iconStyles={{
        background: `#89C68A`,
      }}
    />
    <Link to="/items">
      <AppIcon
        image={allItemsIcon}
        altDesc="Icon of square made up of smaller squares to represent all items"
        iconStyles={{
          background: `#D2D85A`,
        }}
      />
    </Link>
  </div>
)
