// ActiveLastBreadcrumb.js
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const ShowPath = () => {
  //Extract the path of the last visited pade
  const location = useLocation();
  const currentPath = location.pathname;

  const pageList = currentPath.split("/");
  pageList.shift(); // pops first element

  function getFirstNElements(i) {
    if (i <= pageList.length) {
      return "/" + pageList.slice(0, i + 1).join("/");
    } else {
      return "/" + pageList.join("/");
    }
  }

  console.log(currentPath);
  console.log(currentPath != "/");


  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">

        {currentPath != "/" ?
          <div>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            {pageList.map((e, i) => {
              return (
                <Link underline="hover" color="inherit" href={getFirstNElements(i)}>
                  {e}
                </Link>
              );
            })}
          </div>
          : <div>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
          </div>}
      </Breadcrumbs>
    </div>
  );
}
export default ShowPath;

