import React, { useRef, useState,  } from "react"
import { FaChevronRight, FaChevronDown, FaFolder } from 'react-icons/fa'
import { useSelectedNodeState, useFilteredIdState,  } from "../contexts"
import { FamilyRightClickMenu } from "./FamilyRightClickMenu.jsx"


export const FolderNode = ({ node, depth, ancentors = [] }) => {

  const depthRef = useRef(depth + 1)

  const ancentorsRef = useRef([...ancentors, node.id])

  const [open, setOpen] = useState(true)

  const [selectedNode, setSelectedNode] = useSelectedNodeState();

  const [filteredId, setFilteredId] = useFilteredIdState();
  const [anchor, setAnchor] = useState();

  const isItInSearch = (family) => {
    if (typeof (filteredId) != "object") return true;
    return (filteredId == null || filteredId?.has(family.id));
  }

  return (
    <>
      <li id={node.id}>
        <div
          className='li-header'
          style={{
            paddingLeft: `${15 * depthRef.current}px`,
            background: selectedNode?.id === node.id ? 'rgba(0, 0, 0, 0.3)' : null,
            whiteSpace: 'nowrap',
            margin:2,
            textOverflow: 'ellipsis',
          }}
          onClick={(e) => {

            node.children && setOpen(prevState => !prevState)
            setAnchor(null);
            setSelectedNode({ ...node, ancentors: ancentorsRef.current })
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setSelectedNode({ ...node, ancentors: ancentorsRef.current })
            setAnchor(e.currentTarget);
          }
          }
        >
          {!isItInSearch(node) &&
            <>
              {node.children ? open ? <FaChevronDown style={{ marginRight: '4px' }} fontSize={'8px'} /> : <FaChevronRight style={{ marginRight: '4px' }} fontSize={'8px'} /> : <></>}
              <FaFolder style={{ marginLeft: node.children ? 0 : '15px', color: 'yellow' }} />
              <h3>{node["Name"]}</h3>
            </>
          }
        </div>
        {node.children && (
          <ul
            style={{ height: open ? '100%' : 0, overflow: 'hidden' }}
          >
            {Object.values(node.children).map((subNode, i) => {
              return (
                <FolderNode node={subNode} key={subNode.id} depth={depthRef.current} ancentors={ancentorsRef.current} />
              )
            })}
          </ul>
        )}
      </li>
      {<FamilyRightClickMenu anchorEl={anchor} setAnchorEl={setAnchor} depth={depthRef.current} />}
    </>
  )
}