import { IconButton } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu";

import type { DropOffPointPublic, UserPublic } from "@/client";
import DeleteDropOffPoint from "../drop-off-points/DeleteDropOffPoint";
import EditDropOffPoint from "../drop-off-points/EditDropOffPoint";
import { useQueryClient } from "@tanstack/react-query";
import ToggleStatusDropOffPoint from "../drop-off-points/ToggleStatusDropOffPoint";
interface ItemActionsMenuProps {
  item: DropOffPointPublic;
}

export const ItemActionsMenu = ({ item }: ItemActionsMenuProps) => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        {currentUser?.id === item.owner_id && (
          <>
            <EditDropOffPoint item={item} />
            <DeleteDropOffPoint id={item.id} />
          </>
        )}
        <ToggleStatusDropOffPoint item={item} />
      </MenuContent>
    </MenuRoot>
  );
};
