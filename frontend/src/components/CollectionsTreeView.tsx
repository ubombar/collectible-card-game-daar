import React, { useState } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { TextField} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../CSS/CollectionsTreeView.css';

const CollectionsTreeView = ({ collectionsData, navigate }) => {
    //const [collectionSearchText, setCollectionSearchText] = useState('');
    const [searchText, setSearchText] = useState('');
    const filteredCollections = collectionsData
                  .filter((collection) => {
                    return (
                      collection.name.toLowerCase().includes(searchText.toLowerCase()) ||
                      collection.cards.some((card) =>
                        card.url.toLowerCase().includes(searchText.toLowerCase())
                      )
                    );
                  });

return (
    <div className="collections-tree-view">
      <h2 className="collection-title">Collections</h2>
      <div>
        <TextField
          label="Search collections and cards"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="SearchBar"
        />
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {filteredCollections.map((collection, collectionIndex) => (
          <TreeItem
            key={collectionIndex}
            nodeId={`collection-${collectionIndex}`}
            label={
              <Link
                component="button"
                onClick={() => navigate(`/CollectionInfoPage/${collection.name}`)}
                style={{ fontFamily: "Times New Roman", color: "black" }}
                className="collection-link"
              >
                {collection.name}
              </Link>
            }
            className="collection-node"
          >
            {collection.cards.map((card, cardIndex) => {
              if (
                collection.name.toLowerCase().includes(searchText.toLowerCase()) ||
                card.url.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return (
                  <TreeItem
                    key={`card-${collectionIndex}-${cardIndex}`}
                    nodeId={`card-${collectionIndex}-${cardIndex}`}
                    label={
                      <Link
                        component="button"
                        onClick={() => navigate(`/CardInfoPage/${card.id}`)}
                        style={{ fontFamily: "Times New Roman", color: "black" }}
                      >
                        {card.url}
                      </Link>
                    }
                    className="card-node"
                  />
                );
              } else {
                return null;
              }
            })}
          </TreeItem>
        ))}
      </TreeView>
    </div>
  );
};

export default CollectionsTreeView;