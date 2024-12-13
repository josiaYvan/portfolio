/**
 * @name Busnay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan. All rights reserved.
 * @version v0.0.1
 *
 */
import React, { useRef, useState } from 'react';
import { Button, Tabs } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import MemberDetails from '../member/MemberDetails';
import CreateMember from '../member/CreateMember';
import MemberList from '../member/MemberList';
import UploadMemberFromExcel from '../member/UploadMemberFromExcel';

function Member() {
  // function to create new tab pane for user details
  const add = (id) => {
    const newActiveKey = `NewTab1${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        key: newActiveKey,
        label: 'Details',
        children: <MemberDetails id={id} />
      }
    ]);
    setActiveKey(newActiveKey);
  };

  const add2 = () => {
    const newActiveKey = `NewTab2${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        key: newActiveKey,
        label: 'Ajouter un membre',
        children: <CreateMember />
      }
    ]);
    setActiveKey(newActiveKey);
  };

  const add3 = () => {
    const newActiveKey = `NewTab2${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        key: newActiveKey,
        label: 'Ajout par excel',
        children: <UploadMemberFromExcel />
      }
    ]);
    setActiveKey(newActiveKey);
  };

  // default tab pane and component
  const defaultPanes = new Array(1).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: 'Les membres',
    children: <MemberList add={add} />,
    closable: false
  }));

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  // function to removed a tab pane
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  // function to edit tab components
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div className='p-6 xl:p-10'>
      <div className='text-left mb-20'>
        <h1 className='text-3xl md:text-4xl font-bold'>Les membres du transport</h1>
      </div>
      <Tabs
        onChange={(key) => setActiveKey(key)}
        tabBarExtraContent={(
          <>
            <Button
              className='inline-flex items-center'
              icon={<UsergroupAddOutlined />}
              onClick={add3}
              type='dashed'
              size='large'
            >
              Ajout par excel
            </Button>
            <Button
              className='inline-flex items-center'
              icon={<UserAddOutlined />}
              onClick={add2}
              type='primary'
              size='large'
            >
              Ajouter un membre
            </Button>
          </>
      )}
        activeKey={activeKey}
        type='editable-card'
        onEdit={onEdit}
        items={items}
        size='large'
        hideAdd
      />
    </div>
  );
}

export default React.memo(Member);
