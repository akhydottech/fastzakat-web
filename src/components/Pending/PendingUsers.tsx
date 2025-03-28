import { Table } from "@chakra-ui/react";
import { SkeletonText } from "../ui/skeleton";
import { useTranslation } from "react-i18next";

const PendingUsers = () => {
  const { t } = useTranslation();
  return (
    <Table.Root size={{ base: "sm", md: "md" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="sm">{t("FULL_NAME")}</Table.ColumnHeader>
          <Table.ColumnHeader w="sm">{t("EMAIL")}</Table.ColumnHeader>
          <Table.ColumnHeader w="sm">{t("ROLE")}</Table.ColumnHeader>
          <Table.ColumnHeader w="sm">{t("STATUS")}</Table.ColumnHeader>
          <Table.ColumnHeader w="sm">{t("ACTIONS")}</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(5)].map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <SkeletonText noOfLines={1} />
            </Table.Cell>
            <Table.Cell>
              <SkeletonText noOfLines={1} />
            </Table.Cell>
            <Table.Cell>
              <SkeletonText noOfLines={1} />
            </Table.Cell>
            <Table.Cell>
              <SkeletonText noOfLines={1} />
            </Table.Cell>
            <Table.Cell>
              <SkeletonText noOfLines={1} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PendingUsers;
