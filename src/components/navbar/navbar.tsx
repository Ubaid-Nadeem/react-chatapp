"use client";

import {
  IconBrandApple,
  IconCommandRegular,
  IconDashboard,
  IconHeadphones,
  IconLogout,
  IconSearch,
  IconSettings,
  IconShield,
  IconShoppingBag,
} from "justd-icons";
import { Avatar, Button, Menu, Separator } from "ui";
import { Navbar } from "../ui/navbar";

export default function AppNavbar() {
  return (
    <Navbar className="fixed top-0 z-40">
      <Navbar.Nav className="py-3 bg-[#1e272e] ">
        <Navbar.Logo
          aria-label="Goto documenation of Navbar"
          href="/docs/2.x/components/layouts/navbar"
          className="font-bold text-white"
        >
          Logo
        </Navbar.Logo>

        <Navbar.Section className="ml-auto hidden sm:flex">
          <UserMenu />
        </Navbar.Section>
      </Navbar.Nav>

      <Navbar.Compact className=" bg-[#1e272e] ">
        <Navbar.Flex>
          <Navbar.Logo
            className="font-bold text-white"
            aria-label="Goto documenation of Navbar"
            href="/docs/2.x/components/layouts/navbar"
          >
            Logo
          </Navbar.Logo>
        </Navbar.Flex>
        <Navbar.Flex>
          <UserMenu />
        </Navbar.Flex>
      </Navbar.Compact>
    </Navbar>
  );
}

function UserMenu() {
  return (
    <Menu>
      <Menu.Trigger aria-label="Open Menu">
        <Avatar
          alt="cobain"
          size="small"
          shape="square"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk740kSKRQ6-Zqea74Ftb6XQyGHQLbTt0MNQ&s"
        />
      </Menu.Trigger>
      <Menu.Content placement="bottom right" className="h-[40vh] sm:h-auto sm:min-w-56 ">
        <Menu.Section>
          <Menu.Header separator>
            <span className="block">Kurt Cobain</span>
            <span className="font-normal text-muted-fg">@cobain</span>
          </Menu.Header>
        </Menu.Section>

        <Menu.Item >
          <IconSettings />
          Settings
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item className={"hover:bg-[red]"}>
          <IconLogout />
          Log out
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}
