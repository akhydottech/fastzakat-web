import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

import type { DropOffPointPublic } from "@/client"
import DeleteDropOffPoint from "../drop-off-points/DeleteDropOffPoint"
import EditDropOffPoint from "../drop-off-points/EditDropOffPoint"

interface ItemActionsMenuProps {
  item: DropOffPointPublic
}

export const ItemActionsMenu = ({ item }: ItemActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditDropOffPoint item={item} />
        <DeleteDropOffPoint id={item.id} />
      </MenuContent>
    </MenuRoot>
  )
}
