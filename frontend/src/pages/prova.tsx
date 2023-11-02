import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import { useNavigate } from 'react-router-dom';
import { checkAccount } from '@/utilities'
import axios from "axios"

import * as React from 'react';
//import Box from '@mui/material/Box';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//import { TreeView } from '@mui/x-tree-view/TreeView';
//import { TreeItem } from '@mui/x-tree-view/TreeItem';
import List from '@mui/material/List'
//import 'devextreme/dist/css/dx.light.css';
 
import TreeView from 'devextreme-react/tree-view';

//layout
/*const collectionsData = [
    {
      name: 'Collection 1',
      cards: ['Card 1', 'Card 2', 'Card 3'],
    },
    {
      name: 'Collection 2',
      cards: ['Card 4', 'Card 5'],
    },
    // Other collections
  ];
  
const usersData = [
    'User 1',
    'User 2',
    'User 3',
    // Other users
  ];

interface CollectionData {
    name: string;
    cards: string[];
}
interface Card{
   name: string;
}

const convertToTreeData = (collections: CollectionData[]) => {
  return {
    id: 'root',
    name: 'Collections',
    children: collections.map((collection, index) => ({
      id: `collection-${index}`,
      name: collection.name,
      children: collection.cards.map((card, cardIndex) => ({
        id: `card-${index}-${cardIndex}`,
        name: card,
      })),
    })),
  };
};
const data = convertToTreeData(collectionsData);


interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}


export const AdminPage = () => {
  
  //periodic update
  const navigate = useNavigate();
  checkAccount(navigate)

  const data: RenderTree = {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '3',
        name: 'Child - 3',
        children: [
          {
            id: '4',
            name: 'Child - 4',
          },
        ],
      },
    ],
  };

  const renderTree = (nodes: RenderTree) => (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );

  
  //for call
  
  axios.get("https://localhost:5657", {headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}}).then((response)=>{
    console.log(response.data)
  }).catch((error)=>{console.log(error)})

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  </Box>

  );
}


<h1>Admin Page</h1>
      <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      </Box>
      
      */

  const collectionsData = [
    {
      name: 'Collection 1',
      cards: ['Card 1', 'Card 2', 'Card 3'],
    },
   {
      name: 'Collection 2',
      cards: ['Card 4', 'Card 5'],
  }
];

  const adaptedData = collectionsData.map((collection, index) => {
    return {
      id: index + 1, // Assegna un ID univoco per ciascuna collezione
      text: collection.name,
      items: collection.cards.map((card, cardIndex) => {
        return {
          id: `${index + 1}-${cardIndex + 1}`, // ID univoco per ciascuna carta
          text: card
        };
      })
    };
});
export const AdminPage = () => {
  
  //periodic update
  const navigate = useNavigate();
  checkAccount(navigate)

  return (
  
    <TreeView 
            id="treeView"
            items={adaptedData}
            displayExpr="text"
            parentIdExpr="parentId"
            hasItemsExpr="hasItems"
/>)
}