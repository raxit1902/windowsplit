import React, { useEffect, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';
import 'primeicons/primeicons.css';

function App() {
  const [tabGroups, setTabGroups] = useState([
    {
      id: 1,
      tabs: [{ id: 1, title: 'Tab 1', content: 'Content for Tab 1' }],
      children: [], // Array to store child tab groups
    },
  ]);
  const [activeTabIndexes, setActiveTabIndexes] = useState({});
  const [panelOrientation, setPanelOrientation] = useState(null);

  useEffect(() => {
    const activeTabIndexesCopy = {};
    tabGroups.forEach(group => {
      activeTabIndexesCopy[group.id] = 0;
    });
    setActiveTabIndexes(activeTabIndexesCopy);
  }, [tabGroups]);

  const onSplit = (tabGroupIndex, orientation, parentGroupIndex = null) => {
    const updatedTabGroups = [...tabGroups];
    const currentTabGroup = updatedTabGroups[tabGroupIndex];

    const newTabId = currentTabGroup.tabs.length + 1;
    const newTab = { id: newTabId, title: `Tab ${newTabId}`, content: `Content for Tab ${newTabId}` };

    const newGroup = { id: updatedTabGroups.length + 1, tabs: [newTab], children: [], orientation: 'vertical' };

    if (parentGroupIndex !== null) {
      const parentGroup = updatedTabGroups[parentGroupIndex];
      if (orientation === 'vertical') {
        parentGroup.children.push(newGroup);
      } else {
        parentGroup.children.push(newGroup);
      }
    } else {
      if (orientation === 'horizontal') {
        updatedTabGroups.splice(tabGroupIndex + 1, 0, newGroup);
      } else {
        updatedTabGroups.push(newGroup);
      }
    }

    setPanelOrientation(orientation);
    setTabGroups(updatedTabGroups);
  };

  const onAddTab = (tabGroupIndex) => {
    const updatedTabGroups = [...tabGroups];
    const currentTabGroup = updatedTabGroups.find(group => group.id === tabGroupIndex);
    const newTabId = currentTabGroup.tabs.length + 1;
    const newTab = { id: newTabId, title: `Tab ${newTabId}`, content: `Content for Tab ${newTabId}` };
    currentTabGroup.tabs.push(newTab);
    setTabGroups(updatedTabGroups);
  };

  const handleTabChange = (e, groupId) => {
    const updatedIndexes = { ...activeTabIndexes };
    updatedIndexes[groupId] = e.index;
    setActiveTabIndexes(updatedIndexes);
  };

  return (
    <div>
      <Splitter style={{ height: '100vh' }}>
        {tabGroups?.map((tabGroup, index) => (
          <SplitterPanel key={index} className="panelContainer">
            <div style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
              <i onClick={() => onAddTab(tabGroup.id)} className="pi pi-plus" style={{ color: 'green' }}></i>

              <div>
                <i onClick={() => onSplit(index, 'vertical')} className="pi pi-angle-double-right" style={{ color: '#708090' }}></i>
                <i onClick={() => onSplit(index, 'horizontal')} className="pi pi-angle-double-down" style={{ color: '#708090' }}></i>
              </div>
            </div>
            <div>
              <TabMenu
                model={tabGroup.tabs.map(tab => ({ label: tab.title }))}
                activeIndex={activeTabIndexes[tabGroup.id]}
                onTabChange={(e) => handleTabChange(e, tabGroup.id)}
              />
              <Card title={tabGroup.tabs[activeTabIndexes[tabGroup.id]] ? tabGroup.tabs[activeTabIndexes[tabGroup.id]].title : ''}>
                <p className="m-0">
                  {/* Dummy content */}
                  {tabGroup.tabs[activeTabIndexes[tabGroup.id]] ? tabGroup.tabs[activeTabIndexes[tabGroup.id]].content : ''}
                </p>
              </Card>
            </div>
            {tabGroup.children && tabGroup.children.map((childGroup, childIndex) => (
              <Splitter key={childIndex} layout={childGroup.orientation} style={{ height: '300px' }}>
                <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={10}>
                  {childGroup.tabs.map((tab, tabIndex) => (
                    <div key={tabIndex}>{tab.title}</div>
                  ))}
                </SplitterPanel>
                <SplitterPanel size={80}>
                  {childGroup.children && childGroup.children.map((grandchildGroup, grandchildIndex) => (
                    <Splitter key={grandchildIndex} layout={grandchildGroup.orientation} style={{ height: '300px' }}>
                      <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={10}>
                        {grandchildGroup.tabs.map((tab, tabIndex) => (
                          <div key={tabIndex}>{tab.title}</div>
                        ))}
                      </SplitterPanel>
                      <SplitterPanel size={80}>
                        {/* Render more nested panels here if needed */}
                      </SplitterPanel>
                    </Splitter>
                  ))}
                </SplitterPanel>
              </Splitter>
            ))}
          </SplitterPanel>
        ))}
      </Splitter>
    </div>
  );
}

export default App;
