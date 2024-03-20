import { useState } from "react";
import Split from "react-split";
import "./playground.css";
import Group from '../file-group/Group'

function Playground() {
  const [panes, setPanes] = useState([
    {
      id: Date.now(),
      content: "Pane 1",
      size: 100,
      direction: "horizontal",
      isSplit: false,
    },
  ]);

  const [tabId, setTabId] = useState(1);


  const handleSplit = (id, direction, parentId) => {
    setTabId(id)
    setPanes((prevPanes) => {
      return prevPanes.map((pane) => {
        if (pane.id === parentId && !pane.isSplit) {
          const newSubPane1 = {
            id: Date.now(),
            content: "New Pane 1",
            size: 100,
            direction,
            isSplit: false,
          };
          const newSubPane2 = {
            id: Date.now() + 1,
            content: "New Pane 2",
            size: 100,
            direction,
            isSplit: false,
          };
          return {
            ...pane,
            direction: direction === "horizontal" ? "vertical" : "horizontal",
            content: [newSubPane1, newSubPane2],
            isSplit: true,
          };
        } else if (pane.content && Array.isArray(pane.content)) {
          return {
            ...pane,
            content: handleSplitInSubPane(pane.content, parentId, direction),
          };
        }
        return pane;
      });
    });
  };

  const handleSplitInSubPane = (subPanes, parentId, direction) => {
    return subPanes.map((subPane) => {
      if (subPane.id === parentId && !subPane.isSplit) {
        const newSubPane1 = {
          id: Date.now(),
          content: "New Pane 1",
          size: 100,
          direction,
          isSplit: false,
        };
        const newSubPane2 = {
          id: Date.now() + 1,
          content: "New Pane 2",
          size: 100,
          direction,
          isSplit: false,
        };
        return {
          ...subPane,
          direction: direction === "horizontal" ? "vertical" : "horizontal",
          content: [newSubPane1, newSubPane2],
          isSplit: true,
        };
      } else if (subPane.content && Array.isArray(subPane.content)) {
        return {
          ...subPane,
          content: handleSplitInSubPane(subPane.content, parentId, direction),
        };
      }
      return subPane;
    });
  };

  const renderPaneContent = (pane) => {
    if (Array.isArray(pane.content)) {
      return (
        <Split
          className={`split ${pane.direction}`}
          minSize={pane.content.map((child) => child.size)}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction={pane.direction}
          style={{ height: "100%", width: "100%" }}
        >
          {pane.content.map((childPane) => (
            <div key={childPane.id} style={{ width: "100%", height: "100%" }}>
              {renderPaneContent(childPane)}
            </div>
          ))}
        </Split>
      );
    } else {
      return (
        <div
          key={pane.id}
          className="pane"
          style={{ width: "100%", height: "100%" }}
        >
          <Group
            addTabGroup={handleSplit}
            tabId={tabId}
            groupIndex={pane.id}
          />
        </div>
      );
    }
  };

  return (
    <div className="split-container">
      {panes.map((pane) => (
        <div key={pane.id} style={{ width: "100%", height: "100%" }}>
          {renderPaneContent(pane)}
        </div>
      ))}
    </div>
  );
}

export default Playground;
