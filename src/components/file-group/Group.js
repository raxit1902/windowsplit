import React, { useState } from "react";
import "./group.css";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { codeBlockHtml } from "../../utils";
import closeBtn from "../../assets/close_tab.svg";
import newTabBtn from "../../assets/new_tab.svg";
import splitHor from "../../assets/split_horizontal.svg";
import splitVer from "../../assets/split_vertical.svg";

const Tab = ({ title, isActive, onClick, onClose }) => {
  return (
    <>
      <span className={`tab filename ${isActive ? "active_tab" : ""}`}>
        <span onClick={onClick}>{title}</span>
        <img
          className="px-2 file_close"
          src={closeBtn}
          alt="close"
          onClick={() => {
            onClose();
          }}
        />
      </span>
    </>
  );
};

const Group = ({ addTabGroup, tabId, activeGroup, groupIndex }) => {
  const [tabs, setTabs] = useState([
    {
      id: tabId,
      title: `Tab ${tabId}`,
      isActive: true,
      content: codeBlockHtml,
    },
  ]);
  const [activeTab, setActiveTab] = useState(tabId);

  const addTab = () => {
    const newTabId = tabs[tabs.length - 1].id + 1;
    const newTabs = tabs.map((tab) => ({ ...tab, isActive: false }));
    setTabs([
      ...newTabs,
      {
        id: newTabId,
        title: `Tab ${newTabId}`,
        isActive: true,
        content: codeBlockHtml,
      },
    ]);
    setActiveTab(newTabId);
  };

  const closeTab = (tabId) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    if (activeTab === tabId && updatedTabs.length > 0) {
      setActiveTab(updatedTabs[updatedTabs.length - 1].id);
    }
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.id === tabId ? true : false,
    }));
    setTabs(updatedTabs);
  };

  // console.log(activeTab);

  return (
    <>
      <div className="file_group">
        {/* Nav  */}
        <div className="group_nav">
          <div>
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                title={tab.title}
                isActive={tab.id === activeTab}
                onClick={() => switchTab(tab.id)}
                onClose={() => closeTab(tab.id)}
              />
            ))}
            <img
              className="px-2"
              src={newTabBtn}
              alt="new"
              style={{ cursor: "pointer" }}
              onClick={() => {
                addTab();
              }}
            />
          </div>
          {/* {activeGroup === groupIndex+1 &&  */}
          <div className="split_tabs">
            <img
              src={splitHor}
              alt="splt_hor"
              onClick={() => {
                addTabGroup(activeTab, "horizontal", groupIndex);
              }}
            />
            {"    "}
            <img
              src={splitVer}
              alt="splt_ver"
              onClick={() => {
                addTabGroup(activeTab, "vertical", groupIndex);
              }}
            />
          </div>
          {/* } */}
        </div>

        {/* Tab Content  */}
        {tabs.map((tab, i) => {
          return (
            <>
              {tab.isActive && (
                <div className="file_content" key={i}>
                  <CodeBlock
                    language="jsx"
                    text={tab.content}
                    showLineNumbers
                    theme={atomOneDark}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Group;
