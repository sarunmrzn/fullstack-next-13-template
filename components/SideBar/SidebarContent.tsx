"use client";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { LinkItems } from "./sidebar-constants";
import { NavItem } from "./NavItemProps";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10 rounded-full"
          width={20}
          height={20}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <NavItem icon={FiLogOut} onClick={() => signOut()}>
        Logout
      </NavItem>
    </Box>
  );
};
