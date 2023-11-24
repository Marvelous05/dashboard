'use client'
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import companyLogo from "../../../public/logo.png"
import Image from "next/image"
import { MenuOutlined } from '@ant-design/icons';

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        {/* <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left"></Radio>
        </Radio.Group> */}
        <Button className="bg-blue-500 text-white" type="primary" onClick={showDrawer}>
        <MenuOutlined />
        </Button>
      </Space>
      <Drawer
        // title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}>
              <div className="w-full h-full bg-blue-500 mt-0">
          {" "}
          {/* Side Navbar */}
          {/* Content for the side navbar */}
          <Image
            className="mx-auto h-10 w-auto ml-1"
            src={companyLogo}
            height={500}
            width={500}
            alt="Your Company"
          />
          <br />
          <p className="flex flex-row text-white">
            Welcome Back USER!
            <br /> Standard account
          </p>
          <br />
          <hr />
          <br />
          <ul>
            <a href="http://localhost:3000/issues">
              <li className="text-white hover:text-blue-400">HOME</li>
            </a>
            <a href="http://localhost:3000/issues">
              <li className="text-white hover:text-blue-400">ISSUES</li>
            </a>
            <a href="http://localhost:3000/users">
              <li className="text-white hover:text-blue-400">USERS</li>
            </a>
            <a href=" http://localhost:3000/fieldTasks">
              <li className="text-white hover:text-blue-400">
                TASKS
              </li>
            </a>
            <a href="http://localhost:3000/stocklist">
              <li className="text-white hover:text-blue-400">
                STOCK
              </li>
            </a>
            {/* <a href="http://localhost:3000/ContactPage">
              <li className="text-white hover:text-blue-400">CONTACT US</li>
            </a> */}
          </ul>
          <ul>
            <li className="text-white hover:text-blue-400">SETTINGS</li>
            <a href="http://localhost:3000/Home">
              <li className="text-white hover:text-blue-400">LOG OUT</li>
            </a>
          </ul>
        </div>

        </Drawer>
      
     
    </>
  );
};
export default SideNav;