import React, { useState } from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link';
import { TextField} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const CollectionsTreeView = ({ collectionsData, navigate }) => {
    const [collectionSearchText, setCollectionSearchText] = useState('');

    return(
        <div>
        <h2>Collections</h2>
        <div>
            {/* Searchbar for collections */}
            <TextField
              label="Search collections"
              variant="outlined"
              value={collectionSearchText}
              onChange={(e) => setCollectionSearchText(e.target.value)}
            />
          </div>
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
          {
            collectionsData.filter((collection) =>
              collection.name.toLowerCase().includes(collectionSearchText.toLowerCase())).map((collection, collectionIndex) => (
              <TreeItem
                key={collectionIndex}
                nodeId={`collection-${collectionIndex}`}
                label={
                  <Link
                    component="button"
                    onClick={() => navigate(`/CollectionInfoPage/${collection.name}`)} // navigate to the page with the collection info
                    style={{ cursor: 'pointer' }}
                  >
                  {collection.name}
                  </Link>
                }
              >
              {
                collection.cards.map((card, cardIndex) => (
                  <TreeItem
                    key={`card-${collectionIndex}-${cardIndex}`}
                    nodeId={`card-${collectionIndex}-${cardIndex}`}
                    label={
                      <Link
                        component="button"
                        onClick={() => navigate(`/CardInfoPage/${card.id}`)} // navigate to the page with the card info
                        style={{ cursor: 'pointer' }}
                      >
                      {card.url}
                      </Link>
                    }
                    />
                  ))
              }
                </TreeItem>
              ))
            }
        </TreeView>
        </div>
    );
}
export default CollectionsTreeView;